import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './Jobmarket.css'
import Jobqueries from './Pages/Jobqueries';
import JobmarketNavigation from './JobmarketNavigation/JobmarketNavigation';
import SendQuery from './Pages/SendQuery';
import MyQueries from './Pages/MyQueries';
import FindPlayers from './Pages/FindPlayers';

const Jobmarket = () => {
  return (
    <>
      <Router>
        <div className="job-page">
          <JobmarketNavigation />
          <div className="job-pages">
            <Switch>
              <Route path="/jobmarket/findplayers/" component={FindPlayers} />
              <Route path="/jobmarket/queries/" component={Jobqueries} />
              <Route path="/jobmarket/sendquery/" component={SendQuery} />
              <Route path="/jobmarket/myqueries/" component={MyQueries} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  )
}


export default Jobmarket