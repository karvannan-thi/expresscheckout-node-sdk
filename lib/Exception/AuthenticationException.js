import { JuspayException } from './JuspayException';

export class AuthenticationException extends JuspayException {
    constructor(httpResponseCode, status, errorCode, errorMessage) {
        super(httpResponseCode, status, errorCode, errorMessage);
    }

};

