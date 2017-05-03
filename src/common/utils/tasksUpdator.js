import map from 'lodash/map';
import filter from 'lodash/filter';

const PROCESSING = "processing";
const INTERVAL = 25000;

export default { 
  updators: [],

  mapOrdersToUpdator(orderList, callback) {
    each(orderList, (ol) => {
      if(ol.status === PROCESSING) {
        typeof callback === 'function' && callback(ol);
      }
    });
  },

  setUpdator(callback) {
    const interval = setInterval(() => {
      typeof callback === 'function' && callback(interval);
    }, INTERVAL);
    this.updators.push(interval);
  },

  clearAllUpdators() {
    this.updators = filter(updators, (u) => {
      clearInterval(u);
      return false;
    });
    this.updators = [];
  },
};
