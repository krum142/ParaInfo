import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent {
  private _x:any;

  get x(): any{
    return this.x;
  }

  @Input()
  set item(val: any){
    console.log(val);
    this._x = val;
  }
  
}
