import { JuspayEntity } from './JuspayEntity';
import { APIConnectionException } from '../Exception/APIConnectionException';
import { APIException } from '../Exception/APIException';
import { AuthenticationException } from '../Exception/AuthenticationException';
import { InvalidRequestException } from '../Exception/InvalidRequestException';
import { RequestMethod } from '../RequestMethod';
import { RequestOptions } from '../RequestOptions';
/**
 * Class Card
 *
 * @property string cardNumber
 * @property string nameOnCard
 * @property string cardExpYear
 * @property string cardExpMonth
 * @property string cardSecurityCode
 * @property string nickname
 * @property string cardToken
 * @property string cardReference
 * @property string cardFingerprint
 * @property string cardIsin
 * @property string lastFourDigits
 * @property string cardType
 * @property string cardIssuer
 * @property bool savedToLocker
 * @property bool expired
 * @property string cardBrand
 *
 * @package Juspay\Model
 */
export class Card extends JuspayEntity {

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
 * @return Card
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

        var response = Card.makeServiceCall("/card/add", params, RequestMethod.POST, requestOptions);
        return new Card(response);
    }

    /**
 *
 * @param array params
 * @param RequestOptions|null requestOptions
 *
 * @return array
 *
 * @throws APIConnectionException
 * @throws APIException
 * @throws AuthenticationException
 * @throws InvalidRequestException
 */
    static listAll(params, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        var response = Card.makeServiceCall("/card/list", params, RequestMethod.GET, requestOptions);
        var cardArray = Array();

        if ("cards" in response) {
            cardArray = response.cards;

            for (var i = 0; i < cardArray.length; i++) {
                cardArray[i] = new Card(cardArray[i]);
            }
        }

        return cardArray;
    }

    /**
 *
 * @param array params
 * @param RequestOptions|null requestOptions
 *
 * @return bool
 *
 * @throws APIConnectionException
 * @throws APIException
 * @throws AuthenticationException
 * @throws InvalidRequestException
 */
    static delete(params, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        var response = Card.makeServiceCall("/card/delete", params, RequestMethod.POST, requestOptions);
        return response.deleted;
    }

};

