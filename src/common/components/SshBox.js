/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';


const BlackBox = styled.div`
  width: 100%;
  padding: 12px;
  direction: ltr;
  text-align: left;
  font-family: monospace;
  background: #557;
  color: #f3f3f9;
`;


const SshBox = (props) => (
  <BlackBox selected={true}>
    content :)
  </BlackBox>
);

export default SshBox;
