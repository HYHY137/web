import React from 'react';
import '../../App.scss';
import Header from "./Header/Header";
import Body from './Body/Body';
import {Footer} from './Footer/Footer';

export const Home = function(){
  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
