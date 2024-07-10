import React from "react";

export interface TableType {
    id: number;
    name: string;
    age: number;
    address?: string;
    tags?: string[];
}

export interface FormType {
    name: string;
    age: number;
    address?: string;
    tags?: string[];
}

export type RouteType = {
    path: string;
    component: React.FC;
    exact: boolean;
};
