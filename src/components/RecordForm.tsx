import React, {FC} from 'react';
import {Form, Input} from "antd";

interface RecordFormProps {

}
const RecordForm: FC = () => {
    const [form] = Form.useForm();
    return (
        <Form form={form} layout="vertical" name="form_in_modal">
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
    );
};

export default RecordForm;