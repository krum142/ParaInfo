import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-paraglider',
  templateUrl: './create-paraglider.component.html',
  styleUrls: ['./create-paraglider.component.css']
})
export class CreateParagliderComponent implements OnInit {
  createParagliderForm: FormGroup
  brandName: string
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.brandName = this.route.snapshot.params.brandName;
    this.createParagliderForm = this.fb.group({
      'brand': this.brandName,
      'model': ['', Validators.required],
      'price': ['', Validators.maxLength(10)],
      'sizes': this.fb.array([this.addSizeGroup()]),
    });

   
  }

  ngOnInit(): void {
  }

  addSizeGroup(){
    return this.fb.group({
      'wingSize': ['',Validators.required],
      'flat': this.addArea(),
      'proj': this.addArea(),
      'flattening':[''],
      'upperSurface':[''],
      'underSurface':[''],
      'numberCells':[''],
      'weight':[''],
      'risers':[''],
      'nakedPilot':[''],
      'inflightWeight':[''],
      'wingLoading':[''],
      'minSpeed':[''],
      'trimSpeed':[''],
      'maxSpeed':[''],
      'minSinkRate':[''],
      'certification':[''],
    })
  }

  addArea(){
    return this.fb.group({
      'area':[''],
      'span':[''],
      'aspectRatio':[''],
    })
  }

  createParaglider(){
    console.log(this.createParagliderForm.value);
    console.log(this.sizeArray);
  }

  addSize(){
    this.sizeArray.push(this.addSizeGroup());
  }

  removeSize(index:any){
    this.sizeArray.removeAt(index);
  }

  get sizeArray(){
    return <FormArray>this.createParagliderForm.get('sizes')
  }

}
