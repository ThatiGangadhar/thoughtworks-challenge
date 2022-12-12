import {FaRegEdit} from 'react-icons/fa'
import {AiOutlineDelete} from 'react-icons/ai'
import './UserCard.css'

const UserCard = props => {
  const {
    userDetails,
    deleteSingleCard,
    selectedPostsList,
    selectSingleCard,
    editCardDetails,
  } = props

  const firstLetterOfName = userDetails.name[0]

  const cardStatus = selectedPostsList.includes(userDetails.id)
    ? 'card-status'
    : ''

  const selectCard = () => {
    console.log('card selected')
    selectSingleCard(userDetails.id)
  }

  const editCard = () => {
    console.log('card Edited')
    editCardDetails(userDetails.id)
  }

  const deleteCard = () => {
    deleteSingleCard(userDetails.id)
  }

  return (
    <li className="list-item">
      <div
        className={`description-container ${cardStatus}`}
        onClick={selectCard}
      >
        <p className="first-letter">{firstLetterOfName}</p>
        <h1 className="user-name">{userDetails.name}</h1>
        <p className="user-email">{userDetails.email}</p>
        <p className="user-name">{userDetails.role}</p>
      </div>
      <div className="card-change-container">
        <FaRegEdit className="icon" onClick={editCard} />
        <AiOutlineDelete className="icon" onClick={deleteCard} />
      </div>
    </li>
  )
}

export default UserCard
