import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {
  
 


// --for add & edit--
  dataChanged = new BehaviorSubject<any[]>([]);
  startedEditing = new BehaviorSubject({});
  // deletedData = new BehaviorSubject([]);
  
  editMode = new BehaviorSubject<any>(false);

  

  constructor() { }


}
