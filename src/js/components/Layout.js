import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import {
  Button,
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'

import {
  fetchPortfolio,
  displayPortfolio,
  clearPortfolio,
  inactivePortfolio
} from '../actions/portfolioActions'

import {
  fetchFiddles,
  displayFiddles,
  clearFiddles,
  inactiveFiddles
} from '../actions/fiddleActions'

import {
  displayAbout,
  inactiveAbout
} from '../actions/aboutActions'

import {
  fetchSession,
  showLoginForm,
  clearSession
} from '../actions/recipeSessionActions'

import {
  fetchRecipe,
  clearRecipe,
  inactiveRecipe
} from '../actions/recipeItemActions'

import {
  fetchRecipes,
  displayRecipes,
  clearRecipes,
  inactiveRecipes
} from '../actions/recipeActions'

import {
  fetchSongs,
  displaySongs,
  clearSongs,
  inactiveSongs,
  updateSong,
  pauseAllSongs
} from '../actions/songsActions'

import {
  LoadingSpinner,
  AboutUs,
  LoginForm,
  RecipeTable,
  ResponsiveGrid,
  RecipeViewDetails,
  ErrorComponent,
  FooterCont
} from '../components/All'

import {
  FiddlesJS
} from '../components/Fiddles'

import {
  Portfolio
} from '../components/Portfolio'

import {
  ViewSongs
} from '../components/ViewSongs'

@connect((store) => {
  return {
    portfolio: store.portfolio,
    fiddles: store.fiddles,
    session: store.session,
    recipes: store.recipes,
    recipe: store.recipe,
    songs: store.songs,
    about: store.about
  }
})

export default class Layout extends React.Component {
  componentWillMount () {
    // fetch session here
    this.props.dispatch(displayAbout())
    this.props.dispatch(fetchSession({user: '1', pass: 'a'}))
  }

  needsCache (key) {
    // return true if needs cache refresh or null
    const life = 1000 * 60 * 1
    let myObj = this.props[key]
    let ret = true; // assume needed

    if (myObj.cache) {
      // cache exists
      let d = new Date();
      let millis = d.getTime()
      let diff = (millis - myObj.cache) - life

      ret =  diff > 0 ? true : false; // gtn 0 refresh
    }
    return ret
  }

  clearStore () {
    this.props.dispatch(clearRecipe())
    this.props.dispatch(clearRecipes())
    this.props.dispatch(clearFiddles())
    this.props.dispatch(clearPortfolio())
    this.props.dispatch(clearSongs())
  }

  clearTabs () {
    this.props.dispatch(inactiveAbout())
    this.props.dispatch(inactiveFiddles())
    this.props.dispatch(inactivePortfolio())
    this.props.dispatch(inactiveRecipes())
    this.props.dispatch(inactiveRecipe())
    this.props.dispatch(inactiveSongs())
  }

  fetchPortfolio (e) {
    e.preventDefault()
    e.target.blur()
    this.clearTabs()

    if (this.needsCache('portfolio')) {
      this.props.dispatch(fetchPortfolio())
    } else {
      this.props.dispatch(displayPortfolio())
    }
  }

  showLoginForm (e) {
    e.preventDefault()
    e.target.blur()
    this.clearTabs()

    if (!_.isEmpty(this.props.session.sess)) {
      if (this.needsCache('recipes')) {
        this.props.dispatch(fetchRecipes())
      } else {
        this.props.dispatch(displayRecipes())
      }
    } else {
      this.props.dispatch(showLoginForm())
    }
  }

  updateSong (song) {
    this.props.dispatch(updateSong(song))
  }

  pauseAllSongs () {
    this.props.dispatch(pauseAllSongs())
  }

  fetchAbout (e) {
    e.preventDefault()
    e.target.blur()
    this.clearTabs()
    this.props.dispatch(displayAbout())
  }

  fetchRecipes (e) {
    e.preventDefault()
    e.target.blur()
    this.clearTabs()

    if (this.needsCache('recipes')) {
      this.props.dispatch(fetchRecipes())
    } else {
      this.props.dispatch(displayRecipes())
    }
  }

  fetchSession (obj) {
    this.clearTabs()
    this.props.dispatch(fetchRecipes())
  }

  fetchFiddles (e) {
    e.preventDefault()
    e.target.blur()
    this.clearTabs()
    if (this.needsCache('fiddles')) {
      this.props.dispatch(fetchFiddles())
    } else {
      this.props.dispatch(displayFiddles())
    }
  }

  fetchSongs (e) {
    e.preventDefault()
    e.target.blur()
    this.clearTabs()

    if (this.needsCache('songs')) {
      this.props.dispatch(fetchSongs())
    } else {
      this.props.dispatch(displaySongs())
    }
  }

  onViewRecipeDetail (recipeToShowID) {
    this.props.dispatch(fetchRecipe(recipeToShowID))
  }

  isActive (value) {
    return value === true ? 'active' : ''
  }

  render () {
    const {portfolio, fiddles, recipes, recipe, session, songs, about} = this.props

    let tab = <LoadingSpinner />

    if (fiddles.isActive) {
      tab = <FiddlesJS data={fiddles.fiddleitems} />
    } else if (fiddles.fetching) {
      tab = <LoadingSpinner />
    } else if (about.isActive) {
      tab = <AboutUs />
    } else if (portfolio.isActive) {
      tab = <Portfolio data={portfolio.portfolioitems} />
    } else if (portfolio.error) {
      tab = <ErrorComponent data={portfolio.error.message} />
    } else if (fiddles.error) {
      tab = <ErrorComponent data={fiddles.error.message} />
    } else if (songs.error) {
      tab = <ErrorComponent data={songs.error.message} />
    } else if (songs.fetching) {
      tab = <LoadingSpinner />
    } else if (songs.isActive) {
      tab = <ViewSongs layout={this} data={songs.songitems} />
    } else if (session.error) {
        tab = <ErrorComponent data={session.error} />
      } else if (session.showForm === true) {
          tab = <LoginForm layout={this} data={session} />
        } else if (!_.isEmpty(session.sess) && session.showForm === false) {
          if (recipe.isActive) {
            tab = <RecipeViewDetails
              layout={this}
              data={recipe}
            />
          } else if (recipe.error) {
            tab = <ErrorComponent data={recipe.error} />
          } else if (recipes.isActive) {
            tab = <ResponsiveGrid data={recipes.recipeitems}
              layout={this}
              onViewRecipeDetail={this.onViewRecipeDetail}
            />
          }
        }

    return <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Toggle />
          <Navbar.Brand>
            <a
              href='#'
              onClick={this.fetchAbout.bind(this)}
            >JW
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem
              eventKey={1}
              className={this.isActive(this.props.about.isActive)}
              onClick={this.fetchAbout.bind(this)}
              href='#'
            >About
            </NavItem>
            <NavItem
              eventKey={2}
              className={this.isActive(this.props.portfolio.isActive)}
              onClick={this.fetchPortfolio.bind(this)}
              href='#'
            >Portfolio
            </NavItem>
            <NavItem
              eventKey={3}
              className={this.isActive(this.props.fiddles.isActive)}
              onClick={this.fetchFiddles.bind(this)}
              href='#'
            >Fiddles
            </NavItem>
            <NavItem
              eventKey={4}
              className={this.isActive(this.props.recipes.isActive)}
              onClick={this.showLoginForm.bind(this)}
              href='#'
            >Recipes
            </NavItem>
            <NavItem
              eventKey={5}
              className={this.isActive(this.props.songs.isActive)}
              onClick={this.fetchSongs.bind(this)}
              href='#'
            >Songs
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 main-content-area'>
            {tab}
          </div>
        </div>
      </div>
      <div className='footer'>
        <FooterCont />
      </div>
    </div>
  }
}
