import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentInfoService } from '../student-info.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  displayData = [];
  
  
  isDesc: boolean =true;
  Email: boolean = true;
  Grade:boolean = true
  Semester: boolean = true;
  
  private subscription: Subscription;

  constructor(private stu: StudentInfoService ) { }

  ngOnInit(): void {

// this.displayData = this.stu.getData();
this.subscription = this.stu.dataChanged.subscribe((data) => {
  this.displayData = data;
}
);


  }

// --for edit
  onEdit(i,val){
    // console.log(val);
    this.stu.startedEditing.next(i);
    this.stu.startedEditing.next(val);
  }

  // --for delete
  onDelete(val){

this.displayData.splice(val,1);
this.stu.dataChanged.next(this.displayData);
console.log(this.displayData.length);
this.stu.deletedData.next(this.displayData);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // --sort Data--
  sortData(property: string) {
    let direction: number;

    property == 'name' ? (this.isDesc = !this.isDesc,direction = this.isDesc ? 1 : -1) : (property == 'email' ? (this.Email = !this.Email, direction = this.Email ? 1 : -1) :  (property == 'semester' ? (this.Semester = !this.Semester, direction = this.Semester ? 1 : -1) : (this.Grade = !this.Grade, direction = this.Grade ? 1 : -1)));


console.log('sort');
    // this.isDesc = !this.isDesc;

    // let direction = this.isDesc ? 1 : -1;
    this.displayData.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  }

}
