import { Injectable } from '@angular/core';
import { userDetails } from './users/userDetails';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data:userDetails[] = [];
  constructor() { }

  addData(details:userDetails){
    this.data.push(details);
  }

  sendData(){
    return this.data
  }
}
