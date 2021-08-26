import {FiChevronLeft} from 'react-icons/fi'
import {FiChevronRight} from 'react-icons/fi'
import {FiChevronsLeft} from 'react-icons/fi'
import {FiChevronsRight} from 'react-icons/fi'

import './Pagination.css'

const Pagination = props => {
  const {postsPerPage, totalPosts, updateCurrentPage, currentPage} = props
  const numberOfPages = Math.ceil(totalPosts / postsPerPage)
  const pageNumbers = []
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i)
  }

  const renderPaginationButtons = pageNumbers => {
    const pagination = pageNumbers.map(eachNumber => {
      const changeCurrentPage = event => {
        updateCurrentPage(event.target.value)
      }
      const currentNumber =
        eachNumber === currentPage ? 'selected-number' : 'unselected-number'
      return (
        <li
          className={`each-number ${currentNumber}`}
          key={eachNumber}
          value={eachNumber}
          onClick={changeCurrentPage}
        >
          {eachNumber}
        </li>
      )
    })
    return pagination
  }

  const moveToNextPage = () => {
    if (currentPage < numberOfPages) {
      const newPageNumber = currentPage + 1
      updateCurrentPage(newPageNumber)
    }
  }

  const moveToPreviousPage = () => {
    if (currentPage > 1) {
      const newPageNumber = currentPage - 1
      updateCurrentPage(newPageNumber)
    }
  }

  const moveToFirstPage = () => updateCurrentPage(1)

  const moveToLastPage = () => updateCurrentPage(numberOfPages)

  const renderPreviousIcons = () => {
    const prevIconStyle =
      currentPage === 1 ? 'selected-number' : 'unselected-number'
    return (
      <div>
        <FiChevronsLeft
          className={`each-number ${prevIconStyle}`}
          onClick={moveToFirstPage}
        />
        <FiChevronLeft
          className={`each-number ${prevIconStyle}`}
          onClick={moveToPreviousPage}
        />
      </div>
    )
  }

  const renderNextIcons = () => {
    const nextIconStyle =
      currentPage === numberOfPages ? 'selected-number' : 'unselected-number'
    return (
      <div>
        <FiChevronRight
          className={`each-number ${nextIconStyle}`}
          onClick={moveToNextPage}
        />
        <FiChevronsRight
          className={`each-number ${nextIconStyle}`}
          onClick={moveToLastPage}
        />
      </div>
    )
  }

  return (
    <ul className="pagination-container">
      {renderPreviousIcons()}
      {renderPaginationButtons(pageNumbers)}
      {renderNextIcons()}
    </ul>
  )
}

export default Pagination
