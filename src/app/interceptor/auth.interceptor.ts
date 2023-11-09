import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { SessionAjaxService } from "../service/session.ajax.service";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private oSessionService: SessionAjaxService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.oSessionService.isSessionActive()) {
            const token = this.oSessionService.getToken();
            if (token) {
                const cloned = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + token)
                });
                return next.handle(cloned);
            }
            else {
                return next.handle(req);
            }
        } else {
            return next.handle(req);
        }

    }
}