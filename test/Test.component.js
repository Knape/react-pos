import React from 'react';
import ReactPos from '../src';
import { shallow } from 'enzyme';

const ComponentToWrapp = () => {
  console.log('hello')
  return (
    <div style={{width: 100, height: 100}}>hello world</div>
  );
};

class ComponentToWrapp extends React.Component {
  render() {
    return (
      <div style={{width: 100, height: 100}}></div>
    );
  }
};


test('Link changes the class when hovered', () => {
  const Hoc = ReactPos()(ComponentToWrapp)
  const wrappedCounter = shallow(<Hoc />);

  console.log('span', wrappedCounter.find('span').length)
  console.log('object', wrappedCounter.find('object').length)
  console.log('div', wrappedCounter.find('div').length)

});
