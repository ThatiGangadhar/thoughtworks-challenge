
import './App.css'
import {Component} from 'react'

import UserCard from './UserCard'
import Pagination from './Pagination'

class UsersList extends Component {
  state = {
    usersData: [],
    isLoading: true,
    currentPage: 1,
    postsPerPage: 10,
    selectedPostsList: [],
    searchInputValue: '',
    updateName: '',
    updateEmail: '',
    updateRole: '',
    showEditCard: false,
    editCardId: '',
  }

  getUsersData = async () => {
    const url =
      ' https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({usersData: data, isLoading: false})
  }

  componentDidMount = () => {
    this.getUsersData()
  }

  selectCurrentPagePosts = () => {
    const {selectedPostsList, postsPerPage} = this.state
    const currentPosts = this.currentPostsPerPage()
    const filteredIds = currentPosts.map(eachItem => eachItem.id)
    if (selectedPostsList.length < postsPerPage) {
      this.setState({selectedPostsList: filteredIds})
    } else {
      this.setState({selectedPostsList: []})
    }
  }

  selectSingleCard = id => {
    const {selectedPostsList} = this.state
    let updatedIdList = null
    if (!selectedPostsList.includes(id)) {
      updatedIdList = [id]
      for (let item of selectedPostsList) {
        updatedIdList.push(item)
      }
      this.setState({selectedPostsList: updatedIdList})
    } else {
      updatedIdList = selectedPostsList.filter(eachItem => eachItem !== id)
      this.setState({selectedPostsList: updatedIdList})
    }
  }

  editCardDetails = id => {
    this.setState({showEditCard: true, editCardId: id})
  }

  updateCardDetails = () => {
    const {
      usersData,
      updateEmail,
      updateName,
      updateRole,
      editCardId,
    } = this.state
    const filteredData = usersData.map(eachItem => {
      if (eachItem.id === editCardId) {
        return {
          id: editCardId,
          name: updateName,
          role: updateRole,
          email: updateEmail,
        }
      }
      return eachItem
    })
    this.setState({usersData: filteredData, showEditCard: false})
  }

  closeEditCard = () => {
    this.setState({showEditCard: false})
  }

  deleteSelectedPosts = () => {
    const {usersData, selectedPostsList} = this.state
    this.setState({
      usersData: usersData.filter(
        eachItem => !selectedPostsList.includes(eachItem.id),
      ),
      selectedPostsList: [],
    })
  }

  deleteSingleCard = id => {
    const {usersData} = this.state
    this.setState({
      usersData: usersData.filter(eachItem => eachItem.id !== id),
    })
  }

  updateCurrentPageNumber = pageNumber =>
    this.setState({currentPage: pageNumber, selectedPostsList: []})

  updateSearchInput = event => {
    this.setState({searchInputValue: event.target.value})
  }

  onChangeUpdateEmail = event => {
    this.setState({updateEmail: event.target.value})
    console.log(event.target.value)
  }

  onChangeUpdateName = event => {
    this.setState({updateName: event.target.value})
    console.log(event.target.value)
  }

  onChangeUpdateRole = event => {
    this.setState({updateRole: event.target.value})
    console.log(event.target.value)
  }

  currentPostsPerPage = () => {
    const {usersData, currentPage, postsPerPage, searchInputValue} = this.state
    const searchInput = searchInputValue.toLowerCase()
    const filteredData = usersData.filter(
      eachItem =>
        eachItem.name.toLowerCase().includes(searchInput) ||
        eachItem.email.toLowerCase().includes(searchInput) ||
        eachItem.role.toLowerCase().includes(searchInput),
    )
    const lastPostOfPage = currentPage * postsPerPage
    const firstPostOfPage = lastPostOfPage - postsPerPage
    const currentPosts = filteredData.slice(firstPostOfPage, lastPostOfPage)
    return currentPosts
  }

  renderSelectAndDeleteButtons = () => (
    <div className="select-delete-container">
      <button
        type="button"
        className="button select-button"
        onClick={this.selectCurrentPagePosts}
      >
        Select all
      </button>
      <button
        type="button"
        className="button delete-button "
        onClick={this.deleteSelectedPosts}
      >
        Delete Selected
      </button>
    </div>
  )

  renderUserDetailsCards = () => {
    const {selectedPostsList} = this.state
    const currentPosts = this.currentPostsPerPage()

    return (
      <ul className="users-list">
        {currentPosts.map(eachUserDetails => (
          <UserCard
            userDetails={eachUserDetails}
            key={eachUserDetails.id}
            selectedPostsList={selectedPostsList}
            deleteSingleCard={this.deleteSingleCard}
            selectSingleCard={this.selectSingleCard}
            editCardDetails={this.editCardDetails}
          />
        ))}
      </ul>
    )
  }

  renderEditCardForm = () => {
    const {updateName, updateRole, updateEmail} = this.state

    return (
      <div className="edit-container">
        <div className="edit-details-container">
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
              value={updateName}
            />
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
              value={updateEmail}
            />
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
              value={updateRole}
            />
          </div>
          <div className="edit-buttons-container">
            <button
              type="button"
              className="edit-button"
              onClick={this.closeEditCard}
            >
              Cancel
            </button>
            <button
              type="button"
              className="edit-button"
              onClick={this.updateCardDetails}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderDefaultCards = () => {
    const {isLoading, postsPerPage, usersData, currentPage,searchInputValue,} = this.state
    const totalPosts =
      searchInputValue === ''
        ? usersData.length
        : this.currentPostsPerPage().length
    return (
      <div className="bg-container">
        <h1 className="main-heading">Admin Interface With Users</h1>
        <input
          type="search"
          className="input-el"
          placeholder="Search by name or Email or property"
          onChange={this.updateSearchInput}
        />
        {this.renderSelectAndDeleteButtons()}
        {isLoading && <p>Loading...</p>}
        {this.renderUserDetailsCards()}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={totalPosts}
          updateCurrentPage={this.updateCurrentPageNumber}
          currentPage={currentPage}
        />
      </div>
    )
  }

  render() {
    const {showEditCard} = this.state
    return (
      <>
        {showEditCard ? this.renderEditCardForm() : this.renderDefaultCards()}
      </>
    )
  }
}
export default UsersList
