import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor() { }

  convertJsontoFormData(jsonObject: any, parentKey: any, carryFormData: FormData): FormData {

    const formData = carryFormData || new FormData();
    let index = 0;

    for (var key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        if (jsonObject[key] !== null && jsonObject[key] !== undefined) {
          var propName = parentKey || key;
          if (parentKey && this.isObject(jsonObject)) {
            propName = parentKey + '[' + key + ']';
          }
          if (parentKey && this.isArray(jsonObject)) {
            propName = parentKey + '[' + index + ']';
          }
          if (jsonObject[key] instanceof File) {
            formData.append(propName, jsonObject[key]);
          } else if (jsonObject[key] instanceof FileList) {
            for (var j = 0; j < jsonObject[key].length; j++) {
              formData.append(propName + '[' + j + ']', jsonObject[key].item(j));
            }
          } else if (this.isArray(jsonObject[key]) || this.isObject(jsonObject[key])) {
            this.convertJsontoFormData(jsonObject[key], propName, formData);
          } else if (typeof jsonObject[key] === 'boolean') {
            formData.append(propName, +jsonObject[key] ? '1' : '0');
          } else {
            formData.append(propName, jsonObject[key]);
          }
        }
      }
      index++;
    }
    return formData;
  }

  isArray(val: any) {
    const toString = ({}).toString;
    return toString.call(val) === '[object Array]';
  }

  isObject(val: any) {
    return !this.isArray(val) && typeof val === 'object' && !!val;
  }
}
