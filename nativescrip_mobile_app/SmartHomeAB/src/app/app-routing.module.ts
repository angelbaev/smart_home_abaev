import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "~/app/login/login.component";

const routes: Routes = [
   // { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "device", loadChildren: "~/app/device/device.module#DeviceModule" },
    { path: "history", loadChildren: "~/app/history/history.module#HistoryModule" },
    { path: "phone", loadChildren: "~/app/phone/phone.module#PhoneModule" },
    { path: "settings", loadChildren: "~/app/settings/settings.module#SettingsModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
