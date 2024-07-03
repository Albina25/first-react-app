import React, { useState } from "react";
import { Button, Space, Table, TableProps, Tag } from 'antd';
//import { tableData } from "../data/TableData.tsx";
import { TableType } from "../types.tsx";
import NewRecordModal from "./NewRecordModal.tsx";
import { useActions } from "../hooks/useActions.ts";
import { useTypedSelector } from "../hooks/useTypedSelector.ts";

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

const MyTable: React.FC = () => {
    const {
        deleteRecord,
        addRecord,
        updateRecord
    } = useActions();
    const data = useTypedSelector(state => state.table.data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<TableType | null>(null);

    const handleDelete = (id: number) => {
        deleteRecord(id);
    };

    const handleCreate = (newRecord: TableType) => {
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
            <Table columns={columns(handleDelete, handleEdit)} dataSource={data} rowKey="id" />
            <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
                Add New Record
            </Button>
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

export default MyTable;