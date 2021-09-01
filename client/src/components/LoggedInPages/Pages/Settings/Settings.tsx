import React from 'react'
import { Route, Switch } from 'react-router-dom';
import SettingsNavigation from './Navigation/SettingsNavigation';
import CredentialSettings from './Pages/CredentialSettings';
import DeleteUser from './Pages/DeleteUser';
import GroupsSettings from './Pages/GroupsSettings';
import ProfileSettings from './Pages/ProfileSettings';
import SettingsNotSelected from './Pages/SelectSettings';
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
          <Route path="/settings/deleteuser/" component={DeleteUser} />
          <Route path="/settings/" component={SettingsNotSelected} />
        </Switch>
      </div>
    </div>
  )
}

export default Settings;