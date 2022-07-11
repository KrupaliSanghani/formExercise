import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudentInfoService } from '../student-info.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;
  editMode: boolean = false;
  editedItemIndex: number;
  subscription: Subscription;
  // editedItem;
  // subject = [];
  // num: number;
  studentInfo = {};
  student = [];
  avg: number;
  grade : string;
  en: number;

  // --semester Array--

  semesterArr = [
    { id: 1, semester: 1 },
    { id: 2, semester: 2 },
    { id: 3, semester: 3 },
    { id: 4, semester: 4 },
    { id: 5, semester: 5 },
    { id: 6, semester: 6 },
  ];

    // --semester Array--

  subjectArr = [1, 2, 3];


// --country Array
  countryCodeArr = [
    { country: 'India', code: '+91' },
    { country: 'USA', code: '+1' },
    // { "country": 'Japan', 'code': '+81' },
  ];



  constructor(private stu: StudentInfoService) {}

  
  ngOnInit(): void {

    // this.subscription = this.stu.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.stu.getInfo(index);
    //     this.studentForm.setValue({
    //       name: this.editedItem.name,
    //       email: this.editedItem.email,
    //       phNo: this.editedItem.phNo,
    //       dob: this.editedItem.dob,
    //       gender: this.editedItem.gender,
    //       subject: this.editedItem.subject,
    //       semester: this.editedItem.semester,
    //       condition: this.editedItem.condition,
    //       // name: this.editedItem.name,
         
    //     //   // console.log(Name);
    //     //   // amount: this.editedItem.amount

    //     })
    //     console.log(this.editedItem.name);
    //   }
    // );

    this.studentForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phNo: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      subject: new FormArray([]),
      semester: new FormControl(null, Validators.required),
      condition: new FormControl(null, Validators.required),
    });

    this.onCode('a');
  }



  onSemester() {}

  onSubmit() {

    //--for random digit
    console.log(Math.random() * 100);
for(let id= 1;id < 5; id++){
  this.en = Math.floor(100000000000 + Math.random() * 9000);
  console.log(this.en);
}



// --for marks--
    console.log(this.studentForm.get('subject').value);
    let arr = this.studentForm.get('subject').value;
    console.log(arr);
    let mark = arr.map((e) => e.marks);
    console.log(mark);

    let sum = 0;
    if(mark.length !== 0){
      for (let m=0; m < mark.length; m++) {
        // console.log(b.length);
        sum = sum + mark[m];
        console.log(sum);
        // console.log(b[0]);
      }
       this.avg = sum/mark.length;
      console.log(this.avg);
    }

// --grade--
if(this.avg >= 80 && this.avg <= 100){
  this.grade = 'A';
}else if(this.avg >= 70 && this.avg < 80){
  this.grade = 'B';
}else if(this.avg >= 60 && this.avg < 70){
  this.grade = 'C';
}else if(this.avg >= 50 && this.avg < 60){
  this.grade = 'D';
}else if(this.avg >=33 && this.avg < 50){
  this.grade = 'E';
}else if(this.avg >= 0 && this.avg < 33){
  this.grade = 'F';
}

this.studentInfo = {
  enid:this.en,
  name: this.studentForm.get('name').value,
  email: this.studentForm.get('email').value,
  phno: this.studentForm.get('phNo').value,
  dob : this.studentForm.get('dob').value,
  gender: this.studentForm.get('gender').value,
  semester: this.studentForm.get('semester').value,
  grade: this.grade
 }


if(this.editMode){
  this.stu.updateData(this.editedItemIndex,this.student);
  console.log(this.editMode);
}
else{
  this.student.push(this.studentInfo);
  console.log(this.student);
  // this.stu.studentData.next(this.student);
  this.stu.setData(this.studentInfo);
  console.log(this.editMode);
}
  
  }

  // --subject input field

  onSubject(val) {
    if ((<FormArray>this.studentForm.get('subject')).length == 0) {
      for (let i = 1; i <= val; i++) {
        (<FormArray>this.studentForm.get('subject')).push(
          new FormGroup({
            subjectName: new FormControl(null, Validators.required),
            marks: new FormControl(null, [Validators.required]),
          })
        );
      }
    } else {
      let length = (<FormArray>this.studentForm.get('subject')).length;
      let sum = val - length;
      console.log(sum);

      if (sum > 0) {
        for (let i = 1; i <= sum; i++) {
          (<FormArray>this.studentForm.get('subject')).push(
            new FormGroup({
              subjectName: new FormControl(null, Validators.required),
              marks: new FormControl(null, [Validators.required]),
            })
          );
        }
      } else {
        console.log(sum);
        let pos = Math.abs(sum);
        for (let k = 1; k <= pos; k++) {
          console.log((<FormArray>this.studentForm.get('subject')).removeAt(0));
          (<FormArray>this.studentForm.get('subject')).removeAt(4);
        }
      }
    }
  }

  // --for subject & marks
  getControls() {
    return (<FormArray>this.studentForm.get('subject')).controls;
  }


  // --for country wise validation
  onCode(code) {
    this.studentForm.get('phNo').valueChanges.subscribe((phNo) => {
      if (code == 'USA') {
        this.studentForm
          .get('phNo')
          .setValidators([
            Validators.required,
            Validators.pattern('^((\\+1-?)|0)?[0-9]{12}$'),
          ]);
      } else {
        this.studentForm
          .get('phNo')
          .setValidators([
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ]);
      }
    });
    console.log(code);
  }
}
