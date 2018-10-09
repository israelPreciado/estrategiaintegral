import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AccessGuard implements CanActivate {    

    constructor(private router: Router) {}

    canActivate() {
        return this.checkLogin();
    }

    checkLogin(): boolean {
        if (localStorage.getItem("uid")) { return true; }

        this.router.navigate(['/login']);
        return false;
    }
}