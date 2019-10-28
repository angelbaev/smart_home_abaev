import { Account } from "~/app/shared/model/account.model";
import { Device } from "~/app/shared/model/device.model";
import { MobileDevice } from "~/app/shared/model/mobile-device.model";

export class History {
    _id: string;
    account: Account;
    device: Device;
    mobileDevice: MobileDevice;
    command: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;

    constructor(params?: any) {
        if (params) {
            Object.assign(this, params);
        }
    }
}
