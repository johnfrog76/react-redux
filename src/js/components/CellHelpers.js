
import React from 'react'
import {Cell} from 'fixed-data-table-2'

// TextCell is a helper for fixed-data-table-2
class SortHeaderCell extends React.Component {
  constructor (props) {
    super(props)

    this.sortTypes = {
      ASC: 'ASC',
      DESC: 'DESC'
    }

    this.onCellSort = this._onCellSort.bind(this)
    this.reverseSortDirection = this._reverseSortDirection.bind(this)
  }

  render () {
    let {onCellSort, children, ...props} = this.props
    return (
      <Cell>
        <a onClick={this.onCellSort}>
          <span>{children} {props.sortDir ? (props.sortDir === this.sortTypes.DESC ? '↓' : '↑') : ''}</span>
        </a>
      </Cell>
    )
  }

  _reverseSortDirection (sortDir) {
    return sortDir === this.sortTypes.DESC ? this.sortTypes.ASC : this.sortTypes.DESC
  }

  _onCellSort (e) {
    e.preventDefault()

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ? this._reverseSortDirection(this.props.sortDir)
            : this.sortTypes.DESC
      )
    }
  }
}

// TextCell is a helper for fixed-data-table-2
class TextCell extends React.Component {
  constructor () {
    super()
  }
  render () {
    const {rowIndex, field, data, ...props} = this.props
    const columnKey = this.props.columnKey
    return (
      <Cell {...props}>{data[rowIndex][columnKey]}</Cell>
    )
  }
}

// AcitonCell is a helper for fixed-data-table-2
class ActionCell extends React.Component {
  constructor () {
    super()
  }
  render () {
    const {rowIndex, field, data, ...props} = this.props
    let myId = data[rowIndex].id
    let cellContents = (myId === '') ? ''
      : <a id={myId} href='#' onClick={props.action.handleClick}>View</a>

    return (
      <Cell {...props}>{cellContents}</Cell>
    )
  }
}

export {
  TextCell,
  ActionCell,
  SortHeaderCell
}
