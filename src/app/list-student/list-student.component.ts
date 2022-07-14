import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private stu: StudentInfoService, private router: Router ) { }

  ngOnInit(): void {
   

this.subscription = this.stu.dataChanged.subscribe((data) => {
  this.displayData = data;
}
);
this.displayArr = this.displayData;
this.editMode = false;
this.stu.editMode.next(this.editMode);
  }

// --filter by grade--
  onGrade(val){
console.log(val);
val == 'All' ? (this.displayArr = this.displayData) : (this.displayArr = this.displayData.filter(displayData => displayData.grade == val));
console.log(this.displayArr);
  }



// --for edit
  onEdit(val){
    console.log(val);
    this.editMode = true
    this.stu.editMode.next(this.editMode)
    this.stu.startedEditing.next(val);
   
    this.router.navigate(['add'])
  }

  // --for delete
  onDelete(val){
console.log(val);
for (var i = 0; i < this.displayArr.length; i++) {

  if (this.displayArr[i] == val) {
    this.displayArr.splice(i, 1);
  }
}

this.stu.dataChanged.next(this.displayArr);
console.log(this.displayArr.length);
// this.stu.startedEditing.next(this.displayArr);

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

      // a[property] < b[property] ? ( return -1 * direction) : ( a[property] > b[property] ? ( return 1 * direction) : ( return 0)  )

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
