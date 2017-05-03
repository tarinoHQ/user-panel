import React, { Component, PropTypes } from 'react';
import { toPersian } from '../utils/numberUtils';
import { pricePeriods } from '../constants/Plans';
import getImage from '../data/images';
import c from 'rc-classnames';

const periods = {
  [pricePeriods.YEARLY]: 'سالانه',
  [pricePeriods.MONTHLY]: 'ماهانه'
};

class HostPlan extends Component {
  constructor(p) {
    super(p);

    this._btnClicked = this._btnClicked.bind(this);
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    btnText: PropTypes.string.isRequired,
    pricePeriod: PropTypes.oneOf([pricePeriods.YEARLY, pricePeriods.MONTHLY]).isRequired,
    price: PropTypes.number.isRequired,
    offerPrice: PropTypes.number,
    spaceInMb: PropTypes.number.isRequired,
    ramInGb: PropTypes.number,
    cpuCores: PropTypes.number,
    monthlyVisits: PropTypes.number,
    trafficInMb: PropTypes.number.isRequired,
    backupFrequency: PropTypes.string,
    onChoose: PropTypes.func,
    mostPopular: PropTypes.bool,
    isPro: PropTypes.bool,
    selected: PropTypes.bool,
    inline: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    onChoose: () => {},
    btnText: 'انتخاب',
    mostPopular: false,
    isPro: false,
    selected: false,
    inline: false,
    disabled: false,
  };

  _btnClicked() {
    if(!this.props.disabled) {
      this.props.onChoose(!this.props.selected);
    }
  }

  render() {
    const { title, image, pricePeriod, btnText, price, offerPrice, spaceInMb, monthlyVisits, trafficInMb, backupFrequency, ramInGb, cpuCores, onChoose, mostPopular, isPro, selected, inline, disabled, children, className, ...props } = this.props;
    const priceInK = price / 1000;
    const offerPriceInK = (offerPrice || 0) / 1000;

    const formatSpaceQuantity = (spaceInMb) => {
      if (spaceInMb <= 1000) return toPersian(spaceInMb) + " مگ";
      else return toPersian(Math.round(spaceInMb / 1000)) + " گیگ";
    };

    return (
      <div 
        className={c('host-plan', { 
          'host-plan--off': !!offerPrice, 
          'host-plan--most-popular': mostPopular, 
          'host-plan--selected': selected, 
          'host-plan--inline': inline,
          'host-plan--pro': isPro,
          'host-plan--disabled': disabled,
        }, className)}>

        <div className="host-plan__header">
          <div className="host-plan__icon" style={{ backgroundImage: `url(${image})` }}></div>
          <div className="host-plan__header-top">
            {mostPopular && <div className="host-plan__most-popular">محبوب‌</div>}
            <div className="host-plan__title">{title}</div>
          </div>

          <div className="host-plan__price">
            {price === 0 ? 
              <div className="host-plan__price__amount">
                <div className="host-plan__price__current">رایگان</div>
              </div>  
              :
              <span>
                <div className="host-plan__price__frequency">{periods[pricePeriod]}</div>
                <div className="host-plan__price__amount">
                  <div className="host-plan__price__pervious">{toPersian(priceInK)} هزارتومان</div>
                  <div className="host-plan__price__current">
                    <span className="host-plan__price__current__num">{toPersian(offerPriceInK || priceInK)}</span>
                    هزارتومان
                  </div>
                </div>
                <div className="host-plan__price__discount">{toPersian(priceInK - offerPriceInK )} هزارتومان تخفیف!</div>
              </span>
            }
          </div>
        </div>
        <div className="host-plan__specs">
          <div className="host-plan__spec"><strong>{formatSpaceQuantity(spaceInMb)}</strong> فضای ذخیره‌سازی</div>
          <div className="host-plan__spec"><strong>{formatSpaceQuantity(trafficInMb)}</strong> پهنای باند</div>
          {monthlyVisits && <div className="host-plan__spec"><strong>{toPersian(monthlyVisits, true)}</strong> بازدید ماهانه</div>}
          {ramInGb && <div className="host-plan__spec"><strong>{toPersian(ramInGb)}</strong> حافظه رم</div>}
          {cpuCores && <div className="host-plan__spec"><strong>{toPersian(cpuCores)}</strong> هسته CPU</div>}
          {backupFrequency && <div className="host-plan__spec">بک‌آپ گیری <strong>{backupFrequency}</strong></div>}
        </div>
        <div className="host-plan__actions">
          <button className="host-plan__actions__choose" disabled={disabled} onClick={this._btnClicked}>
            {btnText}
          </button>
        </div>
      </div>
    );
  }
}

export default HostPlan;
