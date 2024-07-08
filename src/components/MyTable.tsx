import React, {useEffect, useState} from "react";
import {Button, Space, Table, TableProps, Tag} from 'antd';
import {FormType, TableType} from "../types.tsx";
import {NewRecordModal} from "./NewRecordModal.tsx";
import {useUnit} from "effector-react";
import * as tableModel from "../models/tableModel.ts"
import {$error, deleteRecord, updateRecord} from "../models/tableModel.ts";
import {createLogger} from "vite";

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
    const handlePageMount = useUnit(tableModel.pageMounted);
    const [
        tableDataLoading,
        data,
        isModalOpen,
        openModal,
        closeModal,
        deleteRecord,
        addRecord,
        updateRecord,
        error
    ] = useUnit(
        [
            tableModel.$tableDataLoading,
            tableModel.$data,
            tableModel.$isModalOpen,
            tableModel.openModal,
            tableModel.closeModal,
            tableModel.deleteRecord,
            tableModel.addRecord,
            tableModel.updateRecord,
            tableModel.$error
        ]
    );

    const [editingRecord, setEditingRecord] = useState<TableType | null>(null);

    useEffect(() => {
        handlePageMount();
    }, [handlePageMount]);

    const handleDelete = (id: number) => {
        deleteRecord(id);
    };

    const handleCreate = (newRecord: FormType) => {
        addRecord(newRecord);
        closeModal();
    };

    const handleUpdate = (updatedRecord: TableType) => {
        updateRecord(updatedRecord);
        setEditingRecord(null);
        closeModal();
    };

    const handleEdit = (record: TableType) => {
        setEditingRecord(record);
        openModal();
    };

    const handleOpenModal = () => {
        openModal();
    };

    const handleCloseModal = () => {
        closeModal();
        setEditingRecord(null);
    };

    return (
        <div>
            {tableDataLoading && !data.length && <h1>Loading..</h1>}
            {error && !data.length && <h1>{error}</h1>}
            {
            data.length > 0 &&
                <div>
                    <Table columns={columns(handleDelete, handleEdit)} dataSource={data} rowKey="id"/>
                    <Button type="primary" onClick={handleOpenModal} style={{marginBottom: 16}}>
                        Add New Record
                    </Button>
                </div>
            }
            <NewRecordModal
                visible={isModalOpen}
                record={editingRecord}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={handleCloseModal}
            />
        </div>
    )
};