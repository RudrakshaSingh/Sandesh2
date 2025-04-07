class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
       super(message);
       this.statusCode = statusCode;
       this.success = false;
       this.errors = errors;
 
       if (stack) {
          this.stack = stack;
       } else {
          Error.captureStackTrace(this, this.constructor);
       }
    }
 
    toJSON() {
       return {
          success: this.success,
          statusCode: this.statusCode,
          message: this.message,
          errors: this.errors,
          stack: process.env.NODE_ENV === "development" ? this.stack : undefined,
       };
    }
 }
 
export default ApiError;
 