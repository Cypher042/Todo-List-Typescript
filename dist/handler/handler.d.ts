import type { Request, Response, NextFunction } from 'express';
export declare function getAllTasks(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function postATask(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getTaskWithID(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateTaskWithID(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteTaskWithID(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=handler.d.ts.map