import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './Jobmarket.css'
import Queries from './Pages/Queries';
import Navbar from './Navbar/Navbar';
import SendQuery from './Pages/SendQuery';
import MyQueries from './Pages/MyQueries';

const Jobmarket = () => {
  return (
    <>
      <Router>
        <div className="job-page">
          <Navbar />
          <div className="job-pages">
            <Switch>
              <Route path="/jobmarket/queries" component={Queries} />
              <Route path="/jobmarket/sendquery" component={SendQuery} />
              <Route path="/jobmarket/myqueries" component={MyQueries} />
              <Route path="/jobmarket" component={Queries} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  )
}


export default Jobmarket