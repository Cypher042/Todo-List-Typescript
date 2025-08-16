import { v4 as uuidv4 } from 'uuid';
import { getDB, createTask } from '../database/database.js';
import { title } from 'process';
import { z } from 'zod';
const TaskInputSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
});
export async function getAllTasks(req, res, next) {
    try {
        const db = getDB();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const tasks = await db.all('SELECT * FROM tasks LIMIT ? OFFSET ?', limit, offset);
        const total = (await db.get('SELECT COUNT(*) as count FROM tasks')).count;
        res.json({
            page,
            limit,
            total,
            tasks
        });
    }
    catch (err) {
        next(err);
    }
}
export async function postATask(req, res, next) {
    try {
        const parseResult = TaskInputSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: parseResult.error.issues });
        }
        const { title, description = '', status = 'PENDING' } = parseResult.data;
        const now = new Date().toISOString();
        const task = {
            id: uuidv4(),
            title,
            description,
            status,
            createdAt: now,
            updatedAt: now,
        };
        await createTask(task);
        res.status(201).json(task);
    }
    catch (err) {
        next(err);
    }
}
export async function getTaskWithID(req, res, next) {
    try {
        const db = getDB();
        const { id } = req.params;
        const task = await db.get('SELECT * FROM tasks WHERE id = ?', id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    }
    catch (err) {
        next(err);
    }
}
export async function updateTaskWithID(req, res, next) {
    try {
        const parseResult = TaskInputSchema.partial().safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: parseResult.error.issues });
        }
        const db = getDB();
        const { id } = req.params;
        const { title, description, status } = parseResult.data;
        const task = await db.get('SELECT * FROM tasks WHERE id = ?', id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const updatedTask = {
            ...task,
            title: title ?? task.title,
            description: description ?? task.description,
            status: status ?? task.status,
            updatedAt: new Date().toISOString(),
        };
        await db.run('UPDATE tasks SET title = ?, description = ?, status = ?, updatedAt = ? WHERE id = ?', updatedTask.title, updatedTask.description, updatedTask.status, updatedTask.updatedAt, id);
        res.json(updatedTask);
    }
    catch (err) {
        next(err);
    }
}
export async function deleteTaskWithID(req, res, next) {
    try {
        const db = getDB();
        const { id } = req.params;
        const task = await db.get('SELECT * FROM tasks WHERE id = ?', id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await db.run('DELETE FROM tasks WHERE id = ?', id);
        res.json({ message: 'Task deleted' });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=handler.js.map