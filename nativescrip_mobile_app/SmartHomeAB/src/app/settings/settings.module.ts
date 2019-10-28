import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { NativeScriptFormsModule } from "nativescript-angular";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";

import { AccountService } from "~/app/shared/account.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        SettingsRoutingModule
    ],
    declarations: [
        SettingsComponent
    ],
    providers: [
        AccountService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule { }
