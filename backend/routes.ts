import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();
const { getConnectedClient } = require('./db');
const { ObjectId } = require('mongodb');

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("todosdb").collection("todos");
    return collection;
}



// GET /todos
router.get('/todos', async (req: Request, res: Response) => {
    const collection = getCollection();
    const todos = await collection.find({}).toArray();

    res.status(200).json(todos);
});

// GET /nestedTodos
router.get('/nestedTodos', async (req: Request, res: Response) => {
    const collection = getCollection();
    const nestedTodos = await collection.find({}).toArray();
    res.status(200).json(nestedTodos);
});

// POST /todos
router.post('/todos', async (req: Request, res: Response) => {
    const collection = getCollection();
    let { todo } = req.body;

    if (!todo) {
        return res.status(400).json({ mssg: "Error no todo found"});
    }

    todo = (typeof todo === "string") ? todo : JSON.stringify(todo);
    const newTodo = await collection.insertOne({ todo, status: false})


    res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
});

// POST /nestedTodos
router.post('/nestedTodos', async (req: Request, res: Response) => {
    const collection = getCollection();
    let { todo, parent_id } = req.body;

    if (!todo || !parent_id) {
        return res.status(400).json({ mssg: "Error: Missing todo or parent_id" });
    }

    todo = (typeof todo === "string") ? todo : JSON.stringify(todo);
    const newNestedTodo = await collection.insertOne({ todo, status: false, parent_id });

    res.status(201).json({ todo, status: false, _id: newNestedTodo.insertedId });
});



// DELETE /todos/:id
router.delete('/todos/:id', async (req: Request, res: Response) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);

    const deletedTodo = await collection.deleteOne({ _id });


    res.status(200).json({deletedTodo});
});


// DELETE /nestedTodos/:id
router.delete('/nestedTodos/:id', async (req: Request, res: Response) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const deletedNestedTodo = await collection.deleteOne({ _id });
    res.status(200).json({ deletedNestedTodo });
});

// PUT /todos/:id
router.put('/todos/:id',async (req: Request, res: Response) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { status } = req.body;

    if ( typeof status  !== "boolean") {
        return res.status(400).json({ mssg: "invalid status"});
    }

    const updatedTodo = await collection.updateOne({ _id }, { $set: { status: !status } });


    res.status(200).json({updatedTodo});
});


//PUT /nestedTodos/:id
router.put('/nestedTodos/:id', async (req: Request, res: Response) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { status } = req.body;

    if (typeof status !== "boolean") {
        return res.status(400).json({ mssg: "invalid status" });
    }

    const updatedNestedTodo = await collection.updateOne({ _id }, { $set: { status: !status } });
    res.status(200).json({ updatedNestedTodo });
});


// // PUT /todos/:id FOR THE TODO EDITING
router.put('/editTodos/:id', async (req: Request, res: Response) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { todo } = req.body;

    // Validate the title
    if (!todo || typeof todo !== "string") {
        return res.status(400).json({ mssg: "Invalid todo" });
    }

    try {
        const updatedTodo = await collection.updateOne({ _id }, { $set: { todo } });

        if (updatedTodo.modifiedCount === 0) {
            return res.status(404).json({ mssg: "Todo not found" });
        }

        res.status(200).json({ mssg: "Todo title updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update todo title" });
    }
});


export default router;


