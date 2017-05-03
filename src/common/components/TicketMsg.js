import React, { Component, PropTypes } from 'react';
import moment from 'moment-jalaali';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import ReactMarkdown from 'react-markdown';
import Row from '../components/Row';

class TicketMsg extends Component {

  static propTypes = {
    author: PropTypes.oneOf(['user', 'tarino']).isRequired,
    name: PropTypes.string,
    role: PropTypes.string,
    avatar: PropTypes.string,
    createdAt: PropTypes.number.isRequired,
    attachments: PropTypes.array,
    text: PropTypes.string.isRequired,
  }

  static defaultProps = {
    attachments: [],
  }

  renderAttachments() {
    const { attachments } = this.props;

    if (attachments.length === 0) return null;

    return (
      <div className="ticket-msg__attachments">
        <span className="ticket-msg__attachments__title">فایل های پیوست شده</span>
        <ul>
          {map(attachments, a => {
            const filename = a.split('/').slice(-1)[0];
            return (
              <li key={v4()} className="ticket-msg__attachments__item">
                <a href={a}>{filename}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    const { author, name, role, avatar, createdAt, attachments, text, ...props } = this.props;

    return (
      <div {...props} style={{ marginTop: 20, textAlign: author === 'user' ? 'right' : 'left' }}>
        <div
          className={c('ticket-msg', `ticket-msg--${author}`)}
          {...props}>

          <article className="ticket-msg__bubble">

            <header className="ticket-msg__header">
              <div className="ticket-msg__profile">
                <div className="ticket-msg__profile__pic"></div>
                <div className="ticket-msg__profile__info">
                  <div className="ticket-msg__profile__name">{name}</div>
                  <div className="ticket-msg__profile__role">{role}</div>
                </div>
              </div>

              <div className="ticket-msg__date">
                <time
                  className="hint--top"
                  aria-label={moment(createdAt * 1000).locale('fa').format('h:m:s jYYYY/jM/jD')}
                  dateTime="2001-05-15T19:00">
                    {moment(createdAt * 1000).locale('fa').fromNow()}
                </time>
              </div>
            </header>

            <div className="ticket-msg__content">
              <ReactMarkdown
                source={text}
                escapeHtml={true}
              />
              {this.renderAttachments()}
            </div>

          </article>

          <footer className="ticket-msg__footer">
            {author === 'tarino' &&
              <p>
                پاسخ موردنظرتان را دریافت نکردید؟
                &nbsp;<a href="#">حتما با ما تماس بگیرید.</a>
              </p>
            }
          </footer>
        </div>
      </div>
    );
  }
}

export default TicketMsg;
