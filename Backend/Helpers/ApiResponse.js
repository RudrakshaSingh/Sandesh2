class ApiResponse {
    constructor(statusCode, data, message = "Success", metadata = {}) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 400;
    }

    toJSON() {
        const response = {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
        };

        return response;
    }
}

export default ApiResponse;