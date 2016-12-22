import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TodoListModule } from './todo-list/todo-list.module';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, TodoListModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }