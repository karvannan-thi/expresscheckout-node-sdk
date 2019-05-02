import { JuspayEntity } from './JuspayEntity';
import { APIConnectionException } from '../Exception/APIConnectionException';
import { APIException } from '../Exception/APIException';
import { AuthenticationException } from '../Exception/AuthenticationException';
import { InvalidRequestException } from '../Exception/InvalidRequestException';
import { RequestMethod } from '../RequestMethod';

/**
 * Class PaymentMethod
 *
 * @property string paymentMethod
 * @property string paymentMethodType
 * @property string description
 *
 * @package Juspay\Model
 */
export class PaymentMethod extends JuspayEntity {

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
     * @param string merchantId
     * @param RequestOptions|null requestOptions
     *
     * @return PaymentMethodList
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static listAll(merchantId, requestOptions = undefined) {
        if (merchantId == undefined || merchantId == "") {
            throw new InvalidRequestException();
        }

        var response = PaymentMethod.makeServiceCall("/merchants/" + merchantId + "/paymentmethods", undefined, RequestMethod.GET, requestOptions);
        var paymentMethods = Array();

        if ("payment_methods" in response) {
            paymentMethods = response.payment_methods;

            for (var i = 0; i < paymentMethods.length; i++) {
                paymentMethods[i] = new PaymentMethod(paymentMethods[i]);
            }
        }

        return paymentMethods;
    }

};

