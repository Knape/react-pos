import React from 'react';
import ReactDOM from 'react-dom';
import reactPos from '../../src/index';
import { mount } from 'enzyme';

  before(() => {
    document.body.style.margin = '100px';
    document.body.style.padding = '100px';
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
    it('Should give correct container widht and eight for fixed values', (done) => {
      const TestPos = reactPos()(({container}) => {
        const { bottom, height, left, right, top, width } = container;
        const stringContainer = JSON.stringify({
          bottom, height, left, right, top, width,
        }, null, 2);
        return (
          <div>{ stringContainer }</div>
        );
      });

      const wrapper = mount(<TestPos />, { attachTo: div })
      setTimeout(() => {
        const container = wrapper.find('.react_pos-wrapper').children().first().props().container;
        const width = window.innerWidth - 400;
        expect(container.width).to.eql(width);
        done();
      }, 1000);
    });
  });


  // it('Component should have length of 2', () => {
  //     expect(wrapper.find('div').children().length).to.have.length(2)
  // })
