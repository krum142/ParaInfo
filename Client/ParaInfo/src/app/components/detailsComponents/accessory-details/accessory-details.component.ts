import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetProductsService } from 'src/app/services/get-products.service';
import { HarnessService } from 'src/app/services/harness.service';

@Component({
  selector: 'app-accessory-details',
  templateUrl: './accessory-details.component.html',
  styleUrls: ['./accessory-details.component.css']
})
export class AccessoryDetailsComponent implements OnInit {

  @Input() brand: string = "";
  @Input() model: string = "";
  showDescription:boolean = true;
  harness: any
  constructor(
    private router: Router,
    //private harnessService: HarnessService,
    private productsService:GetProductsService) {
   }

  ngOnInit(): void {
    this.productsService.getOne("harness",this.brand,this.model).subscribe(data => {
      this.harness = data;
      if(!data.id){
        this.router.navigate(['**'])
      }
    })
  }

  log(x:any){
    console.log(x);
  }
  // deleteHarness(id:any){
  //   this.harnessService.delete(id).subscribe(data => {
  //     this.router.navigate([`/brand/${data.brand}/harnesses`]);
  //   })
  // }

  toggleDescription() {
    this.showDescription = !this.showDescription
  }
}
