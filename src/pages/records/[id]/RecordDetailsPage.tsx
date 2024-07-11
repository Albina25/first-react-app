import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import { Button, Form, Input } from "antd";
import { TableType } from "../../../types.tsx";
import * as tableModel from "../model.ts";

const RecordDetailsPage = () => {
  const [form] = Form.useForm();

  const [record, updateRecord] = useUnit([
    tableModel.$record,
    tableModel.updateRecord,
  ]);
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        ...record,
        tags: record.tags?.join(","),
      });
    } else {
      form.resetFields();
    }
    //form.setFieldsValue(record || {});
  }, [record, form]);

  const handleUpdate = (updatedRecord: TableType) => {
    const tags =
      typeof updatedRecord.tags === "string"
        ? updatedRecord.tags.split(",").map((tag) => tag.trim())
        : [];
    const updated = {
      ...record,
      ...updatedRecord,
      age: Number(updatedRecord.age),
      tags: tags,
    };
    updateRecord(updated);
  };

  return (
    <div>
      <h2>RECORD</h2>
      {record && <div>{record.name}</div>}
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        onFinish={handleUpdate}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: "Please input the age!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input />
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RecordDetailsPage;
