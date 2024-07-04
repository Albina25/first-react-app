import React, {useEffect, useState} from "react";
import {Button, Space, Table, TableProps, Tag} from 'antd';
import {TableType} from "../types.tsx";
import {NewRecordModal} from "./NewRecordModal.tsx";
import {useGetTableDataQuery, useAddRecordMutation, useDeleteRecordMutation, useUpdateRecordMutation} from "../api/tableDataApi.ts";

export const columns = (handleDelete: (id: number) => void, handleEdit: (record: TableType) => void): TableProps<TableType>['columns'] => [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: (tags: string[]) => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record: TableType) => (
            <Space size="middle">
                <a onClick={() => handleEdit(record)}>Update {record.name}</a>
                <a onClick={() => handleDelete(record.id)}>Delete</a>
            </Space>
        ),
    },
];

export const MyTable: React.FC = () => {
    const [limit, setLimit] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<TableType | null>(null);

    const { data = [] as TableType[], isLoading, error } = useGetTableDataQuery(limit, {
        pollingInterval: 10000
    });
    const [addRecord] = useAddRecordMutation();
    const [deleteRecord] = useDeleteRecordMutation();
    const [updateRecord] = useUpdateRecordMutation();

    useEffect(() => {
        setTimeout(() => {
            setLimit(3)
        }, 2000)

    }, [])

    const handleDelete = async (id: number) => {
        try{
            await deleteRecord(id);
        } catch(error) {
            console.log('Delete error', error);
        }
    };

    const handleCreate = async (newRecord: TableType) => {
        try {
            await addRecord(newRecord);
        } catch(error) {
            console.log('Delete error', error);
        } finally {
            closeModal();
        }
    };

    const handleUpdate = async (updatedRecord: TableType) => {
        await updateRecord(updatedRecord);
        setEditingRecord(null);
        closeModal();
    };

    const handleEdit = (record: TableType) => {
        setEditingRecord(record);
        showModal();
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingRecord(null);
    };

    return (
        <div>
            {isLoading && <h1>Loading..</h1>}
            {error && <h1>Error..</h1>}
            {data && !error &&
                <div>
                    <Table columns={columns(handleDelete, handleEdit)} dataSource={data} rowKey="id" />
                    <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
                        Add New Record
                    </Button>
                </div>
            }
            <NewRecordModal
                visible={isModalOpen}
                record={editingRecord}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={closeModal}
            />
        </div>
    )
};