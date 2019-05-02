import { JuspayEntity } from './JuspayEntity';
import { APIConnectionException } from '../Exception/APIConnectionException';
import { APIException } from '../Exception/APIException';
import { AuthenticationException } from '../Exception/AuthenticationException';
import { InvalidRequestException } from '../Exception/InvalidRequestException';
import { RequestMethod } from '../RequestMethod';
import { WalletList } from './WalletList';

/**
 * Class Wallet
 *
 * @property string id
 * @property string object
 * @property string wallet
 * @property string token
 * @property boolean linked
 * @property float currentBalance
 * @property DateTime lastRefreshed
 *
 * @package Juspay\Model
 */
export class Wallet extends JuspayEntity {
    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params) {
        super();
        for (var key of Object.values(Object.keys(params))) {
            var newKey = this.camelize(key);

            if (newKey == "lastRefreshed") {
                this[newKey] = new Date(params[key]);
            } else {
                this[newKey] = params[key];
            }
        }
    }

    /**
     *
     * @param string customerId
     * @param RequestOptions|null requestOptions
     *
     * @return WalletList
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static listAll(customerId, requestOptions = undefined) {
        if (customerId == undefined || customerId == "") {
            throw new InvalidRequestException();
        }

        var response = Wallet.makeServiceCall("/customers/" + customerId + "/wallets", undefined, RequestMethod.GET, requestOptions);
        return new WalletList(response);
    }

    /**
     *
     * @param string customerId
     * @param RequestOptions|null requestOptions
     *
     * @return WalletList
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static refresh(customerId, requestOptions = undefined) {
        if (customerId == undefined || customerId == "") {
            throw new InvalidRequestException();
        }

        var response = Wallet.makeServiceCall("/customers/" + customerId + "/wallets/refresh-balances", undefined, RequestMethod.GET, requestOptions);
        return new WalletList(response);
    }

    /**
     *
     * @param string customerId
     * @param string gateway
     * @param RequestOptions|null requestOptions
     *
     * @return Wallet
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static create(customerId, gateway, requestOptions = undefined) {
        if (customerId == undefined || customerId == "" || gateway == undefined || gateway == "") {
            throw new InvalidRequestException();
        }

        var params = Array();
        params.gateway = gateway;
        var response = Wallet.makeServiceCall("/customers/" + customerId + "/wallets", params, RequestMethod.POST, requestOptions);
        return new Wallet(response);
    }

    /**
     *
     * @param string customerId
     * @param string gateway
     * @param RequestOptions|null requestOptions
     *
     * @return Wallet
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static createAndAuthenticate(customerId, gateway, requestOptions = undefined) {
        if (customerId == undefined || customerId == "" || gateway == undefined || gateway == "") {
            throw new InvalidRequestException();
        }

        var params = Array();
        params.gateway = gateway;
        params.command = "authenticate";
        var response = Wallet.makeServiceCall("/customers/" + customerId + "/wallets", params, RequestMethod.POST, requestOptions);
        return new Wallet(response);
    }

    /**
     *
     * @param string walletId
     * @param RequestOptions|null requestOptions
     *
     * @return Wallet
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static refreshByWalletId(walletId, requestOptions = undefined) {
        if (walletId == undefined || walletId == "") {
            throw new InvalidRequestException();
        }

        var params = Array();
        params.command = "refresh";
        var response = Wallet.makeServiceCall("/wallets/" + walletId, params, RequestMethod.GET, requestOptions);
        return new Wallet(response);
    }

    /**
     *
     * @param string walletId
     * @param RequestOptions|null requestOptions
     *
     * @return Wallet
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static authenticate(walletId, requestOptions = undefined) {
        if (walletId == undefined || walletId == "") {
            throw new InvalidRequestException();
        }

        var params = Array();
        params.command = "authenticate";
        var response = Wallet.makeServiceCall("/wallets/" + walletId, params, RequestMethod.POST, requestOptions);
        return new Wallet(response);
    }

    /**
     *
     * @param string walletId
     * @param string otp
     * @param RequestOptions|null requestOptions
     *
     * @return Wallet
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static link(walletId, otp, requestOptions = undefined) {
        if (walletId == undefined || walletId == "" || otp == undefined || otp == "") {
            throw new InvalidRequestException();
        }

        var params = Array();
        params.command = "link";
        params.otp = otp;
        var response = Wallet.makeServiceCall("/wallets/" + walletId, params, RequestMethod.POST, requestOptions);
        return new Wallet(response);
    }

    /**
     *
     * @param string walletId
     * @param RequestOptions|null requestOptions
     *
     * @return Wallet
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static delink(walletId, requestOptions = undefined) {
        if (walletId == undefined || walletId == "") {
            throw new InvalidRequestException();
        }

        var params = Array();
        params.command = "delink";
        var response = Wallet.makeServiceCall("/wallets/" + walletId, params, RequestMethod.POST, requestOptions);
        return new Wallet(response);
    }

};
