import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {
  
 
  // studentData = new BehaviorSubject({});
  dataChanged = new BehaviorSubject<any[]>([]);
  startedEditing = new BehaviorSubject<number>(null);

  studentInfoArr = [];

  constructor() { }

  getData(){
    return this.studentInfoArr.slice();
  }

  getInfo(index: number){
    return this.studentInfoArr[index];
  }




  setData(data){
    console.log(this.startedEditing);
this.studentInfoArr.push(data);
// this.studentInfoArr = data;
this.dataChanged.next(this.studentInfoArr.slice());
console.log(this.studentInfoArr);
  }



  updateData(index: number, data){
    this.studentInfoArr[index] = data
    this.dataChanged.next(this.studentInfoArr.slice());
  }
  deleteIngredient(index: number) {
    this.studentInfoArr.splice(index, 1);
    this.dataChanged.next(this.studentInfoArr.slice());
  }

}
