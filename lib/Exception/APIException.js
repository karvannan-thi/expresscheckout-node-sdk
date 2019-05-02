import { JuspayException } from './JuspayException';

export class APIException extends JuspayException {
    constructor(httpResponseCode, status, errorCode, errorMessage) {
        super(httpResponseCode, status, errorCode, errorMessage);
    }

};

