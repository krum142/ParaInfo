import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private authService: AuthService) { }

  isUserLogged: boolean = this.authService.isAuthenticated();
  username = this.authService.getUsername();
  showSubmenu: boolean = false;
  showSecondSubmenu:boolean = false;
  showMobileMenu:boolean = false;

  ngOnInit(): void {
  
  }
  
  toggleSubmenu(){
    this.showSubmenu = !this.showSubmenu;
    if(this.showSubmenu){
      this.showSecondSubmenu = false;
    }
  }

  toggleSecondSubmenu(){
    this.showSecondSubmenu = !this.showSecondSubmenu;
    if(this.showSecondSubmenu){
      this.showSubmenu = false;
    }
  }

  toggleMobileMenu(){
    this.showMobileMenu = !this.showMobileMenu;
  }
  
  logout(){
    this.authService.logout();
    location.reload();
  }
}
