import React from 'react';
import styled, { keyframes } from 'styled-components';
import { width, border, position, space } from 'styled-system';

const rotate = keyframes`
0% {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
100% {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
}
`;

const Ring = styled.span`
  display: inline-block;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 0.5em solid rgba(83, 67, 181, 0.2);
  border-right: 0.5em solid rgba(83, 67, 181, 0.2);
  border-bottom: 0.5em solid rgba(83, 67, 181, 0.2);
  border-left: 0.5em solid #5343b5;
  transform: translateZ(0);
  animation: ${rotate} 1.1s infinite linear;

  &::after {
    border-radius: 50%;
    width: 48px;
    height: 48px;
  }

  ${space};
  ${position};
  ${border};
  ${width};
  height: ${({ width }) => (width ? width + 'px' : '')};
`;

const Loader = props => <Ring {...props}>Loading...</Ring>;

export default Loader;
