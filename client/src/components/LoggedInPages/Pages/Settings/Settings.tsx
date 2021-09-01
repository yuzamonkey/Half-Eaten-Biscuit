import React from 'react'
import { Route, Switch } from 'react-router-dom';
import SettingsNavigation from './Navigation/SettingsNavigation';
import CredentialSettings from './Pages/CredentialSettings';
import GroupsSettings from './Pages/GroupsSettings';
import ProfileSettings from './Pages/ProfileSettings';
import './Settings.css'

const Settings = () => {

  return (
    <div className="settings-page">
      <SettingsNavigation />
      <div className="settings-pages">
        <Switch>
          <Route path="/settings/credentials/" component={CredentialSettings} />
          <Route path="/settings/profile/" component={ProfileSettings} />
          <Route path="/settings/groups/" component={GroupsSettings} />
        </Switch>
      </div>
    </div>
  )
}

export default Settings;