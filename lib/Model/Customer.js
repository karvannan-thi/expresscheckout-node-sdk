import { JuspayEntity } from './JuspayEntity';
import { APIConnectionException } from '../Exception/APIConnectionException';
import { APIException } from '../Exception/APIException';
import { AuthenticationException } from '../Exception/AuthenticationException';
import { InvalidRequestException } from '../Exception/InvalidRequestException';
import { RequestMethod } from '../RequestMethod';
import { CustomerList } from './CustomerList';
import { resolve } from 'dns';
/**
 * Class Customer
 *
 * @property string id
 * @property string object
 * @property string firstName
 * @property string lastName
 * @property string mobileCountryCode
 * @property string mobileNumber
 * @property string emailAddress
 * @property DateTime dateCreated
 * @property DateTime lastUpdated
 * @property string objectReferenceId
 *
 * @package Juspay\Model
 */
export class Customer extends JuspayEntity {
    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params) {
        super();
        for (var key of Object.values(Object.keys(params))) {
            var newKey = this.camelize(key);

            if (newKey == "dateCreated" || newKey == "lastUpdated") {
                this[newKey] = new Date(params[key]);
            } else {
                this[newKey] = params[key];
            }
        }
        console.log(this);
    }

    /**
     *
     * @param array params
     * @param RequestOptions|null requestOptions
     *
     * @return Customer
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
                var response = await Customer.makeServiceCall("/customers", params, RequestMethod.POST, requestOptions);
                resolve(response);
            }catch(error) {
                reject(error);
            }  
        });
        
    }

    /**
     *
     * @param string id
     * @param array params
     * @param RequestOptions|null requestOptions
     *
     * @return Customer
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static update(id, params, requestOptions = undefined) {
        if (id == undefined || id == "" || params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        return new Promise(async (resolve,reject) => {
            try {
                var response = await Customer.makeServiceCall("/customers/" + id, params, RequestMethod.POST, requestOptions);
                resolve(response);
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
     * @return CustomerList
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static listAll(params, requestOptions = undefined) {
        return new Promise(async (resolve,reject) => {
            try {
                var response = await Customer.makeServiceCall("/customers", params, RequestMethod.GET, requestOptions);
                resolve(response);
            }catch(error) {
                reject(error);
            }  
        });
    }

    /**
     *
     * @param string id
     * @param RequestOptions|null requestOptions
     *
     * @return Customer
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static get(id, requestOptions = undefined) {
        if (id == undefined || id == "") {
            throw new InvalidRequestException();
        }
        
        return new Promise(async (resolve,reject) => {
            try {
                var response = await Customer.makeServiceCall("/customers/" + id, undefined, RequestMethod.GET, requestOptions);
                resolve(response);
            }catch(error) {
                reject(error);
            }  
        });
    }

};
