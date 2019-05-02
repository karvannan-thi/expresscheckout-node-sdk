import { JuspayEntity } from './JuspayEntity';
import { APIConnectionException } from '../Exception/APIConnectionException';
import { APIException } from '../Exception/APIException';
import { AuthenticationException } from '../Exception/AuthenticationException';
import { InvalidRequestException } from '../Exception/InvalidRequestException';
import { RequestMethod } from '../RequestMethod';
import { OrderList } from './OrderList';
import { PaymentGatewayResponse } from './PaymentGatewayResponse';
import { PaymentLinks } from './PaymentLinks';
import { Refund } from './Refund';
import { Card } from './Card';
/**
 * Class Order
 *
 * @property string id
 * @property string orderId
 * @property string merchantId
 * @property string txnId
 * @property float amount
 * @property string currency
 * @property string customerId
 * @property string customerEmail
 * @property string customerPhone
 * @property string description
 * @property string productId
 * @property int gatewayId
 * @property string returnUrl
 * @property string udf1
 * @property string udf2
 * @property string udf3
 * @property string udf4
 * @property string udf5
 * @property string udf6
 * @property string udf7
 * @property string udf8
 * @property string udf9
 * @property string udf10
 * @property string status
 * @property int statusId
 * @property bool refunded
 * @property float amountRefunded
 * @property Refund[] refunds
 * @property string bankErrorCode
 * @property string bankErrorMessage
 * @property string paymentMethodType
 * @property string paymentMethod
 * @property Card card
 * @property PaymentGatewayResponse paymentGatewayResponse
 * @property PaymentLinks paymentLinks
 *
 * @package Juspay\Model
 */
export class Order extends JuspayEntity {

    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params) {
        super();
        for (var key of Object.values(Object.keys(params))) {
            var newKey = this.camelize(key);

            if (newKey == "card") {
                this[newKey] = new Card(params[key]);
            } else if (newKey == "paymentGatewayResponse") {
                this[newKey] = new PaymentGatewayResponse(params[key]);
            } else if (newKey == "refunds") {
                var refunds = Array();

                for (var i = 0; i < params[key].length; i++) {
                    refunds[i] = new Refund(params[key][i]);
                }

                this[newKey] = refunds;
            } else if (newKey == "paymentLinks") {
                this[newKey] = new PaymentLinks(params[key]);
            } else {
                this[newKey] = params[key];
            }
        }
    }

    /**
     *
     * @param array params
     * @param RequestOptions|null requestOptions
     *
     * @return Order
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

        return new Promise(async (resolve,reject) => {
            try {
                var response = await Order.makeServiceCall("/order/create", params, RequestMethod.POST, requestOptions);
                response = Order.addInputParamsToResponse(params, response);
                response = Order.updateOrderResponseStructure(response);
                resolve(new Order(response));
            }catch(error) {
                reject(error);
            }  
        });
    }

    /**
     *
     * @param array params
     * @param RequestOptions|null requestOptions
     *
     * @return Order
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static status(params, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        return new Promise(async (resolve,reject) => {
            try {
                var response = await Order.makeServiceCall("/order/status", params, RequestMethod.POST, requestOptions);
                response = Order.updateOrderResponseStructure(response);
                resolve(new Order(response));
            }catch(error) {
                reject(error);
            }  
        });
    }

    /**
     *
     * @param array params
     * @param RequestOptions|null requestOptions
     *
     * @return Order
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static update(params, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        return new Promise(async (resolve,reject) => {
            try {
                var response = await Order.makeServiceCall("/order/update", params, RequestMethod.POST, requestOptions);
                resolve(new Order(response));
            }catch(error) {
                reject(error);
            }  
        });
    }

    /**
     *
     * @param array|null params
     * @param RequestOptions|null requestOptions
     *
     * @return OrderList
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static listAll(params, requestOptions = undefined) {
        return new Promise(async (resolve,reject) => {
            try {
                var response = await Order.makeServiceCall("/order/list", params, RequestMethod.GET, requestOptions);
                resolve(new OrderList(response));
            }catch(error) {
                reject(error);
            }  
        });
    }

    /**
     *
     * @param array params
     * @param RequestOptions|null requestOptions
     *
     * @return Order
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static refund(params, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        return new Promise(async (resolve,reject) => {
            try {
                var response = await Order.makeServiceCall("/order/refund", params, RequestMethod.POST, requestOptions);
                response = Order.updateOrderResponseStructure(response);
                resolve(new Order(response));
            }catch(error) {
                reject(error);
            }  
        });
    }

    /**
     * Restructuring the order response.
     *
     * @param array response
     *
     * @return array
     */
    static updateOrderResponseStructure(response) {
        if ("card" in response) {
            var card = response.card;
            card.card_exp_month = card.expiry_month;
            card.card_exp_year = card.expiry_year;
            delete card.expiry_month;
            delete card.expiry_year;
        }

        return response;
    }

};

