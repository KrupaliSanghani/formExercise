import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudentInfoService } from '../student-info.service';
// import { UsernameValidator } from '../username.validator';  

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit, OnDestroy {

// @ViewChild('') studentForm:NgForm;



  studentForm: FormGroup;
  editMode: boolean = true;
  editedItemIndex: number;
  editedItem;
  subscription: Subscription;
  // editedItem;
  // subject = [];
  // num: number;
  studentInfo = {};
  student = [];
  avg: number;
  grade : string;
  en: number = Math.floor(100000000000 + Math.random() * 9000);


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

  // subjectArr = [1, 2, 3];


// --country Array
  countryCodeArr = [
    { country: 'India', code: '+91' },
    { country: 'USA', code: '+1' },
    // { "country": 'Japan', 'code': '+81' },
  ];



  constructor(private stu: StudentInfoService) {}

  
  ngOnInit(): void {

    // --delete data--
    this.stu.deletedData.subscribe((e) => {
      this.student = e;
      console.log(this.student);
    })
    console.log(this.stu.deletedData);

    // --edit data--
  this.subscription =  this.stu.startedEditing.subscribe(
    (val) => {
       this.editMode = false;
       console.log(val);
       this.editedItem = val;
       console.log(this.editedItem);

       this.studentForm.patchValue({
        name: this.editedItem.name
       });
     
    }
  );

        console.log(this.editedItem.name);
        

    this.studentForm = new FormGroup({
      name: new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z]*')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phNo: new FormControl(null, Validators.required),
      dob: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, Validators.required),
      subNo : new FormControl(null, Validators.required),
      subject: new FormArray([]),
      semester: new FormControl(null, Validators.required),
      condition: new FormControl(null, Validators.required),
    });

    this.onCode('a');
  }



//   validDate(control: FormControl){
//     let dateArr = [];
//     let dataArr = [];
//     var today = new Date();
//    let year = today.getFullYear();
//    let month = today.getMonth();
//    let day = today.getDate();
// if(year == splitDate[0] && month == splitDate[1] - 1 && day == splitDate[2]){}
//   }



ngOnDestroy(){
this.subscription.unsubscribe();
}

  onSubmit() {

// --for marks--
    let sum = 0;
    if((this.studentForm.get('subject').value).map((e) => e.marks).length !== 0){
      for (let m=0; m < (this.studentForm.get('subject').value).map((e) => e.marks).length; m++) {
 
        sum = sum + (this.studentForm.get('subject').value).map((e) => e.marks)[m];
        console.log(sum);
      }

      // --average of marks--
       this.avg = sum/(this.studentForm.get('subject').value).map((e) => e.marks).length;
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
  subject: this.studentForm.get('subject').value,
  grade: this.grade,
  subNo: this.studentForm.get('subNo').value
 }

 console.log(this.studentInfo);

if(this.editMode){
  this.stu.updateData(this.editedItemIndex,this.student);
  console.log(this.editMode);
  this.studentForm.reset();
}
else{
  this.student.push(this.studentInfo);
  console.log(this.student);
  this.stu.dataChanged.next(this.student);
  // this.stu.studentData.next(this.student);
  // this.stu.setData(this.student);
  // console.log(this.editMode);
  this.studentForm.reset();
}
  
  }

  // --subject input field

  onSubject(val) {
    console.log(val);
    (<FormArray>this.studentForm.get('subject')).clear();
      for (let i = 1; i <= val; i++) {
        (<FormArray>this.studentForm.get('subject')).push(
          new FormGroup({
            subjectName: new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z]*')]),
            marks: new FormControl(null, [Validators.required,Validators.pattern('^0*(?:[1-9][0-9]?|100)$')]),
          })
        );
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
