import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessoryService } from 'src/app/services/accessory.service';
import { AuthService } from 'src/app/services/auth.service';
import { GetProductsService } from 'src/app/services/get-products.service';

@Component({
  selector: 'app-accessory-details',
  templateUrl: './accessory-details.component.html',
  styleUrls: ['./accessory-details.component.css']
})
export class AccessoryDetailsComponent implements OnInit {

  @Input() brand: string = "";
  @Input() model: string = "";
  showDescription:boolean = true;
  accessory: any
  isUserLogged: boolean = this.authService.isAuthenticated();
  constructor(
    private router: Router,
    private authService: AuthService,
    private accessoryService: AccessoryService,
    private productsService: GetProductsService) {
   }

  ngOnInit(): void {
    this.productsService.getOne("accessory",this.brand,this.model).subscribe(data => {
      this.accessory = data;
      if(!data.id){
        this.router.navigate(['**'])
      }
    })
  }

  log(x:any){
    console.log(x);
  }
  deleteAccessory(id:any){
    this.accessoryService.delete(id).subscribe(data => {
      this.router.navigate([`/brand/${data.brand}/harnesses`]);
    })
  }

  toggleDescription() {
    this.showDescription = !this.showDescription
  }
}
