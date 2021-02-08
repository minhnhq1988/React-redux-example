import React from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css';
import AboutPage from './components/about/AboutPage';
import HomePage from './components/home/HomePage';
import CoursesPage from './components/courses/CoursesPage';
import Header from './components/common/Header';
import PageNotFound from './components/PageNotFound';
import ManageCoursePage from './components/courses/ManageCoursePage';

function App() {
  const style ={
    width: "70%",
    marginleft:"auto",
    marginright: "auto"
  }
  return (
    <div className="container-fluid" style={style}>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
