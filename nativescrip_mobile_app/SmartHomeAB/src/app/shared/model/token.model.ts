import { Account } from "~/app/shared/model/account.model";

export class Token {
    _id: string;
    account: Account;
    token: string;
    expireAt: string;
    createdAt: string;
}
