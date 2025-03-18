// server.ts
import express from 'express';
import { generateId } from './helpers';
import { ITask, ISubtask } from './tasks.interface';
import db  from './db';

const cors = require('cors');
const app = express();

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors());


// Fetch all todos with their subtasks
app.get('/tasks', (req, res) => {
    // Fetch all tasks from the database
    db.all('SELECT * FROM tasks', [], (err, tasks) => {
        if (err) {
            // If there's an error, return a 500 status with the error message
            return res.status(500).json({ error: err.message });
        }

        // Return the tasks as a JSON response
        return res.json(tasks);
    });
});


        // db.all('SELECT * FROM subtasks', [], (err, subtasks: ISubtask[]) => {
        //     if (err) return res.status(500).json({ error: err.message });

        

        //     const buildHierarchy = (items: ISubtask[], parentId: string | null = null): ISubtask[] => {
        //         return items
        //             .filter(item => item.parent_id === parentId)
        //             .map(item => ({
        //                 ...item,
        //                 subtasks: buildHierarchy(items, item.id),
        //             }));
        //     };

        //     const todosWithSubtasks = todos.map(todo => ({
        //         ...todo,
        //         subtasks: buildHierarchy(subtasks, null).filter(st => st.todo_id === todo.id),
        //     }));

        //     res.json(todosWithSubtasks);

        //     return;
        // });

        

// Add a new todo with subtasks
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    
    db.all('SELECT id FROM tasks', [], (err, tasks: ITask[]) => {
        if (err) return res.status(500).json({ error: err.message });

        const id = generateId(null, tasks); // Generate ID for the main task

        db.run(
            'INSERT INTO tasks (id, title, description) VALUES (?, ?, ?)',
            [id, title, description || 'todo'],
            err => {
                if (err) return res.status(500).json({ error: err.message });

                // if (subtasks && subtasks.length > 0) {
                //     addSubtasks(db, subtasks, id, null);
                // } else {
                res.json({ id, title, description });
                // }

                return;
            }
        );

        return;
    });
});

// Update a TODO
app.put('/tasks/:id', (req, res) => {
    const { title, description } = req.body;

    console.log(title, description);
    db.run(
        'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
        [title, description, req.params.id],
        err => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ message: 'Updated successfully' });

            return;
        }
    );
});

// Delete a TODO
app.delete('/tasks/:id', (req, res) => {
    db.run(`DELETE FROM tasks WHERE id = ?`, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        return res.json({ id: req.params.id, message: 'Deleted successfully' });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
