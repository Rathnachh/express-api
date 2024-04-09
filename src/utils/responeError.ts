export class ResponseError extends Error {
    statusCode: number;
    // message: string;

    constructor(statusCode: number,message: string){
        super(message); 
        this.statusCode = statusCode
       
    }
    
//     static badRequest (message: string){

//             return new ResponseError(400,message);
//     }
//     static NotFound (resource: string){
        
//         return new ResponseError(404,`${resource} not found`);
// }
//     static InternalServerError (message: string){
        
//         return new ResponseError(500,message);
// }
}