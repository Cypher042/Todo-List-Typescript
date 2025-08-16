import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import fs from "fs";
let db;
export async function initDB() {
    const dataDir = path.resolve("./data");
    if (!fs.existsSync(dataDir))
        fs.mkdirSync(dataDir);
    db = await open({
        filename: path.join(dataDir, "tasks.db"),
        driver: sqlite3.Database,
    });
    await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      status TEXT NOT NULL CHECK (status IN ('PENDING','IN_PROGRESS','COMPLETED')),
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
    CREATE INDEX IF NOT EXISTS idx_tasks_title ON tasks(title);
  `);
}
export async function createTask(task) {
    await getDB().run(`INSERT INTO tasks (id, title, description, status, createdAt, updatedAt)
     VALUES (?,?,?,?,?,?)`, task.id, task.title, task.description, task.status, task.createdAt, task.updatedAt);
    return task;
}
export async function getAllTasks() {
    const db = getDB();
    return await db.all('SELECT * FROM tasks');
}
export async function getTaskById(id) {
    const db = getDB();
    return await db.get('SELECT * FROM tasks WHERE id = ?', id);
}
export async function updateTaskById(id, updates) {
    const db = getDB();
    const task = await getTaskById(id);
    if (!task)
        return undefined;
    const updatedTask = {
        ...task,
        ...updates,
        updatedAt: new Date().toISOString(),
    };
    await db.run('UPDATE tasks SET title = ?, description = ?, status = ?, updatedAt = ? WHERE id = ?', updatedTask.title, updatedTask.description, updatedTask.status, updatedTask.updatedAt, id);
    return updatedTask;
}
export async function deleteTaskById(id) {
    const db = getDB();
    const result = await db.run('DELETE FROM tasks WHERE id = ?', id);
    return !!result?.changes;
}
export function getDB() {
    if (!db) {
        throw new Error("DB not initialized. Call initDB() first.");
    }
    return db;
}
//# sourceMappingURL=database.js.map