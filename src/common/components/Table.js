import React, { Component, PropTypes } from 'react';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';
import filter from 'lodash/filter';
import each from 'lodash/each';
import has from 'lodash/has';
import Sort from '../utils/sort';

class Td extends Component {
  render() {
    let { className, children, ...props } = this.props;

    return (
      <td
        {...props}
        className={c('table__cell', className)}
        >
        {children}
      </td>
    );
  }
}

class Tr extends Component {
  render() {
    let { className, children, ...props } = this.props;

    return (
      <tr
        {...props}
        className={c('', className)}
        >
        {children}
      </tr>
    );
  }
}

class Thead extends Component {
  render() {
    let { className, children, ...props } = this.props;

    return (
      <thead
        {...props}
        className={c('table__head', className)}
        >
        {children}
      </thead>
    );
  }
}

class Tbody extends Component {
  render() {
    let { className, children, ...props } = this.props;

    return (
      <tbody
        {...props}
        className={c('table__body', className)}
        >
        {children}
      </tbody>
    );
  }
}

class Table extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    // { name: 'mohammad', age: 18 }
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    // { key: 'name', label: 'Name:', sort: () => {}, filter: () => {}}
    rowsProps: PropTypes.func,
    filter: PropTypes.func,
    sortBy: PropTypes.string,
    sortDirection: PropTypes.oneOf(['asc', 'desc']),
    sortFunction: PropTypes.func,
    onColumnHeadClick: PropTypes.func,
  }

  static defaultProps = {
    data: [],
    rowsProps: (row) => ({}),
    filter: () => true,
    sortDirection: 'asc',
    sortFunction: Sort.numeric,
    onColumnHeadClick: () => {}
  }

  getColumnSortBy(columnKey) {
    let { columns } = this.props;
    let columnSortBy;
    each(columns, c => {
      if (c.key === columnKey) {
        columnSortBy = c.sortBy;
      }
    });

    return columnSortBy;
  }

  renderHead() {
    let { columns, sortBy, sortDirection, onColumnHeadClick } = this.props;

    return (
      <Thead>
        <Tr className="table__head__row">
          {map(columns, col => {
            let isSorted = has(col, 'sortBy') && typeof sortBy !== 'undefined' && sortBy === col.key;

            return (
              <Td
                key={v4()}
                onClick={() => onColumnHeadClick(col)}
                className={c('table__head__cell', {
                  'table__head__cell--sorted': isSorted,
                  'table__head__cell--asc': isSorted && sortDirection === 'asc',
                  'table__head__cell--desc': isSorted && sortDirection === 'desc',
                })}
              >
                {col.title}
              </Td>
            );
          })}
        </Tr>
      </Thead>
    );
  }

  renderBody() {
    let { columns, data, rowsProps, filter, sortBy, sortDirection, sortFunction, onColumnHeadClick } = this.props;

    let sortedData = data;
    if (typeof sortBy !== 'undefined') {
      const columnSortBy = this.getColumnSortBy(sortBy);

      if (typeof columnSortBy !== 'undefined') {
        sortedData = data.slice().sort((a, b) => {
          return sortFunction(columnSortBy(a), columnSortBy(b));
        });

        if(sortDirection === 'desc') {
          sortedData.reverse();
        }
      }
    }

    const rows = map(sortedData, row => {

      if (!filter(row)) return null;

      const { className, ...rowProps } = rowsProps(row);

      return (
        <Tr key={v4()} className={c('table__row', className)} {...rowProps}>
          {map(columns, c => {
            return (
              <Td
                key={v4()}
                {...(typeof c.props === 'function' ? c.props(row) : c.props)}>
                {c.template(row)}
              </Td>
            );
          })}
        </Tr>
      );
    });

    return <Tbody>{rows}</Tbody>;
  }

  render() {
    let { columns, data, rowsProps, filter, sortBy, sortDirection, sortFunction, onColumnHeadClick, className, ...props } = this.props;

    return (
      <table
        className={c('table', className)}
        cellSpacing={0}
        cellPadding={0}
        {...props}>
        {this.renderHead()}
        {this.renderBody()}
      </table>
    );
  }
}

export default Table;

export class TableWithSorting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSort: {
        columnKey: props.defaultSortBy,
        direction: props.defualtSortDirection || 'asc'
      }
    };

    this._columnHeadClicked = this._columnHeadClicked.bind(this);
  }

  _columnHeadClicked({ key, sortBy }) {
    if (typeof sortBy !== 'undefined') {
      const direction = this.state.currentSort.direction === 'asc' ? 'desc' : 'asc';
      this.setState({ currentSort: { columnKey: key, direction } });
    }
  }

  render() {
    const { defaultSortBy, defaultSortDirection, ...props } = this.props;
    const { currentSort } = this.state;

    return (
      <Table
        {...props}
        sortBy={currentSort.columnKey}
        sortDirection={currentSort.direction}
        onColumnHeadClick={this._columnHeadClicked}
      />
    );
  }
}
