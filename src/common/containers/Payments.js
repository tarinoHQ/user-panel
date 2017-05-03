import React, { Component, PropTypes } from 'react';
import { toPersian } from '../utils/numberUtils';
import c from 'rc-classnames';

import { TableWithSorting } from '../components/Table';
import DateTime from '../components/DateTime';

class Payments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ...props } = this.props;

    return (
      <div>
        <TableWithSorting
          columns={[
            {
              key: 'code',
              title: 'شناسه',
              template: row => toPersian(row.code),
              sortBy: row => row.code
            },
            {
              key: 'type',
              title: 'نوع',
              template: row => row.type === 'add' ? 'افزودن' : 'خرید',
              sortBy: row => row.type
            },
            {
              key: 'amount',
              title: 'مبلغ (تومان)',
              template: row => toPersian(row.amount, true) + ' تومان',
              sortBy: row => row.amount
            },
            {
              key: 'date',
              title: 'تاریخ',
              template: row => (
                <DateTime time={parseInt(row.date) * 1000} />
              ),
              sortBy: row => row.date * -1
            },
            {
              key: 'for',
              title: 'بابت',
              template: row => row.for,
              sortBy: row => row.for
            },
          ]}
          data={[
            {
              code: '23578',
              type: 'add',
              amount: 4100,
              date: (Date.now() - 10000000000) / 1000,
              for: 'افزایش اعتبار کیف‌پول',
            },
            {
              code: '23578',
              type: 'buy',
              amount: 89000,
              date: (Date.now() - 90002000) / 1000,
              for: 'تمدید دامنه me و ir',
            },
          ]}
          rowsProps={row => {
            return {
              className: c({
                ['payments__row--' + row.type]: row.type
              })
            };
          }}
          defaultSortBy="age"
          defualtSortDirection="asc"
        />
      </div>
    );
  }
}

export default Payments;
