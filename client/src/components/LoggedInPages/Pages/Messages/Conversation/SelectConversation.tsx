import { Button } from '../../../../UtilityComponents/UtilityComponents'
import './Conversation.css'

const SelectConversation = ({ setShowContacts }) => {
  return (
    <div className="conversation-container">
      <div className="select-conversation-container">
        <h1>Select conversation</h1>
        <div className="show-contacts-button-container">
          <Button text="Show contacts" handleClick={() => setShowContacts(true)} />
        </div>
      </div>
    </div>
  )

}

export default SelectConversation