
import React from 'react'
import {Table, Column, Cell} from 'fixed-data-table-2'
import {TextCell, ActionCell, SortHeaderCell, RatingCell} from '../components/CellHelpers'
const Dimensions = require('react-dimensions')

class LoadingSpinner extends React.Component {
  constructor () {
    super()
  }
  render () {
    return (
      <div id='loading'>
        <i className='fa fa-cog fa-spin' /> loading...
      </div>
    )
  }
}

class ErrorComponent extends React.Component {
  constructor () {
    super()
  }
  render () {
    let data = this.props.data

    return (
      <div class='error'>
        <i className='fa fa-warning' /> {data}
      </div>
    )
  }
}

class AboutUs extends React.Component {
  constructor () {
    super()
  }
  render () {
    let me = 'Hello - I\'m a UI/UX Developer in the Seattle and like ' +
    'to build web applications using JavaScript, CSS and HTML5. ' +
    'If I\'m not doing that, you will find me walking my favorite dog, Rosie!'
    let project = 'This site is a sandbox built for exploring ' +
    'patterns with React and Redux.'
    let iconStyle = {
      marginRight: '1rem'
    }
    let links = [
      'http://github.com/johnfrog76/',
      'http://www.linkedin.com/pub/john-webster/16/787/995',
      'http://twitter.com/johnfrog76/'
    ]
    return (
      <div className='about-us-wrapper'>
        <h1>About</h1>
        <p>{project}</p>
        <h2>Me</h2>
        <div className='row'>
          <div class='col-sm-3'>
            <div className='photos-me-wrapper'>
              <div className='about-me' />
              <div className='about-me family' />
            </div>
          </div>
          <div class='col-sm-1' />
          <div class='col-sm-8'>
            <p className='me intro'>{me}
              <br />
              <span className='social'>
                <a href={links[0]}
                  target='_blank'
                  style={iconStyle}>
                  <i className='fa fa-github' />
                </a>
                <a href={links[1]}
                  target='_blank'
                  style={iconStyle}>
                  <i className='fa fa-linkedin-square' />
                </a>
                <a href={links[2]}
                  target='_blank'>
                  <i className='fa fa-twitter' />
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

class LoginForm extends React.Component {
  constructor () {
    super()
    this.handleSubmit = this._handleSubmit.bind(this)
  }
  _handleSubmit (e) {
    e.preventDefault()
    let user = e.target.elements.user.value.trim()
    let pass = e.target.elements.pass.value.trim()

    if (!user || !pass) {
      return
    }

    return this.props.layout.fetchSession({user: user, pass: pass})
  }
  render () {
    return (
      <form className='MessageForm' onSubmit={this.handleSubmit}>
        <input type='hidden' value='prayer' />
        <input
          type='text'
          className='form-control'
          name='user'
          placeholder='user'
          autoComplete='off'
          value={this.user}
          onChange={this.handleNameChange}
        />
        <input
          type='password'
          className='form-control'
          name='pass'
          placeholder='pass'
          autoComplete='off'
          value={this.pass}
          onChange={this.handlePassChange}
        />
        <button
          type='submit'
          className='btn btn-primary'>Log In
        </button>
      </form>
    )
  }
}

class RecipeGrid extends React.Component {
  constructor (props) {
    super(props)
    this.SortTypes = {
      ASC: 'ASC',
      DESC: 'DESC'
    }

    // for filtering and sorting data
    this._dataList = props.data

    this.state = {
      filteredDataList: this._dataList,
      colSortDirs: {}
    }

    this.handleClick = this._handleClick.bind(this)
    this._onFilterChange = this._onFilterChange.bind(this)
    this._getObjectAt = this._getObjectAt.bind(this)
    this._onSortChange = this._onSortChange.bind(this)
  }
  _handleClick (evt) {
    evt.preventDefault()
    this.props.layout.onViewRecipeDetail(parseFloat(evt.target.id))
    evt.target.blur()
  }
  _getObjectAt (index) {
    return {
      cat_id: this._dataList[index].cat_id,
      category: this._dataList[index].category,
      id: this._dataList[index].id,
      r_name: this._dataList[index].r_name,
      rating: this._dataList[index].rating,
      shared: this._dataList[index].shared,
      user_id: this._dataList[index].user_id
    }
  }

  _onSortChange (columnKey, sortDir) {
    let sortIndexes = this._dataList.slice()

    sortIndexes.sort((indexA, indexB) => {
      let sortVal = 0
      let valueA = indexA[columnKey]
      let valueB = indexB[columnKey]

      if (valueA > valueB) {
        sortVal = 1
      }

      if (valueA < valueB) {
        sortVal = -1
      }

      if (sortVal !== 0 && sortDir === this.SortTypes.ASC) {
        sortVal = sortVal * -1
      }

      return sortVal
    })

    this.setState({
      filteredDataList: sortIndexes,
      colSortDirs: {
        [columnKey]: sortDir
      }
    })
  }
  _onFilterChange (e) {
    let i
    let filterBy = e.target.value.toLowerCase()
    let len = this._dataList.length
    let filteredItems = []
    const emptyRecord = [{
      cat_id: '',
      category: '',
      id: '',
      r_name: 'No results',
      rating: '',
      shared: '',
      user_id: ''
    }]

    if (!e.target.value) {
      this.setState({
        filteredDataList: this._dataList
      })
    } else {
      for (i = 0; i < len; i++) {
        let name = this._dataList[i]['r_name']

        if (name.toLowerCase().indexOf(filterBy) !== -1) {
          filteredItems.push(this._getObjectAt(i))
        }
      }

      this.setState({
        filteredDataList: filteredItems.length > 0 ? filteredItems : emptyRecord
      })
    }
  }
  render () {
    // dynamicly setting width using a specific module. See exports.
    const {containerHeight, containerWidth} = this.props
    let {filteredDataList, colSortDirs} = this.state

    return (
      <div>
        <h1>Recipes</h1>
        <div className='filter-input'>
          <input
            type='text'
            className='form-control'
            onChange={this._onFilterChange}
            placeholder='Filter by Name'
          />
        </div>
        <Table
          rowHeight={50}
          headerHeight={50}
          rowsCount={filteredDataList.length}
          width={containerWidth}
          height={containerHeight}
          >
          <Column
            columnKey='category'
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.category}>
                Category
              </SortHeaderCell>
            }
            cell={<TextCell data={filteredDataList} />}
            flexGrow={0.75}
            width={5}
          />
          <Column
            columnKey='rating'
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.rating}>
                Rating
              </SortHeaderCell>
            }
            cell={<RatingCell data={filteredDataList} />}
            flexGrow={0.75}
            width={10}
          />
          <Column
            columnKey='r_name'
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.r_name}>
                Name
              </SortHeaderCell>
            }
            cell={<TextCell data={filteredDataList} />}
            flexGrow={2}
            width={40}
          />
          <Column
            header={<Cell>Details</Cell>}
            cell={<ActionCell data={filteredDataList} action={this} />}
            flexGrow={1}
            width={5}
          />
        </Table>
      </div>
    )
  }
}

