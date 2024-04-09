import { Request, Response, NextFunction } from 'express';
import { BaseCustomError } from '../utils/customError';
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof BaseCustomError) { 
       
        console.log(err)
        const statusCode= err.statusCode;
        res.status(statusCode).json({
            statusCode: statusCode,
            message: err.message,

        })
       
    }
    next()
  }
  
  export default errorHandler