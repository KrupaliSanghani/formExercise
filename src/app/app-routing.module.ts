import { Component, ComponentRef, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { UsernameValidator } from './username.validator';

const routes: Routes = [
  { path: '', redirectTo: '/add', pathMatch: 'full' },
  { path: 'add', component: AddStudentComponent },
  { path: 'list', component: ListStudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
