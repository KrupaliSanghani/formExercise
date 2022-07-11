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

this.displayData = this.stu.getData();
this.subscription = this.stu.dataChanged.subscribe((data) => {
  this.displayData = data;
}
);


// this.stu.studentData.subscribe((data) => {
// this.displayData.push(data);
// // this.displayData = data;
//    });
//    console.log(this.displayData);
  }

// --for edit
  onEdit(index: number){
    // this.stu.startedEditing.next(index);
  }

  // --for delete
  onDelete(){

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // --sort Data--
  sortData(property: string) {
    let direction: number;

    property == 'Name' ? (this.isDesc = !this.isDesc,direction = this.isDesc ? 1 : -1) : (property == 'Email' ? (this.Email = !this.Email, direction = this.Email ? 1 : -1) :  (property == 'Semester' ? (this.Semester = !this.Semester, direction = this.Semester ? 1 : -1) : (this.Grade = !this.Grade, direction = this.Grade ? 1 : -1)));


console.log('sort');
    // this.isDesc = !this.isDesc;

    // let direction = this.isDesc ? 1 : -1;
    this.displayData.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * this.direction;
      }
      else if (a[property] > b[property]) {
        return 1 * this.direction;
      }
      else {
        return 0;
      }
    });
  }

}
