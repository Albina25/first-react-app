import React, { useEffect, useState } from "react";
import { Button, Space, Table, TableProps, Tag } from "antd";
import { FormType, TableType } from "../../types.tsx";
import { NewRecordModal } from "../../components/NewRecordModal.tsx";
import { useUnit } from "effector-react";
import * as tableModel from "./model.ts";

export const Columns = (
  handleDelete: (event, id: number) => void,
  handleEdit: (event, record: TableType) => void
): TableProps<TableType>["columns"] => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags: string[]) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
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
    title: "Action",
    key: "action",
    render: (_, record: TableType) => (
      <Space size="middle">
        <a onClick={(event) => handleEdit(event, record)}>
          Update {record.name}
        </a>
        <a onClick={(event) => handleDelete(event, record.id)}>Delete</a>
      </Space>
    ),
  },
];

const TablePage = () => {
  //const navigate = useNavigate();
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
    error,
    openRecord,
  ] = useUnit([
    tableModel.$tableDataLoading,
    tableModel.$data,
    tableModel.$isModalOpen,
    tableModel.openModal,
    tableModel.closeModal,
    tableModel.deleteRecord,
    tableModel.addRecord,
    tableModel.updateRecord,
    tableModel.$error,
    tableModel.openRecord,
  ]);

  const [editingRecord, setEditingRecord] = useState<TableType | null>(null);

  useEffect(() => {
    handlePageMount();
  }, [handlePageMount]);

  const handleDelete = (event, id: number) => {
    event.stopPropagation();
    deleteRecord(id);
  };

  const handleCreate = (newRecord: FormType) => {
    addRecord(newRecord);
    closeModal();
  };

  const handleUpdate = (updatedRecord: TableType) => {
    console.log("update");
    updateRecord(updatedRecord);
    setEditingRecord(null);
    closeModal();
  };

  const handleEdit = (event: Event, record: TableType) => {
    event.stopPropagation();
    setEditingRecord(record);
    openModal();
  };

  //const navigateToDetails = useLink(detailsRoute, {});
  const handleRowClick = (record: TableType) => {
    //navigateToDetails({ params: { id: record.id } });
    openRecord(record.id);
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
      {tableDataLoading && !error && !data.length && <h1>Loading..</h1>}
      {error && <h1>{error}</h1>}
      {!tableDataLoading && data.length <= 0 && <div>No data available</div>}
      {data.length > 0 && !error && (
        <div>
          <Table
            columns={Columns(handleDelete, handleEdit)}
            dataSource={data}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
          <Button
            type="primary"
            onClick={handleOpenModal}
            style={{ marginBottom: 16 }}
          >
            Add New Record
          </Button>
        </div>
      )}
      <NewRecordModal
        visible={isModalOpen}
        record={editingRecord}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancel={handleCloseModal}
      />
    </div>
  );
};

export default TablePage;
