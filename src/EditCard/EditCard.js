import {Component} from 'react'

import EditCardButtons from '../EditCardButtons/EditCardButtons'
import './EditCard.css'

class EditCard extends Component {
  state = {
    changeName: '',
    changeRole: '',
    changeEmail: '',
    nameError: false,
    roleError: false,
    emailError: false,
  }

  onChangeUpdateEmail = event => {
    const {updateEmail} = this.props
    this.setState({changeEmail: event.target.value, emailError: false})
    updateEmail(event.target.value)
  }

  onChangeUpdateName = event => {
    const {updateName} = this.props
    this.setState({changeName: event.target.value, nameError: false})
    updateName(event.target.value)
  }

  onChangeUpdateRole = event => {
    const {updateRole} = this.props
    this.setState({changeRole: event.target.value, roleError: false})
    updateRole(event.target.value)
  }

  onSubmitUpdateCardDetails = () => {
    const {changeEmail, changeName, changeRole} = this.state
    if (changeEmail === '') {
      this.setState({emailError: true})
      if (changeName === '') {
        this.setState({nameError: true})
        if (changeRole === '') {
          this.setState({roleError: true})
        }
      }
    } else if (changeName === '') {
      this.setState({nameError: true})

      if (changeRole === '') {
        this.setState({roleError: true})
      }
    } else if (changeRole === '') {
      this.setState({roleError: true})
    } else {
      const {updateCardDetails} = this.props

      updateCardDetails()
    }
  }

  renderEditCardInputs = () => {
    const {nameError, roleError, emailError} = this.state
    return (
      <>
        <div className="edit-input-container">
          <label htmlFor="name" className="edit-label ">
            NAME
          </label>
          <input
            type="text"
            id="name"
            className="edit-input"
            placeholder="New name"
            onChange={this.onChangeUpdateName}
          />
          {nameError && <p className="error-msg">*Required</p>}
        </div>
        <div className="edit-input-container">
          <label htmlFor="email" className="edit-label ">
            EMAIL
          </label>
          <input
            type="text"
            id="email"
            className="edit-input"
            placeholder="New email"
            onChange={this.onChangeUpdateEmail}
          />
          {emailError && <p className="error-msg">*Required</p>}
        </div>
        <div className="edit-input-container">
          <label htmlFor="role" className="edit-label ">
            ROLE
          </label>
          <input
            type="text"
            id="role"
            className="edit-input"
            placeholder="New role"
            onChange={this.onChangeUpdateRole}
          />
          {roleError && <p className="error-msg">*Required</p>}
        </div>
      </>
    )
  }

  render() {
    const {closeEditCard} = this.props
    return (
      <div className="edit-container">
        <div className="edit-details-container">
          {this.renderEditCardInputs()}
          <EditCardButtons
            closeEditCard={closeEditCard}
            onSubmitUpdateCardDetails={this.onSubmitUpdateCardDetails}
          />
        </div>
      </div>
    )
  }
}

export default EditCard
