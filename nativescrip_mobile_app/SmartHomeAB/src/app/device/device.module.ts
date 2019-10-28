import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ControlComponent } from "~/app/device/control-list/control.component";
import { ControlNewComponent } from "~/app/device/control-new/control-new.component";
import { ControlSingleComponent } from "~/app/device/control-single/control-single.component";
import { DeviceNewComponent } from "~/app/device/device-new/device-new.component";
import { DeviceSingleComponent } from "~/app/device/device-single/device-single.component";
import { AccountService } from "~/app/shared/account.service";
import { ControlService } from "~/app/shared/control.service";
import { DeviceService } from "~/app/shared/device.service";
import { DeviceRoutingModule } from "./device-routing.module";
import { DeviceComponent } from "./device.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        DeviceRoutingModule
    ],
    declarations: [
        DeviceComponent,
        DeviceSingleComponent,
        DeviceNewComponent,
        ControlComponent,
        ControlNewComponent,
        ControlSingleComponent
    ],
    providers: [
        AccountService,
        DeviceService,
        ControlService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DeviceModule { }
