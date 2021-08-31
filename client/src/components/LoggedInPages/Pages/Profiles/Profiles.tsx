import React, { useContext, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import './Profiles.css'
import { MY_ID, ALL_USERS_AND_GROUPS } from '../../../../graphql/queries';
import { NEW_CONVERSATION } from '../../../../graphql/mutations';
import { LargeProfileCard, Loading, Searchbar } from '../../../UtilityComponents/UtilityComponents';
import { UserContext } from '../../../UtilityComponents/UserContext';

const Profiles = () => {
  const userContext = useContext(UserContext)
  const myIdResult = useQuery(MY_ID)
  const [allUsersAndGroups, setAllUsersAndGroups] = useState([])
  const allUsersAndGroupsResult = useQuery(ALL_USERS_AND_GROUPS, {
    onCompleted: (data) => {
      setAllUsersAndGroups(data.allUsersAndGroups)
    }
  })
  const [newConversation] = useMutation(NEW_CONVERSATION)
  const history = useHistory()
  const [searchInput, setSearchInput] = useState<string>('')

  if (myIdResult.loading || allUsersAndGroupsResult.loading) {
    return <Loading />
  }

  const handleContactButtonPress = async (receiverId: any) => {
    const result = await newConversation({
      variables: {
        senderId: userContext.sessionId,
        receiverId: receiverId
      }
    })
    const returnedId = result.data.createConversation.id
    history.push(`/messages/${returnedId}`)
  }

  return (
    <div className="profiles-page-container">
      <div className="profiles-title-and-searchbar-container">
        <h1>Profiles</h1>
        <div className="profiles-searchbar-container">
          <Searchbar input={searchInput} setInput={setSearchInput} />
        </div>
      </div>

      <div className="profiles-container">
        {allUsersAndGroups.map((item: any) => {
          const name = item.profile.name
          if (name.toLowerCase().includes(searchInput.toLowerCase())) {
            const profileUrl = `/profiles/${item.id}`
            return (
              <div className="profile-card-container" key={item.id}>
                <LargeProfileCard
                  id={item.id}
                  image={item.profile.image}
                  name={item.profile.name}
                  categories={item.profile.categories}
                  url={profileUrl}
                  contactFunction={() => handleContactButtonPress(item.id)}
                />
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}


export default Profiles