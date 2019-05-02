import { JuspayEntityList } from './JuspayEntityList';
/**
 * Class CustomerList
 *
 * @package Juspay\Model
 */
export class CustomerList extends JuspayEntityList {
    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params) {
        super(params);

        for (var i = 0; i < params.list.length; i++) {
            this.list[i] = new Customer(params.list[i]);
        }
    }

};

