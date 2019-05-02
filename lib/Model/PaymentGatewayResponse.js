import { JuspayEntity } from './JuspayEntity';

/**
 * Class PaymentGatewayResponse
 *
 * @property string rrn
 * @property string epgTxnId
 * @property string authIdCode
 * @property string txnId
 * @property string respCode
 * @property string respMessage
 * @property DateTime created
 *
 * @package Juspay\Model
 */
export class PaymentGatewayResponse extends JuspayEntity {

    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params) {
        super();
        for (var key of Object.values(Object.keys(params))) {
            var newKey = this.camelize(key);

            if (newKey == "created") {
                this[newKey] = new Date(params[key]);
            } else {
                this[newKey] = params[key];
            }
        }
    }

};

