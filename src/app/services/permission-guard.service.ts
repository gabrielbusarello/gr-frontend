import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class PermissionGuard implements CanActivate {

    constructor( private router: Router ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (route.data.role.some(permission => permission === localStorage.getItem('permissao'))) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }

}
