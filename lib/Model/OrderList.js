import { JuspayEntityList } from './JuspayEntityList';

/**
 * Class OrderList
 *
 * @package Juspay\Model
 */
export class OrderList extends JuspayEntityList {

    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params) {
        super(params);

        for (var i = 0; i < params.list.length; i++) {
            this.list[i] = new Order(params.list[i]);
        }
    }

};

