import { rendererTypeName } from '@angular/compiler';
import { Component, OnInit,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(renderer:Renderer2) { }

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
  
}
