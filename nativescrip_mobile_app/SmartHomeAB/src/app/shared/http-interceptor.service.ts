import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "~/app/shared/storage.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private storageService: StorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storageService.getObject("token");

        console.log(token.token + " : xxxx intercepted!");
        const {headers} = req;

        if (!headers.has("Content-Type")) {
            headers.append("Content-Type", "application/json");
        }
        if (!headers.has("Authorization") && token.hasOwnProperty("token")) {
            headers.append("Authorization", "Bearer " + token.token);
        }

        return next.handle(req.clone({ headers }));
    }
}
