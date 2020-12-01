import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {
  createBrandForm: FormGroup;
  constructor(
    private brandService: BrandService,
    private fb: FormBuilder,
    private router: Router) {
    this.createBrandForm = this.fb.group({
      'name':['',[Validators.required]],
      'imageUrl':['',[Validators.required]],
      'description':['',Validators.maxLength(1000)]
    })
   }

  ngOnInit(): void {
  }

  createBrand(){
    if(this.createBrandForm.status === "VALID"){
      this.brandService.create(this.createBrandForm.value).subscribe(data => {
        if(data !== null){
          this.router.navigate(['']);
        }
      });
    }
  }

  get name() {
    return this.createBrandForm.get('name');
  }
}
