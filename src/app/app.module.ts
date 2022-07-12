import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { UsernameValidator } from './username.validator';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddStudentComponent,
    ListStudentComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
