import sqlite3 from "sqlite3";
import { Database } from "sqlite";
import type { Task } from "../model/model.js";
export declare function initDB(): Promise<void>;
export declare function createTask(task: Task): Promise<Task>;
export declare function getAllTasks(): Promise<Task[]>;
export declare function getTaskById(id: string): Promise<Task | undefined>;
export declare function updateTaskById(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task | undefined>;
export declare function deleteTaskById(id: string): Promise<boolean>;
export declare function getDB(): Database<sqlite3.Database, sqlite3.Statement>;
//# sourceMappingURL=database.d.ts.map