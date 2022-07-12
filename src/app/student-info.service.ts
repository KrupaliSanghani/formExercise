import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {
  
 
  studentData = new BehaviorSubject({});
  listLength = new BehaviorSubject<number>(1);
  dataChanged = new BehaviorSubject<any[]>([]);
  startedEditing = new BehaviorSubject({});
  deletedData = new BehaviorSubject([]);

  studentInfoArr = [];

  constructor() { }

  // getData(){
  //   return this.studentInfoArr.slice();
  // }


  // --edit--
  getInfo(index: number){
    console.log(this.startedEditing);
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


  

}
