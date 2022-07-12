import { Component, OnInit } from '@angular/core';
import { StudentInfoService } from '../student-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
count: number;
  constructor(private stuService: StudentInfoService) { }

  ngOnInit(): void {

    // --student count

this.stuService.dataChanged.subscribe((len) => {
  this.count = len.length;
})
console.log(this.count);
  }


}
