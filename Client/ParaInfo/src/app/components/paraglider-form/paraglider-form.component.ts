import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FormDataService } from 'src/app/services/form-data.service';
import { MyValidators } from 'src/app/services/MyValidators';
import { ParagliderService } from 'src/app/services/paraglider.service';

@Component({
  selector: 'app-paraglider-form',
  templateUrl: './paraglider-form.component.html',
  styleUrls: ['./paraglider-form.component.css']
})
export class ParagliderFormComponent implements OnInit {
  @Input() brandName: string
  createParagliderForm: any
  modelName: any;
  filterTextChanged: Subject<string> = new Subject<string>();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private myValidators: MyValidators,
    private formdataService: FormDataService,
    private paraService: ParagliderService) {
    this.brandName = this.route.snapshot.params.brandName;
    this.createParagliderForm = this.fb.group({
      'brand': this.brandName,
      'model': ['', [Validators.required, Validators.maxLength(30)], this.myValidators.checkModel.bind(this.myValidators, this.brandName)],
      'file': ['', [Validators.required,this.myValidators.checkFile.bind(this.myValidators)]],
      'price': ['', [Validators.pattern("^[0-9.-]*$"), Validators.maxLength(20)]],
      'sizes': this.fb.array([this.addSizeGroup()]),
    });
  }

  ngOnInit(): void {
    
    // this.createParagliderForm.patchValue({
    //   "model": "epsilon 1023",
    // })
  }

  addSizeGroup() {
    return this.fb.group({
      'wingSize': ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(30)]],
      'flat': this.addArea(),
      'proj': this.addArea(),
      'flattening': ['', [Validators.pattern("^[0-9,.%]*$"), Validators.maxLength(30)]],
      'upperSurface': ['', Validators.maxLength(30)],
      'underSurface': ['', Validators.maxLength(30)],
      'numberCells': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'weight': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'risers': ['', Validators.maxLength(50)],
      'nakedPilot': ['', [Validators.pattern("^[0-9,.-]*$"), Validators.maxLength(30)]],
      'inflightWeight': ['', [Validators.pattern("^[0-9,.-]*$"), Validators.maxLength(30)]],
      'wingLoading': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'minSpeed': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'trimSpeed': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'maxSpeed': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'minSinkRate': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'certification': ['', Validators.maxLength(30)],
    });
  }

  addArea() {
    return this.fb.group({
      'area': ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(30)]],
      'span': ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(30)]],
      'aspectRatio': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
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
    console.log(this.createParagliderForm.controls.file.value.size);
    if (this.createParagliderForm.status === "VALID" && this.createParagliderForm.controls.file.value.size) {
      console.log(this.createParagliderForm.value);
      let formData = new FormData;
      this.formdataService.convertJsontoFormData(this.createParagliderForm.value, null, formData);
      this.paraService.create(formData).subscribe();
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
