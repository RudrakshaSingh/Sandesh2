import ApiError from "./ApiError.js";

const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await requestHandler(req, res, next);
        } catch (error) {
            next(error instanceof Error ? error : new ApiError(500, "Internal Server Error"));
        }
    };
};

export default asyncHandler;