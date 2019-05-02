import { APIConnectionException } from '../Exception/APIConnectionException';
import { APIException } from '../Exception/APIException';
import { AuthenticationException } from '../Exception/AuthenticationException';
import { InvalidRequestException } from '../Exception/InvalidRequestException';
import { RequestMethod } from '../RequestMethod';
import { RequestOptions } from '../RequestOptions';
import { JuspayEnvironment } from '../JuspayEnvironment';
const https = require('https');
const querystring = require('querystring');
const axios = require('axios');
const _ = require('lodash');
/**
 * Class JuspayEntity
 *
 * @package Juspay\Model
 */
export class JuspayEntity {

    /**
     *
     * @param string path
     * @param array|null params
     * @param string method
     * @param RequestOptions|null requestOptions
     *
     * @return array
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static makeServiceCall(path, params, method, requestOptions) {
        return new Promise((resolve,reject) =>{
            if (requestOptions == undefined) {
                requestOptions = RequestOptions.createDefault();
            }
            var options = {
                url: path,
                baseURL: JuspayEnvironment.getBaseUrl(),
                auth: {
                    username: JuspayEnvironment.getApiKey(),
                    password: ''
                },
                headers: {
                    'User-Agent': JuspayEnvironment.getSdkVersion(),
                    'version': JuspayEnvironment.getApiVersion(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: JuspayEnvironment.getConnectTimeout(),
            };
    
    
            if (method == RequestMethod.GET) {
                options.method = 'GET';
    
                if (params != undefined) {
                    options.params = params;
                }
            } else {
                options.method = 'POST';
    
                if (params == undefined) {
    
                } else {
                    options.data = querystring.stringify(params);;
                }
            }
            
            axios(options)
                .then(function (response) {
                    var responseCode = response.status;
                    var responseBody = response.data;
                    if (responseCode >= 200 && responseCode < 300) {
                        resolve (responseBody);
                    } else {
                        var status = undefined;
                        var errorCode = undefined;
                        var errorMessage = undefined;
    
                        if (responseBody != undefined) {
                            if ("status" in responseBody != undefined) {
                                status = responseBody.status;
                            }
    
                            if ("error_code" in responseBody != undefined) {
                                errorCode = responseBody.error_code;
                            }
    
                            if ("error_message" in responseBody != undefined) {
                                errorMessage = responseBody.error_message;
                            }
                        }
    
                        switch (responseCode) {
                            case 400:
                            case 404:
                                throw new InvalidRequestException(responseCode, status, errorCode, errorMessage);
    
                            case 401:
                                throw new AuthenticationException(responseCode, status, errorCode, errorMessage);
    
                            default:
                                throw new APIException(responseCode, "internal_error", "internal_error", "Something went wrong.");
                        }
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    reject(error);
                });
        })

    }

    /**
     *
     * @param string input
     * @param string|null separator
     *
     * @return string
     */
    camelize(input, separator = "_") {
        
        return _.camelCase(input);
    }

    /**
     *
     * @param array params
     * @param array response
     *
     * @return array
     */
    static addInputParamsToResponse(params, response) {
        for (var key of Object.values(Object.keys(params))) {
            response[key] = params[key];
        }

        return response;
    }

};

