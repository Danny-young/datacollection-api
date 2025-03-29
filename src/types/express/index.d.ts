export {};

declare global {
    namespace Express {
        export interface Request {
            userID?: Number;
            cleanBody?: any;
            };
        }
    
}