import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-categories',
  templateUrl: './brand-categories.component.html',
  styleUrls: ['./brand-categories.component.css']
})
export class BrandCategoriesComponent implements OnInit {
  @Input() brandName: string = "";
  @Input() categoryRoute: string = "";
  categories: Array<string> = ['Paragliders', 'Harnesses', 'Reserves', 'Bags', 'Accessoars'];

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    if (!this.categoryRoute) {
      this.categoryRoute = this.categories[0];
    }
    else if (!this.categories.includes(this.categoryRoute)) {
      this.router.navigate(['**']);
    }
    console.log(this.categoryRoute);
  }


  changeAndReloadRoute(category:string) {
    let url = `brand/${this.brandName}/${category}`;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }
}
