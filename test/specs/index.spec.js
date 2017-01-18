/* eslint no-unused-expressions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactPos from '../../src/';
import spies from 'chai-spies';
import Test from '../Test.component';

chai.use(spies);
const expect = chai.expect;

before(() => {
  document.body.style.margin = 0;
  document.body.style.padding = 0;
});

let div;

beforeEach(() => {
  div = document.createElement('div');
  document.body.appendChild(div);
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(div);
  div.parentNode.removeChild(div);
  window.scrollTo(0, 0);
});

describe('ReactPos', () => {
  describe('Basic setup', () => {

  });
});
