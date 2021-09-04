import React from 'react';
import { Switch, Route } from "react-router-dom";
import './Jobmarket.css'
import JobAds from './Pages/JobAds';
import JobmarketNavigation from './JobmarketNavigation/JobmarketNavigation';
import SendJobAd from './Pages/SendJobAd';
import MyJobAds from './Pages/MyJobAds';
import FindArtists from './Pages/FindArtists';
import JobInfo from './Pages/JobInfo';

const Jobmarket = () => {
  return (
    <div className="job-page">
      <JobmarketNavigation />
      <div className="job-pages">
        <Switch>
          <Route path="/jobmarket/findartists/" component={FindArtists} />
          <Route path="/jobmarket/jobads/:id" component={JobInfo} />
          <Route path="/jobmarket/jobads/" component={JobAds} />
          <Route path="/jobmarket/sendjobad/" component={SendJobAd} />
          <Route path="/jobmarket/myads/" component={MyJobAds} />
        </Switch>
      </div>
    </div>

  )
}


export default Jobmarket