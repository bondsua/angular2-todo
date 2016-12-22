import {TodoPersist, TodoPersistToSave} from "./metadata";
export class TodoModel {
    id: string;
    completed: boolean;
    updating: boolean;
    editing: boolean;
    createdAt: string;
    updatedAt: string;

    private _title: string;
    get title() {
        return this._title;
    }
    set title(value: string) {
        this._title = value.trim();
    }

    constructor(title: string) {
        this.editing = false;
        this.completed = false;
        this.title = title;
    }

    static createFromTodoPersist(item: TodoPersist) {
        let model = new TodoModel(item.title);
        model.completed = item.completed;
        model.id = item._id;
        model.createdAt = item.createdAt;
        model.updatedAt = item.updatedAt;

        return model;
    }

    toSaveJson(): TodoPersistToSave {
        return {
            "_id": this.id,
            "title": this.title,
            "completed": this.completed
        }
    }
}
