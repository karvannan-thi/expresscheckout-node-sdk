import { JuspayEntity } from './JuspayEntity';
import { APIConnectionException } from '../Exception/APIConnectionException';
import { APIException } from '../Exception/APIException';
import { AuthenticationException } from '../Exception/AuthenticationException';
import { InvalidRequestException } from '../Exception/InvalidRequestException';
import { RequestMethod } from '../RequestMethod';

/**
 * Class Payment
 *
 * @property string orderId
 * @property string txnId
 * @property string status
 * @property string method
 * @property string url
 * @property array params
 *
 * @package Juspay\Model
 */
export class Payment extends JuspayEntity {
    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params) {
        super();
        for (var key of Object.values(Object.keys(params))) {
            var newKey = this.camelize(key);
            this[newKey] = params[key];
        }
    }

    /**
     *
     * @param array params
     * @param RequestOptions|null requestOptions
     *
     * @return Payment
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static create(params, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        params.format = "json";
        return new Promise(async (resolve,reject) => {
            try {
                var response = await Payment.makeServiceCall("/txns", params, RequestMethod.POST, requestOptions);
                response = Payment.updatePaymentResponseStructure(response);
                resolve(new Payment(response));
            }catch(error) {
                reject(error);
            }  
        });
    }

    /**
     * Restructuring the payment response.
     * Removed unnecessary hierarchy in the response.
     *
     * @param array response
     *
     * @return array
     */
    static updatePaymentResponseStructure(response) {
        var authResp = response.payment.authentication;
        response.method = authResp.method;
        response.url = authResp.url;

        if (response.method == "POST") {
            response.params = Array();

            for (var key of Object.values(Object.keys(authResp.params))) {
                response.params[key] = authResp.params[key];
            }
        }

        delete response.payment;
        return response;
    }

};

