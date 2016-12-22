import express from 'express';
import { Todo } from './../models';

const route = express.Router();

route.route('/')
    .get(async (req, res) => {
        try {
            const todos = await Todo.find().sort({createdAt:1});
            res.json(todos);

        } catch (e) {
            console.log(e.message);
            res.sendStatus(500);
        }
    })
    .post(async (req, res) => {
        try {
            const body = req.body;
            const model = new Todo({
                title: body.title ? body.title : null,
                completed: body.completed ? body.completed : false
            });

            await model.save();

            res.send(model);
        } catch (e) {
            console.log('error to save new model Todo. Error', e.message);
            res.send(500, e.message);
        }
    });

route.route('/:id')
    .get(async (req, res) => {
        let id = req.params.id;

        if (id.match(/^[0-9a-fA-F]{24}$/) == null) {
            res.status(400).send('Invalid id');
            return;
        }

        try {
            const todo = await Todo.findById(id);
            if (todo === null) {
                res.sendStatus(404);
                return;
            }

            res.json(todo);
        } catch (e) {
            console.log('error get model Todo. Error', e.message);
            res.send(500);
        }
    })
    .put(async (req, res) => {
        let id = req.params.id;

        if (id.match(/^[0-9a-fA-F]{24}$/) == null) {
            res.status(400).send('Invalid id');
            return;
        }

        try {
            const body = req.body;
            const todo = await Todo.findById(id);
            if (todo === null) {
                res.sendStatus(404);
                return;
            }

            todo.title = body.title ? body.title : todo.title;
            todo.completed = body.completed ? body.completed : todo.completed;
            await todo.save();

            res.json(todo);
        } catch (e) {
            console.log('error update model Todo. Error', e.message);
            res.send(500);
        }
    })
    .delete(async (req, res) => {
        let id = req.params.id;

        if (id.match(/^[0-9a-fA-F]{24}$/) == null) {
            res.status(400).send('Invalid id');
            return;
        }

        try {
            const todo = await Todo.findById(id);
            if (todo === null) {
                res.sendStatus(404);
                return;
            }

            await todo.remove();
            res.json(todo);
        } catch (e) {
            console.log('error delete model Todo. Error', e.message);
            res.send(500);
        }
    });



export default route;
