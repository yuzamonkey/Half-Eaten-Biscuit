import React, { useState } from 'react';
import { useQuery } from '@apollo/client'

import './SendJobAdForm.css'

import { ALL_GROUP_CATEGORIES, ALL_USER_CATEGORIES } from '../../../../../../graphql/queries';
import JobAdInfoForm from './Views/JobAdInfoForm';
import WantedCategoriesSelection from './Views/WantedCategoriesSelection'
import Summary from './Views/Summary'
import { FormNavigationButton, Loading } from '../../../../../UtilityComponents/UtilityComponents';

interface Category {
  id: string,
  name: string
}

const SendJobAdForm = () => {

  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('Yes')
  const [startSchedule, setStartSchedule] = useState('')
  const [endSchedule, setEndSchedule] = useState('')

  const [userCategories, setUserCategories] = useState<Category[]>([])
  const [groupCategories, setGroupCategories] = useState<Category[]>([])
  const [wantedCategories, setWantedCategories] = useState<Category[]>([])

  const userCategoriesResult = useQuery(ALL_USER_CATEGORIES, {
    onCompleted: () => setUserCategories(userCategoriesResult.data.allUserCategories)
  })
  const groupCategoriesResult = useQuery(ALL_GROUP_CATEGORIES, {
    onCompleted: () => setGroupCategories(groupCategoriesResult.data.allGroupCategories)
  })

  const views = [
    <WantedCategoriesSelection
      userCategories={userCategories}
      groupCategories={groupCategories}
      wantedCategories={wantedCategories}
      setWantedCategories={setWantedCategories}
    />,
    <JobAdInfoForm
      content={content}
      setContent={setContent}
      location={location}
      setLocation={setLocation}
      salary={salary}
      setSalary={setSalary}
      startSchedule={startSchedule}
      setStartSchedule={setStartSchedule}
      endSchedule={endSchedule}
      setEndSchedule={setEndSchedule}
    />,
    <Summary
      wantedCategories={wantedCategories}
      content={content}
      location={location}
      salary={salary}
      startSchedule={startSchedule}
      endSchedule={endSchedule}
    />
  ]

  const [currentView, setCurrentView] = useState(0)

  if (userCategoriesResult.loading || groupCategoriesResult.loading) {
    return <Loading />
  }

  const handlePrevPress = () => {
    currentView <= (views.length - 1)
      && currentView > 0
      && setCurrentView(currentView - 1)
  }

  const handleNextPress = () => {
    currentView < (views.length - 1)
      && currentView >= 0
      && setCurrentView(currentView + 1)
  }


  return (
    <>
      <div className="send-job-ad-form-current-view-container">
        {views[currentView]}
      </div>
      <div className="send-job-ad-form-switch-view-buttons-container">
        <div>
          {currentView > 0
            &&
            <FormNavigationButton previous={true} handleClick={handlePrevPress} />
          }
        </div>
        <div>
        {currentView < (views.length - 1)
          &&
            <FormNavigationButton previous={false} handleClick={handleNextPress} />
          }
          </div>
      </div>
    </>
  )
};

export default SendJobAdForm;