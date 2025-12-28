import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { CommonService } from '../../service/common.service';
import { clearToken, clearUserInfo } from '../../../global/app.global';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
private commonService = inject(CommonService);
private router=inject(Router);
userInfo$ = this.commonService.userInfo$;
logout()
{
  clearToken();
  clearUserInfo();
  this.commonService.setUserInfo();
  this.router.navigate(['/']);

}
}
