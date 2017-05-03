import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';
import axios from 'axios';
import md5 from 'md5';

const baseUrl = 'https://www.gravatar.com/avatar/';

class Gravatar extends Component {

  state = {
    image: '',
    isDefault: true,
    isFetching: false,
  };

  static propTypes = {
    email: PropTypes.string,
    defaultImage: PropTypes.string,
  };

  static defaultProps = {
    defaultImage: 'http://tarino.ir/avatar.jpg'
  };

  componentDidMount() {
    this.fetchData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.email !== nextProps.email || nextState.image !== this.state.image;
  }

  componentDidUpdate() {
    this.fetchData();
  }

  fetchData() {
    const { email, defaultImage, ...props } = this.props;
    const { isFetching } = this.state;
    const hashedMail = md5(email);
    const gravatarUrl = `${baseUrl}${hashedMail}?d=404`;
    
    if (!isFetching) {
      this.setState({ isFetching: true });
      axios.head(gravatarUrl)
        .then(response => {
          console.log('response: ', response);
          this.setState({ image: gravatarUrl, isDefault: false, isFetching: false });
        })
        .catch(error => {
          this.setState({ image: defaultImage, isDefault: true, isFetching: false });
        });
    }
  }

  render() {
    const { email, defaultImage, imageClassName, className, ...props } = this.props;
    const { image, isDefault } = this.state;

    return (
      <img 
        {...props}
        className={c(className, { [imageClassName]: !isDefault })}
        src={image}
      />
    );
  }
}

export default Gravatar;

