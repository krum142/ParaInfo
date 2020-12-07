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
  singleCategoryName: string = "";
  products: any;
  constructor(private productsService: GetProductsService) { }

  ngOnInit(): void {
    this.singleCategoryName = GlobalConstants.categorys[this.categoryName];
    this.productsService.getAll(this.singleCategoryName,this.brandName).subscribe(data => {
      this.products = data;
    });
  }
}
