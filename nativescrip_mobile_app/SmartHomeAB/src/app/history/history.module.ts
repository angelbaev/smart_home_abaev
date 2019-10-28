import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HistoryRoutingModule } from "./history-routing.module";
import { HistoryComponent } from "./history.component";

import { AccountService } from "~/app/shared/account.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HistoryRoutingModule
    ],
    declarations: [
        HistoryComponent
    ],
    providers: [
        AccountService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HistoryModule { }
