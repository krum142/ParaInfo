import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetProductsService } from 'src/app/services/get-products.service';
import { ParagliderService } from 'src/app/services/paraglider.service';

@Component({
  selector: 'app-paraglider-details',
  templateUrl: './paraglider-details.component.html',
  styleUrls: ['./paraglider-details.component.css']
})
export class ParagliderDetailsComponent implements OnInit {
  @Input() brand: string = "";
  @Input() model: string = "";
  showDescription:boolean = true;
  paraglider: any
  constructor(
    private router: Router,
    private paraService: ParagliderService,
    private productsService:GetProductsService) {
   }

  ngOnInit(): void {
    this.productsService.getOne("paraglider",this.brand,this.model).subscribe(data => {
      this.paraglider = data;
      if(!data.id){
        this.router.navigate(['**'])
      }
    })
  }

  deleteParaglider(id:any){
    this.paraService.delete(id).subscribe(data => {
      console.log(data);
        this.router.navigate([`/brand/${data.brand}`]);
    })
  }

  toggleDescription() {
    this.showDescription = !this.showDescription
  }
}
