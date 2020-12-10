import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { MyValidators } from 'src/app/services/MyValidators';
import { ParagliderService } from 'src/app/services/paraglider.service';

@Component({
  selector: 'app-paraglider-form',
  templateUrl: './paraglider-form.component.html',
  styleUrls: ['./paraglider-form.component.css']
})
export class ParagliderFormComponent implements OnInit {
  @Input() brandName: string;
  @Input() editModel: string = "";
  @Input() edit: boolean = false;
  createParagliderForm: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private myValidators: MyValidators,
    private formdataService: FormDataService,
    private paraService: ParagliderService) {
    this.brandName = this.route.snapshot.params.brandName;
  }

  ngOnInit(): void {
    this.createParagliderForm = this.fb.group({
      'id': [''],
      'brand': this.brandName,
      'model': ['', [Validators.required, Validators.maxLength(30)], this.myValidators.checkModel.bind(this.myValidators,'paraglider', this.brandName, this.editModel, this.edit)],
      'file': ['', !this.edit ? Validators.required : [], this.myValidators.checkFile.bind(this.myValidators)],
      'price': ['', [Validators.pattern("^[0-9.-]*$"), Validators.maxLength(20)]],
      'description': ['', [Validators.maxLength(1000)]],
      'sizes': this.fb.array(this.edit ? [] : [this.addSizeGroup()]),
    });

    if (this.edit) {
      this.paraService.getModel(this.brandName, this.editModel).subscribe(data => {
        this.addItemsToForm(data);
      })
    }
  }

  addItemsToForm(data: any): void {
    this.createParagliderForm.controls['id'].patchValue(data.id);
    this.createParagliderForm.controls['model'].patchValue(data.model);
    this.createParagliderForm.controls['price'].patchValue(data.price);
    this.createParagliderForm.controls['description'].patchValue(data.description);
    data.sizes.forEach((size: any) => {
      let group = this.addSizeGroup();
      size.proj = size.proj || this.addArea();
      size.flat = size.flat || this.addArea();
      group.patchValue(size);
      this.createParagliderForm.controls['sizes'].push(group);
    })
  }

  addSizeGroup() {
    return this.fb.group({
      'wingSize': ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
      'flat': this.addArea(),
      'proj': this.addArea(),
      'flattening': ['', [Validators.pattern("^[0-9,.%]*$"), Validators.maxLength(20)]],
      'upperSurface': ['', Validators.maxLength(20)],
      'underSurface': ['', Validators.maxLength(20)],
      'numberCells': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(20)]],
      'weight': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(20)]],
      'risers': ['', Validators.maxLength(20)],
      'nakedPilot': ['', [Validators.pattern("^[0-9,.-]*$"), Validators.maxLength(20)]],
      'inflightWeight': ['', [Validators.pattern("^[0-9,.-]*$"), Validators.maxLength(20)]],
      'wingLoading': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(20)]],
      'minSpeed': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(20)]],
      'trimSpeed': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(20)]],
      'maxSpeed': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(20)]],
      'minSinkRate': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(20)]],
      'certification': ['', Validators.maxLength(20)],
    });
  }
  addArea() {
    return this.fb.group({
      'area': ['', [Validators.pattern("^[0-9A-Za-z-.,]*$"), Validators.maxLength(20)]],
      'span': ['', [Validators.pattern("^[0-9A-Za-z-.,]*$"), Validators.maxLength(20)]],
      'aspectRatio': ['', [Validators.pattern("^[0-9A-Za-z-.,]*$"), Validators.maxLength(20)]],
    })
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.createParagliderForm.controls.file.patchValue(event.target.files[0]);
    }
  }



  getControl(group: any, property: string) {
    return group.controls[property];
  }

  createParaglider() {
    if (this.createParagliderForm.status === "VALID") {
      let formData = new FormData();
      this.formdataService.convertJsontoFormData(this.createParagliderForm.value, null, formData);
      this.paraService.create(formData).subscribe(data => {
        this.router.navigate([`/details/paraglider/${data.brand}/${data.model}`]);
      });
    }
  }

  updateParaglider() {
    if (this.createParagliderForm.status === "VALID") {
      let formData = new FormData();
      this.formdataService.convertJsontoFormData(this.createParagliderForm.value, null, formData);
      this.paraService.update(formData).subscribe(data => {
        this.router.navigate([`/details/paraglider/${data.brand}/${data.model}`]);
      });
    }
  }

  addSize() {
    this.sizeArray.push(this.addSizeGroup());
  }

  removeSize(index: any) {
    this.sizeArray.removeAt(index);
  }

  get sizeArray() {
    return <FormArray>this.createParagliderForm.get('sizes');
  }
}
