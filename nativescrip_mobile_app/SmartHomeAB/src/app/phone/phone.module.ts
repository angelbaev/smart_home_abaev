import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { PhoneRoutingModule } from "./phone-routing.module";
import { PhoneComponent } from "./phone.component";

import { MobileDeviceService } from "~/app/shared/mobile-device.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PhoneRoutingModule
    ],
    declarations: [
        PhoneComponent
    ],
    providers: [
        MobileDeviceService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PhoneModule { }
