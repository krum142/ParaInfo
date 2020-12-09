import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ParagliderService } from './paraglider.service';

@Injectable()
export class MyValidators {

    debouncer: any;

    constructor(public paraService: ParagliderService) {

    }
    checkModel(brand: string, actualModel: string, edit: boolean, control: FormControl): any {
        clearTimeout(this.debouncer);
        return new Promise(resolve => {
            this.debouncer = setTimeout(() => {
                this.paraService.getModel(brand, control.value).subscribe((res) => {

                    let inputModel = control.value.toLowerCase();
                    let resultModel = res.model?.toLowerCase();

                    if (edit) {
                        actualModel = actualModel.toLowerCase();
                        if (inputModel !== actualModel && inputModel === resultModel) {
                            resolve({ 'modelAlreadyExists': true });
                        }
                    }
                    else {
                        if (resultModel && res.model.toLowerCase() === control.value.toLowerCase()) {
                            resolve({ 'modelAlreadyExists': true });
                        }
                    }
                    resolve(null);
                }, (err) => {
                    resolve({ 'modelAlreadyExists': true });
                });

            }, 500);
        });
    }

    checkFile(control: FormControl): any {
        let validTypes = [
            "image/apng", "image/bmp", "image/gif",
            "image/jpeg", "image/png",]

        clearTimeout(this.debouncer);
        return new Promise(resolve => {
            if(!control.value){
                resolve(null);
            }
            this.debouncer = setTimeout(() => {
                //console.log(!validTypes.includes(control.value.type));
                if (!validTypes.includes(control.value.type)) {
                    resolve({ "wrongFileType": true });
                }
                if (control.value.size > 2000000) {
                    resolve({ "wrongFileSize": true });
                }
                resolve(null);
            }, 500)
        });
    }
}