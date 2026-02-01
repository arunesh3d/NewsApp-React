import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from './components/News';
import NewsScroll from './components/NewsScroll';

export class App extends Component {
  pageSize = 10;

  //Access env variable from .env.local present in root folder
  apiKey = process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={
            <News apiKey={this.apiKey} key="general" pageSize={this.pageSize} country='us' category='general' />
          } />
          <Route exact path="/business" element={
            <News apiKey={this.apiKey} key="business" pageSize={this.pageSize} country='us' category='business' />
          } />
          <Route exact path="/entertainment" element={
            <News apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country='us' category='entertainment' />
          } />
          <Route exact path="/health" element={
            <News apiKey={this.apiKey} key="health" pageSize={this.pageSize} country='us' category='health' />
          } />
          <Route exact path="/science" element={
            <News apiKey={this.apiKey} key="science" pageSize={this.pageSize} country='us' category='science' />
          } />
          <Route exact path="/sports" element={
            <News apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country='us' category='sports' />
          } />
          <Route exact path="/technology" element={
            <News apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country='us' category='technology' />
          } />
          <Route exact path='/infinite' element={
            <NewsScroll apiKey={this.apiKey} pageSize={this.pageSize} country='us' category='general' />
          } />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;