import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ParagliderService } from './paraglider.service';

@Injectable()
export class MyValidators {

    debouncer: any;

    constructor(public paraService: ParagliderService) {

    }
    checkModel(brand: string, control: FormControl): any {
        clearTimeout(this.debouncer);

        return new Promise(resolve => {
            this.debouncer = setTimeout(() => {
                this.paraService.getModel(brand, control.value).subscribe((res) => {
                    if (res.model && res.model.toLowerCase() === control.value.toLowerCase()) {
                        resolve({ 'modelAlreadyExists': true });
                    }
                    else {
                        resolve(null);
                    }
                }, (err) => {
                    resolve({ 'modelAlreadyExists': true });
                });

            }, 500);
        });
    }

    checkFile(control: FormControl):any{
        clearTimeout(this.debouncer);
        this.debouncer = setTimeout(() => {
            console.log(control.value)
            if(control.value.type ){}
        },50)
    }
}