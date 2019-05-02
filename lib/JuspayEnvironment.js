/**
 * Class JuspayEnvironment
 *
 * @package Juspay
 */
export class JuspayEnvironment {

  static DEVELOPMENT_BASE_URL;
  static SANDBOX_BASE_URL ;
  static PRODUCTION_BASE_URL;

  // Static variables
  /**
   *
   * @property string
   */
  static apiKey;
  /**
   *
   * @property string
   */
  static apiVersion;
  /**
   *
   * @property string
   */
  static baseUrl;
  /**
   *
   * @property int
   */
  static connectTimeout;
  /**
   *
   * @property int
   */
  static readTimeout;
  /**
   *
   * @property string
   */
  static sdkVersion;
  /**
   *
   * @property JuspayEnvironment
   */
  static thisObj;

  /**
   * Initializes the Juspay ExpressCheckout payment environment with default
   * values and returns a singleton object of JuspayEnvironment class.
   *
   * @return JuspayEnvironment
   */
  static init() {

    JuspayEnvironment.DEVELOPMENT_BASE_URL = "https://localapi.juspay.in";
    JuspayEnvironment.SANDBOX_BASE_URL = "https://sandbox.juspay.in";
    JuspayEnvironment.PRODUCTION_BASE_URL = "https://api.juspay.in";

    if (JuspayEnvironment.thisObj != undefined) {
      return JuspayEnvironment.thisObj;
    } else {
      JuspayEnvironment.apiKey = "";
      JuspayEnvironment.apiVersion = "2016-10-27";
      JuspayEnvironment.baseUrl = JuspayEnvironment.SANDBOX_BASE_URL;
      JuspayEnvironment.connectTimeout = 15;
      JuspayEnvironment.readTimeout = 30;
      JuspayEnvironment.sdkVersion = "1.0.3";
      JuspayEnvironment.thisObj = new JuspayEnvironment();
      return JuspayEnvironment.thisObj;
    }
  }

  /**
   * Initializes the Juspay ExpressCheckout payment environment
   * with given API Key.
   *
   * @param string apiKey
   *
   * @return JuspayEnvironment
   */
  withApiKey(apiKey) {
    JuspayEnvironment.apiKey = apiKey;
    return this;
  }

  /**
   * Initializes the Juspay ExpressCheckout payment environment
   * with given Base URL.
   *
   * @param string baseUrl
   *
   * @return JuspayEnvironment
   */
  withBaseUrl(baseUrl) {
    JuspayEnvironment.baseUrl = baseUrl;
    return this;
  }

  /**
   * Initializes the Juspay ExpressCheckout payment environment
   * with given connect timeout.
   *
   * @param int connectTimeout
   *
   * @return JuspayEnvironment
   */
  withConnectTimeout(connectTimeout) {
    JuspayEnvironment.connectTimeout = connectTimeout;
    return this;
  }

  /**
   * Initializes the Juspay ExpressCheckout payment environment
   * with given read timeout.
   *
   * @param int readTimeout
   *
   * @return JuspayEnvironment
   */
  withReadTimeout(readTimeout) {
    JuspayEnvironment.readTimeout = readTimeout;
    return this;
  }

  /**
  *
  * @return string
  */
  static getApiKey() {
    return JuspayEnvironment.apiKey;
  }

  /**
  *
  * @return string
  */
  static getApiVersion() {
    return JuspayEnvironment.apiVersion;
  }

  /**
   *
   * @return string
   */
  static getBaseUrl() {
    return JuspayEnvironment.baseUrl;
  }

  /**
   *
   * @return int
   */
  static getConnectTimeout() {
    return JuspayEnvironment.connectTimeout;
  }

  /**
   *
   * @return int
   */
  static getReadTimeout() {
    return JuspayEnvironment.readTimeout;
  }

  /**
  *
  * @return string
  */
  static getSdkVersion() {
    return JuspayEnvironment.sdkVersion;
  }

};
