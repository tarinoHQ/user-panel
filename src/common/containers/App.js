import React, { Component, PropTypes } from 'react';
// import NProgress from 'nprogress';

import TopBackground from '../components/TopBackground';
import MainWrapper, { MainWrapperBox } from '../components/MainWrapper';
import Header from '../components/Header';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    // Start Loading
  }

  componentDidUpdate() {
    // End Loading
  }

  render() {
    return (
      <div>
        <TopBackground />
        <MainWrapper>
          <Header />
          <MainWrapperBox>
            {this.props.children}
          </MainWrapperBox>
        </MainWrapper>
      </div>
    );
  }
}

export default App;
