import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define a new interface that extends the existing Request interface
interface AuthenticatedRequest extends Request {
    user?: any; // Define a user property of type any
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET || '', (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user; // Assign the user to the user property of the request
        next();
    });
};
