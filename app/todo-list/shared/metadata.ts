export interface TodoPersist {
    _id: string,
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TodoPersistToSave {
    _id: string,
    title: string;
    completed: boolean;
}

export enum FilterTypes {
    ALL,
    ACTIVE,
    COMPLETED
}