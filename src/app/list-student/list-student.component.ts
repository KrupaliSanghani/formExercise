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
  
  // -- for search--
  filtered = '';

  // --for edit--
  editMode: boolean = false;

  // --for sort--
  isDesc: boolean =true;
  Email: boolean = true;
  Grade:boolean = true
  Semester: boolean = true;

  displayArr = [];
  private subscription: Subscription;

  constructor(private stu: StudentInfoService ) { }

  ngOnInit(): void {
   

this.subscription = this.stu.dataChanged.subscribe((data) => {
  this.displayData = data;
}
);
this.displayArr = this.displayData;


  }

// --filter by grade--
  onGrade(val){
console.log(val);
val == 'All' ? (this.displayArr = this.displayData) : (this.displayArr = this.displayData.filter(displayData => displayData.grade == val));
console.log(this.displayArr);
  }



// --for edit
  onEdit(i,val){
    console.log(val);
    this.editMode = true
    this.stu.editMode.next(this.editMode)
    this.stu.startedEditing.next(val);
    this.stu.index.next(i);
    this.editMode=false;
  }

  // --for delete
  onDelete(val){
console.log(val);
for (var i = 0; i < this.displayArr.length; i++) {

  if (this.displayArr[i] == val) {
    this.displayArr.splice(i, 1);
  }
}
// this.displayArr.splice(val,1);
this.stu.dataChanged.next(this.displayArr);
console.log(this.displayArr.length);
this.stu.deletedData.next(this.displayArr);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }




  // --sort Data--
  sortData(property: string) {
    let direction: number;

    property == 'name' ? (this.isDesc = !this.isDesc,direction = this.isDesc ? 1 : -1) : (property == 'email' ? (this.Email = !this.Email, direction = this.Email ? 1 : -1) :  (property == 'semester' ? (this.Semester = !this.Semester, direction = this.Semester ? 1 : -1) : (this.Grade = !this.Grade, direction = this.Grade ? 1 : -1)));


console.log('sort');
    this.displayArr.sort(function (a, b) {
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
