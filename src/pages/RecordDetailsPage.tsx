import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useUnit} from "effector-react";
import * as tableModel from "../models/tableModel.ts"

const RecordDetailsPage: React.FC = () => {
    const params = useParams();
    const [record, getRecordById] = useUnit([tableModel.$record, tableModel.getRecordById]);
    useEffect(() => {
        if (params.id) {
            getRecordById(params.id);
        }
    }, [getRecordById, params.id]);
    return (
        <div>
            <h2>RECORD №{params.id}</h2>
            {record && <div>{record.name}</div>}
        </div>
    );
};

export default RecordDetailsPage;