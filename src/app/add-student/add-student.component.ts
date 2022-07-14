import { getLocaleDateFormat } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentInfoService } from '../student-info.service';
// import { UsernameValidator } from '../username.validator';  

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {


  studentForm: FormGroup;
  editMode: boolean = false;
  // editedItemIndex: number;
  editedItem;
  subscription: Subscription;
  // editedItem;
  // subject = [];
  // num: number;
  // studentInfo = {};
  student = [];
  code;
  

// --country Array

  // mark: any;



  constructor(private stu: StudentInfoService, private fb: FormBuilder, private router: Router ) {}

  
  ngOnInit(): void {

    this.studentForm = new FormGroup({
     
      name: new FormControl(null, [Validators.required,Validators.pattern('^([a-z]+[,.]?[ ]?|-]?)+$')]),
      
      email: new FormControl(null, [Validators.required, Validators.email]),
      phNo: new FormControl(null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      dob: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, Validators.required),
      subNo : new FormControl(null, Validators.required),
      subject: new FormArray([]),
      semester: new FormControl(null, Validators.required),
      condition: new FormControl(null, Validators.required),
      code: new FormControl('Select Country', Validators.required)
    });

   
 // --edit data--
   
    this.stu.dataChanged.subscribe((e) => {
      this.student = e;
      console.log(this.student);
    })
    
    this.stu.editMode.subscribe((e) => this.editMode = e);


  this.subscription =  this.stu.startedEditing.subscribe(
    (val) => {
      //  this.editMode = true;
       console.log(val);
       this.editedItem = val;
       console.log(this.editedItem.code);

       if(this.editMode){
          this.studentForm.patchValue({
        name: this.editedItem.name,
        email: this.editedItem.email,
        phNo: this.editedItem.phNo,
        dob: this.editedItem.dob,
        gender: this.editedItem.gender,
        subNo: this.editedItem.subNo,
        semester: this.editedItem.semester,
condition: this.editedItem.condition,
code: this.editedItem.code

       });

       this.studentForm.get('phNo').valueChanges.subscribe((phNo) => {
        if (this.editedItem.code == 'USA (+1)') {

          this.studentForm.get('phNo')
            .setValidators([
              Validators.required,
              Validators.pattern('^((\\+1-?)|0)?[0-9]{12}$'),
            ]);
        } else  if(this.editedItem.code == 'India (+91)'){
          
           this.studentForm.get('phNo')
            .setValidators([
              Validators.required,
              Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
            ]);
        }
      });
      

        console.log(this.editedItem.subject);
        let editedMark = (this.editedItem.subject).map((e) => e.marks);
        let editedSub = (this.editedItem.subject).map((e) => e.subjectName)
        
        for(let i=0; i <= (this.editedItem.subNo)-1; i++){
          console.log(editedMark[i]);
          console.log(editedSub[i]);
        (<FormArray>this.studentForm.get('subject')).push(
          new FormGroup({
            subjectName: new FormControl(editedSub[i], [Validators.required,Validators.pattern('^[a-zA-Z0-9]+( [a-zA-Z0-9_]+)*$')]),
            marks: new FormControl(editedMark[i], [Validators.required,Validators.pattern('^0*(?:[0-9][0-9]?|100)$')]),
          })
        )
        }
      }

    }
  );

//   this.studentForm
//   .get('phNo')
//   .setValidators([
//     Validators.required,
//     Validators.pattern('^((\\+1-?)|0)?[0-9]{12}$'),
//   ]);
// } else if(code == 'India'){
// this.studentForm
//   .get('phNo')
//   .setValidators([
//     Validators.required,
//     Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
//   ]);


    this.onCode(this.code);
  }

  getToday(): string{
    return new Date().toISOString().split('T')[0];
  } 


  onCode(code) {
    this.code = code;
    this.studentForm.get('phNo').valueChanges.subscribe((phNo) => {
      if (code == 'USA (+1)') {
        this.studentForm
          .get('phNo')
          .setValidators([
            Validators.required,
            Validators.pattern('^((\\+1-?)|0)?[0-9]{12}$')
          ]);
      } else if(code == 'India (+91)'){
        this.studentForm
          .get('phNo')
          .setValidators([
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
          ]);
      }
    });
    console.log(code);
  }


  onSubmit() {

   let studentInfo = {};
   let avg: number;
   let grade: string;
   let en = Math.floor(100000000000 + Math.random() * 9000);

// --for marks--
    let sum = 0;
    if((this.studentForm.get('subject').value).map((e) => e.marks).length !== 0){
      for (let m=0; m < (this.studentForm.get('subject').value).map((e) => e.marks).length; m++) {
 
        sum = sum + (this.studentForm.get('subject').value).map((e) => e.marks)[m];
        console.log(sum);
      }

      // --average of marks--
       avg = sum/(this.studentForm.get('subject').value).map((e) => e.marks).length;
      console.log(avg);
    }

// --grade--
if(avg >= 80 && avg <= 100){
  grade = 'A';
}else if(avg >= 70 && avg < 80){
  grade = 'B';
}else if(avg >= 60 && avg < 70){
  grade = 'C';
}else if(avg >= 50 && avg < 60){
  grade = 'D';
}else if(avg >=33 && avg < 50){
  grade = 'E';
}else if(avg >= 0 && avg < 33){
  grade = 'F';
}

studentInfo = {
  enid:en,
  name: this.studentForm.get('name').value,
  email: this.studentForm.get('email').value,
  phNo: this.studentForm.get('phNo').value,
  dob : this.studentForm.get('dob').value,
  gender: this.studentForm.get('gender').value,
  semester: this.studentForm.get('semester').value,
  subject: this.studentForm.get('subject').value,
  grade: grade,
  subNo: this.studentForm.get('subNo').value,
  condition: this.studentForm.get('condition').value,
  code: this.code
 }
 
 console.log(studentInfo);




if(this.editMode == true){

  this.student[this.student.indexOf(this.editedItem)]=studentInfo;
this.stu.dataChanged.next(this.student);

  console.log(this.editMode);
  this.studentForm.reset();
  this.editMode = false;
  this.stu.editMode.next(this.editMode);
  // this.editMode = false;
}
else if(this.editMode == false){
  this.student.push(studentInfo);
  console.log(this.student);
  this.stu.dataChanged.next(this.student);
 
  this.studentForm.reset();
  this.editMode = false;
}
this.router.navigate(['list']);
  
  }

  // --subject input field

  onSubject(val) {
    console.log(val);
    (<FormArray>this.studentForm.get('subject')).clear();
      for (let i = 1; i <= val; i++) {
        (<FormArray>this.studentForm.get('subject')).push(
          new FormGroup({
            subjectName: new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z0-9]+( [a-zA-Z0-9_]+)*$')]),
            marks: new FormControl(null, [Validators.required,Validators.pattern('^0*(?:[0-9][0-9]?|100)$')]),
          })
        );
        }
  }

  // --for subject & marks
  getControls() {
    return (<FormArray>this.studentForm.get('subject')).controls;
  }


  // --for country wise validation

}
