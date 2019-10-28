import { Device } from "~/app/shared/model/device.model";

export class Control {
    _id: string;
    device: Device;
    name: string;
    commandOn: string;
    commandOff: string;
    state: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;

    constructor(params?: any) {
        if (params) {
            Object.assign(this, params);
        }
    }
}
