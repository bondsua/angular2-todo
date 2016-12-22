import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule, isDevMode } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TodoListComponent } from './todo-list.component';
import { TodoListService } from './shared/todo-list.service';
import { Logger, Level } from "angular2-logger/core";
import { ApiConfig } from '../shared/configurations';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    exports: [TodoListComponent],
    declarations: [TodoListComponent],
    providers: [TodoListService, Logger, ApiConfig],
})
export class TodoListModule {
    constructor(private _logger: Logger) {
        this._logger.level = isDevMode() ? Level.DEBUG : Level.WARN;
    }
}
