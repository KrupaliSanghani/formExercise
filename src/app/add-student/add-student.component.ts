import { Component,  OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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


// --country Array
  countryCodeArr = [
    { country: 'India', code: '+91' },
    { country: 'USA', code: '+1' }
  ];
  mark: any;



  constructor(private stu: StudentInfoService, private fb: FormBuilder) {}

  
  ngOnInit(): void {

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


    // --delete data--
    this.stu.deletedData.subscribe((e) => {
      this.student = e;
      console.log(this.student);
    })
    console.log(this.stu.deletedData);


    // --edit data--
    this.stu.editMode.subscribe((e) => this.editMode = e);
    this.stu.index.subscribe( index => { this.editedItemIndex= index;});
  this.subscription =  this.stu.startedEditing.subscribe(
    (val) => {
      //  this.editMode = true;
       console.log(val);
       this.editedItem = val;
       console.log(this.editedItem);

       if(this.editMode){
          this.studentForm.patchValue({
        name: this.editedItem.name,
        email: this.editedItem.email,
        phNo: this.editedItem.phNo,
        dob: this.editedItem.dob,
        gender: this.editedItem.gender,
        subNo: this.editedItem.subNo,
        semester: this.editedItem.semester


       });
      }


      if(this.editMode == true){
        console.log(this.editedItem.subject);
        let editedMark = (this.editedItem.subject).map((e) => e.marks);
        let editedSub = (this.editedItem.subject).map((e) => e.subjectName)

        // subNo
        
        for(let i=0; i <= (this.editedItem.subNo)-1; i++){
          console.log(editedMark[i]);
          console.log(editedSub[i]);
        (<FormArray>this.studentForm.get('subject')).push(
          new FormGroup({
            subjectName: new FormControl(editedSub[i], [Validators.required,Validators.pattern('^[a-zA-Z]*')]),
            marks: new FormControl(editedMark[i], [Validators.required,Validators.pattern('^0*(?:[1-9][0-9]?|100)$')]),
          })
        )
        }
      }

    }
  );

        


    this.onCode('a');
  }




  onSubmit() {

    // this.mark = (this.studentForm.get('subject').value).map((e) => e.marks);
    // let m = this.mark.value
    // console.log(this.mark);

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
  phNo: this.studentForm.get('phNo').value,
  dob : this.studentForm.get('dob').value,
  gender: this.studentForm.get('gender').value,
  semester: this.studentForm.get('semester').value,
  subject: this.studentForm.get('subject').value,
  grade: this.grade,
  subNo: this.studentForm.get('subNo').value
 }
 
 console.log(this.studentInfo);




if(this.editMode == true){

  this.student[this.editedItemIndex]=this.studentInfo;
this.stu.dataChanged.next(this.student);

  console.log(this.editMode);
  this.studentForm.reset();
  this.editMode = false;
  this.stu.editMode.next(this.editMode);
  // this.editMode = false;
}
else if(this.editMode == false){
  this.student.push(this.studentInfo);
  console.log(this.student);
  this.stu.dataChanged.next(this.student);
 
  this.studentForm.reset();
  this.editMode = false;
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
