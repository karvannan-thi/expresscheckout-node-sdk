/**
 * Class JuspayEntityList
 *
 * @property array list
 * @property int count
 * @property int offset
 * @property int total
 *
 * @package Juspay\Model
 */
export class JuspayEntityList {
  /**
   * Constructor
   *
   * @param array params
   */
  constructor(params) {
    this.count = params.count;
    this.offset = params.offset;
    this.total = params.total;
    this.list = Array();
  }

};