class RecipeTable extends React.Component {
  constructor () {
    super()
    this.handleClick = this._handleClick.bind(this)
  }
  _handleClick (evt) {
    evt.preventDefault()
    this.props.layout.onViewRecipeDetail(parseFloat(evt.target.id))
    evt.target.blur()
  }
  render () {
    let data = this.props.data

    return (
      <div class='table-wrap'>
        <table class='table'>
          <thead>
            <tr>
              <th>Category</th>
              <th>Rating</th>
              <th>Name</th>
              <th>ID</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.category}</td>
                    <td>{item.rating}</td>
                    <td>{item.r_name}</td>
                    <td>{item.id}</td>
                    <td><a id={item.id}
                      href='#'
                      onClick={this.handleClick}>View
                      </a>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

class RecipeViewDetails extends React.Component {
  constructor () {
    super()
    this.handleClick = this._handleClick.bind(this)
  }
  _handleClick (e) {
    e.preventDefault()
    this.props.layout.fetchRecipes(e)
    e.target.blur()
  }
  render () {
    const data = this.props.data.recipe
    let comments = (data.comments.length < 1) ? [] : data.comments
    let ingredients = data.ingredients
    let steps = data.steps
    return (
      <div className='recipeItem'>
        <p><a href='#' onClick={this.handleClick}>Back &gt;</a></p>
        <h3>{data.r_name}</h3>
        <h5>Ingredients</h5>
        <ul>
          {
            ingredients.map((item, i) => {
              return (
                <li key={'ingredient' + i}>{item}</li>
              )
            })
          }
        </ul>
        <h5>Steps</h5>
        <ul>
          {
            steps.map((item, i) => {
              return (
                <li key={'step' + i}>{item}</li>
              )
            })
          }
        </ul>
        <h5>Comments</h5>
        <ul>
          {
            comments.map((item, i) => {
              return (
                <li key={'comment' + i}>
                  {item.user}: {item.comment}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

let ResponsiveGrid = Dimensions({
  getHeight: function (element) {
    return window.innerHeight - 300
  },
  getWidth: function (element) {
    var widthOffset = window.innerWidth < 680 ? 30 : 240
    return window.innerWidth - widthOffset
  }
})(RecipeGrid)

export {
  LoadingSpinner,
  AboutUs,
  LoginForm,
  RecipeTable,
  RecipeViewDetails,
  ErrorComponent,
  ResponsiveGrid
}
