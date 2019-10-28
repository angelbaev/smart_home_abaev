import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ControlComponent } from "~/app/device/control-list/control.component";
import { ControlNewComponent } from "~/app/device/control-new/control-new.component";
import { ControlSingleComponent } from "~/app/device/control-single/control-single.component";
import { DeviceNewComponent } from "~/app/device/device-new/device-new.component";
import { DeviceSingleComponent } from "~/app/device/device-single/device-single.component";
import { DeviceComponent } from "./device.component";

const routes: Routes = [
    { path: "", component: DeviceComponent },
    { path: "device-single/:id", component: DeviceSingleComponent },
    { path: "device-new", component: DeviceNewComponent },
    { path: "control-list/:id", component: ControlComponent },
    { path: "control-new/:device_id", component: ControlNewComponent },
    { path: "control-single/:id", component: ControlSingleComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class DeviceRoutingModule { }
