import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {
  createBrandForm: FormGroup;
  constructor(private brandService: BrandService, private fb: FormBuilder) {
    this.createBrandForm = this.fb.group({
      'name':['',[Validators.required]],
      'imageUrl':['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  createBrand(){
    if(this.createBrandForm.status === "VALID"){
      console.log(this.createBrandForm.value)
      this.brandService.create(this.createBrandForm.value).subscribe(data => console.log(data));
    }
  }

}
