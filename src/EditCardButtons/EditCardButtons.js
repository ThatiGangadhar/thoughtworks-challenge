import './EditCardButtons.css'

const EditCardButtons = props => {
  const {closeEditCard, onSubmitUpdateCardDetails} = props

  return (
    <div className="edit-buttons-container">
      <button type="button" className="edit-button" onClick={closeEditCard}>
        Cancel
      </button>
      <button
        type="button"
        className="edit-button"
        onClick={onSubmitUpdateCardDetails}
      >
        Submit
      </button>
    </div>
  )
}

export default EditCardButtons
