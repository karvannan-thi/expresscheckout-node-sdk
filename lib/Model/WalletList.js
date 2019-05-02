import { JuspayEntityList } from './JuspayEntityList';

/**
 * Class WalletList
 *
 * @package Juspay\Model
 */
export class WalletList extends JuspayEntityList {

    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params) {
        super(params);

        for (var i = 0; i < params.list.length; i++) {
            this.list[i] = new Wallet(params.list[i]);
        }
    }

};

