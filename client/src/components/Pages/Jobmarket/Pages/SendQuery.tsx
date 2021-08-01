import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_JOBQUERY } from '../../../../graphql/mutations';
import { UserContext } from '../../../UtilityComponents/UserContext';
import { ALL_GROUP_SKILL_CATEGORIES, ALL_SKILL_CATEGORIES } from '../../../../graphql/queries';
import { Loading } from '../../../UtilityComponents/UtilityComponents';

interface Category {
  id: string,
  name: string
}

const SendQuery = () => {
  const userContext = useContext(UserContext)

  const [createQuery] = useMutation(CREATE_JOBQUERY, {
    onError: (error) => {
      console.log("Error at create query mutation: \n", error)
    }
  })

  const [wantedCategories, setWantedCategories] = useState<Category[]>([])
  const [content, setContent] = useState('Details about everything, detailed schedule, locations and addresses, nature of the project...')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [startSchedule, setStartSchedule] = useState('YYYY-MM-DD')
  const [endSchedule, setEndSchedule] = useState('YYYY-MM-DD')

  const [allCategories, setAllCategories] = useState<Category[]>([])
  const skillCategoriesResult = useQuery(ALL_SKILL_CATEGORIES, { onCompleted: () => setAllCategories(allCategories.concat(skillCategoriesResult.data.allSkillCategories)) })
  const groupCategoriesResult = useQuery(ALL_GROUP_SKILL_CATEGORIES, { onCompleted: () => setAllCategories(allCategories.concat(groupCategoriesResult.data.allGroupSkillCategories)) })

  if (skillCategoriesResult.loading || groupCategoriesResult.loading) {
    return <Loading />
  }

  const handleCategoryClick = (category) => {
    if (!wantedCategories.includes(category)) {
      setWantedCategories(wantedCategories.concat(category))
    }
  }

  const submit = async (event: any) => {
    event.preventDefault()
    const postedBy = userContext.sessionId
    const wantedCategoryIds = wantedCategories.map(c => c.id)

    createQuery({
      variables: {
        content: content,
        startSchedule: startSchedule,
        endSchedule: endSchedule,
        wantedCategories: wantedCategoryIds,
        postedBy: postedBy,
        salary: salary,
        location: location
      }
    })
    setContent('')
  }

  return (
    <div>
      <h2>Send Query</h2>
      <div>
        <form onSubmit={submit}>
          <div>
            description <textarea
              cols={50}
              rows={5}
              value={content}
              onChange={({ target }) => setContent(target.value)}
            />
          </div>
          <div>
            location <input
              value={location}
              onChange={({ target }) => setLocation(target.value)}
            />
          </div>
          <div>
            salary <input
              value={salary}
              onChange={({ target }) => setSalary(target.value)}
            />
          </div>
          <div>
            startSchedule (or Day, Month, Year dropdowns?)<input
              value={startSchedule}
              onChange={({ target }) => setStartSchedule(target.value)}
            />
          </div>
          <div>
            endSchedule <input
              value={endSchedule}
              onChange={({ target }) => setEndSchedule(target.value)}
            />
          </div>
          <div>
            <b>Select categories:</b>
            {allCategories.map(category => <div onClick={() => handleCategoryClick(category)}>{category.name}</div>)}
          </div>
          <div>
            <b>Selected categories:</b>
            {wantedCategories.map(category => <div>{category.name}</div>)}
          </div>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
};

export default SendQuery;