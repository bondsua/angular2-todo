import {Component, OnInit} from '@angular/core';
import 'rxjs/operator/filter';
import { Observable } from 'rxjs/Rx';

import {TodoListService} from './shared/todo-list.service'
import {Logger} from "angular2-logger/core";
import {TodoModel} from "./shared/todo.model";
import {TodoPersist, FilterTypes} from "./shared/metadata";

@Component({
    moduleId: module.id,
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['todo-list.component.css']
})
export class TodoListComponent implements OnInit {
    newTodoTitle: string;
    public filter: any;

    private _list: Array<TodoModel> = [];
    private _bufferList: Array<TodoModel> = [];
    get list() {
        return this._bufferList;
    }

    set list(list) {
        this._list = list;
    }

    constructor(private _todoService: TodoListService, private _logger: Logger) {
        this.filter = FilterTypes[FilterTypes.ALL];
    }

    ngOnInit() {
        this._todoService.getAll().subscribe((todos: TodoModel[]) => {
            this.list = todos;
            this.updateBuffer();
        });
    }

    getClass(item: TodoModel) {
        return {
            completed: item.completed,
            editing: item.editing,
            updating: item.updating
        }
    }

    edit(todo: TodoModel) {
        todo.editing = true;
    }

    toggleCompletion(todo: TodoModel) {
        todo.completed = !todo.completed;
        todo.updating = true;
        this._todoService.update(todo).subscribe(() => {
            todo.updating = false;
            this.updateBuffer();
        }, () => {
            todo.completed = !todo.completed;
        })
    }

    edited(todo: TodoModel, value?: string) {
        if (!todo.editing) {
            return;
        }
        todo.editing = false;
        if (typeof value === 'undefined') {
            return;
        }

        let newValue = value.trim();
        if (todo.title === newValue) {
            return;
        }

        if (newValue.length == 0) {
            this.remove(todo);
        }

        const prevTitle = todo.title;
        todo.title = value;
        todo.updating = true;
        this._todoService.update(todo).subscribe(() => {
            todo.updating = false;
        }, () => {
            todo.updating = false;
            todo.title = prevTitle;
        })
    }

    add() {
        let title = this.newTodoTitle.trim();
        if (title.length === 0) {
            return;
        }

        let model = new TodoModel(title);
        model.updating = true;

        this._todoService.add(model).subscribe((item: TodoPersist) => {
            model.updating = false;
            model.id = item._id;
            this._list.push(model);
            this.newTodoTitle = '';
            this.updateBuffer();

        }, () => {
            model.updating = false;
        })
    }

    remove(todo: TodoModel) {
        if (this._list.indexOf(todo) == -1) {
            return;
        }

        todo.updating = true;
        this._todoService.remove(todo).subscribe(() => {
            const index = this._list.indexOf(todo);
            if (index >= 0) {
                this._list.splice(index, 1);
                this.updateBuffer();
            }
        }, () => {
            todo.updating = false;
        });
    }

    getCompleted() {
        return this.list.filter((todo: TodoModel) => todo.completed)
    }

    getRemaining() {
        return this.list.filter((todo: TodoModel) => !todo.completed)
    }

    removeCompleted() {
        Observable
            .from(this._list)
            .filter((item: TodoModel) => item.completed)
            .subscribe((item: TodoModel) => {
                this.remove(item);
            });
    }

    isAllCompleted() {
        return this.list.length === this.getCompleted().length;
    }

    setFilter(value: FilterTypes) {
        this.filter = value;
        this.updateBuffer();
    }

    private updateBuffer() {
        this._bufferList = this._list.filter((item: TodoModel) => {
            switch (this.filter) {
                case FilterTypes[FilterTypes.ACTIVE]:
                    return !item.completed;

                case FilterTypes[FilterTypes.COMPLETED]:
                    return item.completed;

                default:
                    return true;
            }
        });
    }
}
