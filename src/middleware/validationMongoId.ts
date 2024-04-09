
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { BaseCustomError } from "../utils/customError";
import { StatusCode } from "../utils/cost";



export const validationmongoID = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    console.log(id)
    // Check if the provided ID matches the MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {

        console.log("Hello");
        const customError = new BaseCustomError("Invalid ID", StatusCode.NotFound);
        return next(customError); // Return here if the ID is invalid
        
    }
    next(); // Call next only if the ID is valid
};
