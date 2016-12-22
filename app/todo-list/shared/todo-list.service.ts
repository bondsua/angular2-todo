import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/operator/map';
import 'rxjs/operator/catch';

import { TodoModel } from './todo.model';
import { Logger } from "angular2-logger/core";
import { TodoPersist } from "./metadata";
import { ApiConfig } from '../../shared/configurations';

@Injectable()
export class TodoListService {
    static apiPath = 'todos';
    private _apiUri: string;
    private _httpOptions:RequestOptions;

    constructor(private _http: Http, private _conf: ApiConfig, private _logger: Logger) {
        this._apiUri = _conf.url + TodoListService.apiPath;

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        this._httpOptions = new RequestOptions({ headers: headers });
    }

    getAll(): Observable<TodoModel[]> {
        this._logger.debug('get all model');

        return this
            ._http
            .get(this._apiUri, this._httpOptions)
            .map((res: Response) => <TodoPersist[]>res.json())
            .map((items: TodoPersist[]) => {
                return items.map((item: TodoPersist) => TodoModel.createFromTodoPersist(item));
            })
            .catch(this.handleError);
    }

    remove(item: TodoModel):Observable<Response> {
        this._logger.debug('remove model');

        return this
            ._http
            .delete(`${this._apiUri}/${item.id}`, this._httpOptions)
            .catch(this.handleError);
    }

    update(item: TodoModel): Observable<Response> {
        this._logger.debug('update model');

        return this
            ._http
            .put(`${this._apiUri}/${item.id}`, JSON.stringify(item.toSaveJson()), this._httpOptions)
            .catch(this.handleError);
    }

    add(item: TodoModel): Observable<TodoPersist> {
        this._logger.debug('add model');

        return this
            ._http
            .post(this._apiUri, JSON.stringify(item.toSaveJson()), this._httpOptions)
            .map((res: Response) => <TodoPersist>res.json())
            .catch(this.handleError);
    }

    private handleError = (error: Response) => {
        this._logger.error(error);
        return Observable.throw(error || 'Server error');
    }
}