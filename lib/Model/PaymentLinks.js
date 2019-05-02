import { JuspayEntity } from './JuspayEntity';

/**
 * Class PaymentLinks
 *
 * @property string web
 * @property string mobile
 * @property string iframe
 *
 * @package Juspay\Model
 */
export class PaymentLinks extends JuspayEntity {

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

};

