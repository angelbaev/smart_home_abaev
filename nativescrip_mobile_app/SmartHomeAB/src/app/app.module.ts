import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { LoginComponent } from "~/app/login/login.component";
import { HttpInterceptorService } from "~/app/shared/http-interceptor.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
    // providers: [
    //     {
    //         provide: HTTP_INTERCEPTORS,
    //         useClass: HttpInterceptorService,
    //         multi: true
    //     }
    // ]
})
export class AppModule { }
