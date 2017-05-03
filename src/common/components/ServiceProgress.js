import { taskNamesByType, taskTypes } from '../constants/Tasks';
import React, { Component, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import getImage from '../data/images';
import filter from 'lodash/filter';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import { Motion, spring, presets } from 'react-motion';
import RetinaImage from './RetinaImage';
import ProgressBar from './ProgressBar';

@onClickOutside
class ServiceProgress extends Component {
  constructor(p) {
    super(p);
    this._mouseEntered  = this._mouseEntered.bind(this);
    this._mouseLeft     = this._mouseLeft.bind(this);
    this._clicked       = this._clicked.bind(this);
  }

  static propTypes = {
    // currentTask: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf([
          taskTypes.DOMAIN, 
          taskTypes.HOST, 
          taskTypes.CMS,
          taskTypes.TEMPLATE
        ]),
        status: PropTypes.oneOf(['done', 'inprogress', 'failed']),
      })
    ),
    // progress: PropTypes.number.isRequired,
  };

  state = {
    isBubbleOpen: false,
    clicked: false,
  };

  _mouseEntered() {
    this.setState({
      isBubbleOpen: true
    });
  }

  _mouseLeft() {
    this.setState({
      isBubbleOpen: false
    });
  }

  _clicked() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  handleClickOutside() {
    this.setState({ 
      clicked: false 
    });
  }

  getTaskName(type, defaultValue = '--') {
    return taskNamesByType[type] || defaultValue;
  }

  getCurrentTask(tasks) {
    const ips = filter(tasks, t => t.status === 'inprogress');
    return (ips.length > 0 && this.getTaskName(ips[0].type, null)) || 'ساخت سرویس';
  }

  getProgress(tasks) {
    const ips = filter(tasks, t => t.status !== 'inprogress');
    return ips.length * 100 / tasks.length;
  }

  getBubbleStyle() {
    if (this.state.clicked || this.state.isBubbleOpen) {
      return {
        opacity: spring(1, presets.stiff),
        scale: spring(1, presets.stiff),
      };
    } else {
      return {
        opacity: spring(0, presets.stiff),
        scale: spring(0, presets.stiff),
      };
    }
  }

  renderTaskIcon(status) {
    switch(status) {
      case 'done':
        return <span className="icon-ok-1" />;

      case 'inprogress':
        return <span className="service-progress__task__pending" />;

      case 'failed':
        return <span className="icon-cancel-1" />;

      default:
        return <span />;
    }
  }

  renderBuble() {
    const { tasks } = this.props;

    return (
      <Motion
        style={this.getBubbleStyle()}>
        {v =>
          <div
            className="service-progress__bubble"
            style={{
              opacity: v.opacity,
              transform: `scale(${v.scale})`,
              display: v.opacity == 0 ? 'none' : 'block'
            }}>

            {map(tasks, t => {
              return (
                <div 
                  key={v4()}
                  className={c('service-progress__task', `service-progress__task--${t.status}`)}>
                  <span className="service-progress__task__icon">
                    {this.renderTaskIcon(t.status)}
                  </span>
                  {this.getTaskName(t.type)}
                </div>
              );
            })}

          </div>
        }
      </Motion>
    );
  }

  render() {
    const { tasks, progress } = this.props;
    const { isBubbleOpen } = this.state;

    return (
      <div className="service-progress">

        <ProgressBar
          textAlign="right"
          size="normal"
          progress={this.getProgress(tasks)}
          label={p => 'درحال ' + this.getCurrentTask(tasks)}
          theme="info"
          onMouseEnter={this._mouseEntered}
          onMouseLeave={this._mouseLeft}
          onClick={this._clicked}
        />

        {this.renderBuble()}

      </div>
    );
  }
}

export default ServiceProgress;
