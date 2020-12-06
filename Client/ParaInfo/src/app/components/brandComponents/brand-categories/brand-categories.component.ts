import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-categories',
  templateUrl: './brand-categories.component.html',
  styleUrls: ['./brand-categories.component.css']
})
export class BrandCategoriesComponent implements OnInit {
  @Input() brandName: string = "";
  @Input() categoryName: string = "";
  @Input() categories = new Array<string>();
  @Output() page: Number = 0;
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    
  }

  changeAndReloadRoute(category:string) {
    let url = `brand/${this.brandName}/${category}`;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }
}
