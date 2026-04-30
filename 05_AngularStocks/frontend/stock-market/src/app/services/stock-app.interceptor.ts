import { inject } from '@angular/core';
import { HttpInterceptorFn , HttpResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth';
import { UserStoreService } from './user-store';

export const StockAppInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const userStore = inject(UserStoreService);
    if (userStore.token) {
        console.log('INTERCEPTING, HAS TOKEN', userStore.token);
        const authReq = req.clone({
            headers: req.headers.set(
                'X-AUTH-HEADER',
                userStore.token
            )
        });
        console.log('Making an authorized request');
        req = authReq;
    }
    return next(req);

}