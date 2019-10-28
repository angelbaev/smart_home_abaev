import { Account } from "~/app/shared/model/account.model";

export class MobileDevice {
    _id: string;
    account: Account;
    model: string;
    type: string;
    uuid: string;
    createdAt: string;
    updatedAt: string;
}
