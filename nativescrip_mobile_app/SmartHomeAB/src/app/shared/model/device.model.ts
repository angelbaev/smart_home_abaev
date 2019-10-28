import { Account } from "~/app/shared/model/account.model";

export class Device {
    _id: string;
    account: Account;
    name: string;
    ip: string;
    port: string;
    commands: any;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;

    constructor(params?: any) {
        if (params) {
            Object.assign(this, params);
        }
    }
}
