import React, { Component, PropTypes } from 'react';
import without from 'lodash/without';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import Link from '../components/Link';


class DnsForm extends Component {
  constructor(p) {
    super(p);
  }

  static propTypes = {
    dnsList: PropTypes.array.isRequired,
    useTarinoDns: PropTypes.bool.isRequired,
    onUseTarinoDnsChange: PropTypes.func.isRequired,
    onAddDnsClicked: PropTypes.func.isRequired,
    onDnsRecordChanged: PropTypes.func.isRequired,
  }

  static defaultProps = {
    dnsList: ['', '', null, null],
    useTarinoDns: false,
    onUseTarinoDnsChange: () => {},
    onAddDnsClicked: () => {},
    onDnsRecordChanged: () => {},
  }

  dnsRecordsCount() {
    const { dnsList } = this.props;
    return without(dnsList, null).length;
  }

  render() {
    const { dnsList, useTarinoDns, onUseTarinoDnsChange, onAddDnsClicked, onDnsRecordChanged, ...props } = this.props;

    return (
      <div className="dns-form">
        <Checkbox
          checked={useTarinoDns}
          onChange={onUseTarinoDnsChange}>
          اتصال دامنه به سرورهای تارینو
          &nbsp;<Link href="#">منظور از این جمله چیست؟</Link>
        </Checkbox>

        <p className="dns-form__hint">
          اگر می‌خواهید دامنه را با سرویس های تارینو استفاده کنید این قسمت را به حال خود رها کنید!
        </p>

        <span className="dns-form__label">نام‌سرور های دامنه (DNS)</span>
        {
          map(dnsList, (dns, i) => {
            if (dns === null) return null;
            return (
              <Input
                key={'dnsrecord' + i}
                smallFullWidth={true}
                disabled={useTarinoDns}
                placeholder={`ns${i + 1}.example.com`}
                value={dns.trim()}
                onChange={onDnsRecordChanged.bind(this, i)}
              />
            );
          })
        }

        {this.dnsRecordsCount() < 4 && !useTarinoDns &&
          <div
            className={c('dns-form__add-input', {
              'dns-form__add-input--disabled': useTarinoDns
            })}
            onClick={onAddDnsClicked}>
            +
          </div>
        }
      </div>
    );
  }
}

export default DnsForm;
