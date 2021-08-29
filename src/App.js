import {Component} from 'react'

import UserCard from './UserCard/UserCard'
import Pagination from './Pagination/Pagination'
import EditCard from './EditCard/EditCard'
import './App.css'

class UsersList extends Component {
  state = {
    usersData: [],
    isLoading: true,
    currentPage: 1,
    postsPerPage: 10,
    selectedPostsList: [],
    searchInputValue: '',
    showEditCard: false,
    editCardId: '',
    name: '',
    role: '',
    email: '',
  }

  // Getting Users Data By Fetch Method

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
  // The below functions will updates State Variables.

  //this functions calls when you click on the Select Button.
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
  //this function calls when you click on the individual card and that card will be selected.
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
  //this function calls when you click on the Edit Symbol in each card.
  editCardDetails = id => {
    this.setState({showEditCard: true, editCardId: id})
  }

  //this functions calls when you click on the Submit Button in Edit Card.
  updateCardDetails = () => {
    const {usersData, email, name, role, editCardId} = this.state
    console.log(name, editCardId)
    const filteredData = usersData.map(eachItem => {
      if (eachItem.id === editCardId) {
        return {
          id: editCardId,
          name,
          role,
          email,
        }
      }
      return eachItem
    })
    this.setState({usersData: filteredData, showEditCard: false})
  }
  // this function calls when you click on the Cancel Button in Edit Card.
  closeEditCard = () => {
    this.setState({showEditCard: false})
  }

  //this function calls when you click on the Delete Selected Button in App.js Card.
  deleteSelectedPosts = () => {
    const {usersData, selectedPostsList} = this.state
    this.setState({
      usersData: usersData.filter(
        eachItem => !selectedPostsList.includes(eachItem.id),
      ),
      selectedPostsList: [],
    })
  }
  // This function calls when you click on the Delete Icon in UserCard and deletes that card.
  deleteSingleCard = id => {
    const {usersData} = this.state
    this.setState({
      usersData: usersData.filter(eachItem => eachItem.id !== id),
    })
  }
  // this functions calls when you click on the Pagination Numbers and updates Page Number.
  updateCurrentPageNumber = pageNumber =>
    this.setState({currentPage: pageNumber, selectedPostsList: []})
  // this function calls when you Enter name in Input Form Element
  updateSearchInput = event => {
    this.setState({searchInputValue: event.target.value})
  }
  //Below three functions will calls when enter details in Edit Card Inputs and updates the Respective card.
  updateEmail = email => {
    this.setState({email})
  }

  updateName = name => {
    this.setState({name})
  }

  updateRole = role => {
    this.setState({role})
  }
  // Ends State Updating Functions

  // Starts Rendering Details of Members adn Admins
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
  //this function renders Select and Delete Selected Buttons.
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
  // this function iterating over currentPosts Array and returns a each User Details card.
  renderUserDetailsCards = () => {
    const {selectedPostsList} = this.state
    const currentPosts = this.currentPostsPerPage()
    if (currentPosts.length === 0) {
      return <p className="error-input">No Matches Found</p>
    } else {
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
  }
  // this functions renders all User Details Cards and Pagination Buttons.
  renderDefaultCards = () => {
    const {
      isLoading,
      postsPerPage,
      usersData,
      currentPage,
      searchInputValue,
    } = this.state

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
        {showEditCard ? (
          <EditCard
            closeEditCard={this.closeEditCard}
            updateCardDetails={this.updateCardDetails}
            updateRole={this.updateRole}
            updateName={this.updateName}
            updateEmail={this.updateEmail}
          />
        ) : (
          this.renderDefaultCards()
        )}
      </>
    )
  }
}
export default UsersList
