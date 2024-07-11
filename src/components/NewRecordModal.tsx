import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import { FormType, TableType } from "../types.tsx";

interface NewRecordModalProps {
  visible: boolean;
  record: TableType | null;
  onCreate: (values: FormType) => void;
  onUpdate: (values: TableType) => void;
  onCancel: () => void;
}

export const NewRecordModal: React.FC<NewRecordModalProps> = ({
  visible,
  record,
  onCreate,
  onCancel,
  onUpdate,
}) => {
  const [form] = Form.useForm();
  const [nameError, setNameError] = useState<string | null>(null);

  const isEditing = !!record;

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        ...record,
        tags: record.tags.join(","),
      });
    } else {
      form.resetFields();
    }
    //form.setFieldsValue(record || {});
  }, [record, form]);

  const onNameChange = (value: string) => {
    if (/\d/.test(value)) {
      setNameError("Oops, not number!");
    } else {
      setNameError(null);
    }
  };

  return (
    <Modal
      open={visible}
      title={isEditing ? `Edit ${record?.name}` : "Create New Record"}
      okText={isEditing ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            if (isEditing) {
              onUpdate({
                ...record,
                ...values,
                age: Number(values.age),
                tags: values.tags
                  ? values.tags.split(",").map((tag) => tag.trim())
                  : [],
              });
            } else {
              onCreate({
                name: values.name,
                age: Number(values.age),
                address: values.address || "",
                tags: values.tags
                  ? values.tags.split(",").map((tag) => tag.trim())
                  : [],
              });
            }
          })
          .catch((error) => {
            form.resetFields();
            console.log("Error:", error);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Name"
          help={nameError}
          validateStatus={nameError ? "error" : ""}
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input onChange={(e) => onNameChange(e.target.value)} />
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
      </Form>
    </Modal>
  );
};
