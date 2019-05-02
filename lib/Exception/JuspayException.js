
export class JuspayException extends Error {
    constructor(httpResponseCode, status, errorCode, errorMessage) {
        super(errorMessage);
        this.httpResponseCode = httpResponseCode;
        this.status = status;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    getHttpResponseCode() {
        return this.httpResponseCode;
    }

    getStatus() {
        return this.status;
    }

    getErrorCode() {
        return this.errorCode;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

};

