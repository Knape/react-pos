import React, { Component } from 'react';
import reactPos from '../../src/';

const Home = reactPos()(({container}) => {
    const { bottom, height, left, right, top, width } = container;
    const stringContainer = JSON.stringify({
      bottom, height, left, right, top, width,
    }, null, 2);
    return (
      <div>{ stringContainer }</div>
    );
});

export default Home;
