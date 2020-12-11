import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetProductsService } from 'src/app/services/get-products.service';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-reserve-details',
  templateUrl: './reserve-details.component.html',
  styleUrls: ['./reserve-details.component.css']
})
export class ReserveDetailsComponent implements OnInit {
  @Input() brand: string = "";
  @Input() model: string = "";
  showDescription:boolean = true;
  reserve: any
  constructor(
    private router: Router,
    private reserveService: ReserveService,
    private productsService:GetProductsService) {
   }

  ngOnInit(): void {
    this.productsService.getOne("reserve",this.brand,this.model).subscribe(data => {
      this.reserve = data;
      if(!data.id){
        this.router.navigate(['**'])
      }
    })
  }

  deleteHarness(id:any){
    this.reserveService.delete(id).subscribe(data => {
      this.router.navigate([`/brand/${data.brand}/reserves`]);
    })
  }

  toggleDescription() {
    this.showDescription = !this.showDescription
  }
}
