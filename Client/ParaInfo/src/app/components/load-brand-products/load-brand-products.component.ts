import { Component, Input, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/globalConstants';
import { GetProductsService } from 'src/app/services/get-products.service';

@Component({
  selector: 'app-load-brand-products',
  templateUrl: './load-brand-products.component.html',
  styleUrls: ['./load-brand-products.component.css']
})
export class LoadBrandProductsComponent implements OnInit {

  @Input() brandName: string = "";
  @Input() categoryName: string = "";
  products: any;
  constructor(private productsService: GetProductsService) { }

  ngOnInit(): void {
    this.productsService.getAll(GlobalConstants.categorys[this.categoryName],this.brandName).subscribe(data => {
      console.log(data);
      this.products = data;
    });
  }

  log(e:any){
    console.log(e)
  }
}
