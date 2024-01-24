import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../service/auth.service";


@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean {
    if (this.authService.isLogged()) {
      return true;
    }
    this.authService.cachedUrl = segments;
    this.router.navigate(['auth', 'login']);
    return false;
  }

  canActivate(
    route: any, url: any[]): boolean {
    if (this.authService.isLogged()) {
      this.router.navigate(['/videos']);
      return false;
    }
    return true;
  }
}


