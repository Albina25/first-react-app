import {useState} from 'react';
import { Modal, Form, Input } from 'antd';
import {FormType, TableType} from "../types.tsx";

interface NewRecordModalProps {
    visible: boolean;
    record: TableType | null;
    onCreate: (values: FormType) => void;
    onUpdate: (values: TableType) => void;
    onCancel: () => void;
}

const NewRecordModal: React.FC<NewRecordModalProps> = ({ visible, record, onCreate, onCancel, onUpdate }) => {
    const [form] = Form.useForm();
    const [nameError, setNameError] = useState<string | null>(null);

    const isEditing = !!record;

    const  onNameChange = (value: string) => {
        console.log('onNameChange', value)
        if (/\d/.test(value)) {
            setNameError('Oops, not number!');
        } else {
            setNameError(null);
        }
    }

    return (
        <Modal
            open={visible}
            title={isEditing ? "Edit Record" : "Create New Record"}
            okText={isEditing ? "Update" : "Create"}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        form.resetFields();
                        if (isEditing) {
                            onUpdate({ ...record, ...values });
                        }
                        onCreate(
                            {
                                name: values.name,
                                age: values.age,
                                address: values.address || '',
                                tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : []
                            }
                        );
                    })
                    .catch((error) => {
                        console.log('Error:', error);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="form_in_modal" initialValues={record || {}}>
                <Form.Item
                    name="name"
                    label="Name"
                    help={nameError}
                    validateStatus={nameError ? 'error' : ''}
                    rules={[{ required: true, message: 'Please input the name!' }]}
                >
                    <Input onChange={e => onNameChange(e.target.value)} />
                </Form.Item>
                <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please input the age!' }]}>
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

export default NewRecordModal;