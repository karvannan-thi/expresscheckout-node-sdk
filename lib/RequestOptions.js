import { JuspayEnvironment } from './JuspayEnvironment';
export class RequestOptions {

  /**
   * Constructor
   */
  constructor() {
    this.apiKey = JuspayEnvironment.getApiKey();
  }

  /**
  * Returns a RequestOptions object with default values
  * from JuspayEnvironment object.
  *
  * @return RequestOptions
  */
  static createDefault() {
    JuspayEnvironment.init();
    return new RequestOptions();
  }

  /**
   * Initializes the RequestOptions object with given API Key.
   *
   * @param string apiKey
   *
   * @return RequestOptions
   */
  withApiKey(apiKey) {
    this.apiKey = apiKey;
    return this;
  }

  /**
   *
   * @return string
   */
  getApiKey() {
    return this.apiKey;
  }

};
