import { StringLiteral } from "typescript/lib/tsserverlibrary";
import { StatusEnum } from "../../types"

export interface ListDebtProps {
    id: string;
    name: string;
    code: string;
    phone: string;
    debt: number;
    note: string;
    status: StatusEnum;
    update_time: string;
}

export interface ListPaymentProps {
    id: string;
    code: string;
    deal_name: string;
    employee: string;
    date: string;
    money: number;
    method: string;
    receive_name: string;
    phone: string;
    status: StatusEnum;
    note: string;
}