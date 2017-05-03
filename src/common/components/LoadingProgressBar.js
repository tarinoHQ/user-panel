import React, { Component, PropTypes } from 'react';

import ProgressBar from '../components/ProgressBar';

class LoadingProgressBar extends Component {

  state = {
    progress: 5,
    intervalId: false
  }

  initLoading() {
    const intervalId = window.setInterval(this.loadingTick, 60);
    this.setState({ intervalId });
  }

  stopLoading() {
    window.clearInterval(this.state.intervalId);
    this.setState({ intervalId: false });
  }

  loadingTick() {
    console.log('n1');
    // if (this.state.progress < 95) {
    //   this.addByOne();
    // } else {
    //   this.stopLoading();
    // }
  }

  setCompleted() {
    this.setState({ progress: 100 });
  }

  addByOne() {
    this.setState({ progress: this.state.progress + 1 });
  }

  componentDidMount() {
    // this.initLoading();
    console.log('Mounted!');
  }

  componentWillUnmount() {
    // this.stopLoading();
    console.log('Unmounted!');
  }

  render() {
    const { done, ...props } = this.props;

    return (
      <ProgressBar
        {...props}
        label={false}
        size="slim"
        progress={done ? 100 : this.state.progress} />
    );
  }
}

export default LoadingProgressBar;
