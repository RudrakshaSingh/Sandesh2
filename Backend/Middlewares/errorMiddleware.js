import ApiError from "../Helpers/ApiError.js";
import ApiResponse from "../Helpers/ApiResponse.js";

const errorMiddleware = (err, req, res, next) => {
   if (err instanceof ApiError) {
      if (process.env.NODE_ENV === "development") {
         console.error(err.stack);
      }
      return res.status(err.statusCode).json(err.toJSON());
   }
   return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
};

export default errorMiddleware;