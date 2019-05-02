import { JuspayException } from './JuspayException';

export class APIConnectionException extends JuspayException {
    constructor(httpResponseCode, status, errorCode, errorMessage) {
        super(httpResponseCode, status, errorCode, errorMessage);
    }

};
