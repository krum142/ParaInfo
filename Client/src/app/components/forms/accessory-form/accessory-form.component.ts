import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccessoryService } from 'src/app/services/accessory.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { MyValidators } from 'src/app/services/MyValidators';

@Component({
  selector: 'app-accessory-form',
  templateUrl: './accessory-form.component.html',
  styleUrls: ['./accessory-form.component.css']
})
export class AccessoryFormComponent implements OnInit {
  @Input() brandName: string = "";
  @Input() editModel: string = "";
  @Input() edit: boolean = false;
  createAccessoryForm: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private myValidators: MyValidators,
    private accessoryService: AccessoryService,
    private formdataService: FormDataService
  ) { }

  ngOnInit(): void {
    this.createAccessoryForm = this.fb.group({
      'id': [''],
      'brand': this.brandName,
      'model': ['', [Validators.required, Validators.maxLength(30)], this.myValidators.checkModel.bind(this.myValidators, 'accessory', this.brandName, this.editModel, this.edit)],
      'file': ['', !this.edit ? Validators.required : [], this.myValidators.checkFile.bind(this.myValidators)],
      'price': ['', [Validators.pattern("^[0-9.-]*$"), Validators.maxLength(20)]],
      'description': ['', [Validators.maxLength(1000)]],
    });

    if (this.edit) {
      this.accessoryService.getModel(this.brandName, this.editModel).subscribe(data => {
        this.addItemsToForm(data);
      })
    }
  }

  addItemsToForm(data: any): void {
    this.createAccessoryForm.controls['id'].patchValue(data.id);
    this.createAccessoryForm.controls['model'].patchValue(data.model);
    this.createAccessoryForm.controls['price'].patchValue(data.price);
    this.createAccessoryForm.controls['description'].patchValue(data.description);
  }

  createAccessory() {
    if (this.createAccessoryForm.status === "VALID") {
      let formData = new FormData();
      this.formdataService.convertJsontoFormData(this.createAccessoryForm.value, null, formData);
      this.accessoryService.create(formData).subscribe(data => {
        this.toastr.success("Accessory Created","Created");
        this.router.navigate([`/details/accessory/${data.brand}/${data.model}`]);
      });
    }
  }

  updateAccessory() {
    if (this.createAccessoryForm.status === "VALID") {
      let formData = new FormData();
      this.formdataService.convertJsontoFormData(this.createAccessoryForm.value, null, formData);
      this.accessoryService.update(formData).subscribe(data => {
        this.toastr.success("Accessory Edited","Edited");
        this.router.navigate([`/details/accessory/${data.brand}/${data.model}`]);
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.createAccessoryForm.controls.file.patchValue(event.target.files[0]);
    }
  }

  getControl(group: any, property: string) {
    return group.controls[property];
  }

  get sizeArray() {
    return <FormArray>this.createAccessoryForm.get('sizes');
  }
}
