import React from "react"
import { connect } from "react-redux"

import {
    Button,
    Navbar,
    Nav,
    NavItem
} from 'react-bootstrap';

import {fetchPortfolio, clearPortfolio } from "../actions/portfolioActions"
import {fetchFiddles, clearFiddles} from "../actions/fiddleActions"
import {fetchSession, showLoginForm} from "../actions/recipeSessionActions"
import {fetchRecipe, clearRecipe} from "../actions/recipeItemActions"
import {fetchRecipes, clearRecipes} from "../actions/recipeActions"

import {
    fetchSongs,
    clearSongs,
    updateSong,
    pauseAllSongs
} from "../actions/songsActions"

import {
    LoadingSpinner,
    Portfolio,
    FiddlesJS,
    LoginForm,
    RecipeTable,
    RecipeViewDetails,
    ErrorComponent,
    ViewSongs
} from "../components/All"

@connect((store) => {
  return {
    portfolio: store.portfolio,
    fiddles: store.fiddles,
    session: store.session,
    recipes: store.recipes,
    recipe: store.recipe,
    songs: store.songs
  };
})

export default class Layout extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchPortfolio())
    }

    clearStore() {
        this.props.dispatch(clearRecipe())
        this.props.dispatch(clearRecipes())
        this.props.dispatch(clearFiddles())
        this.props.dispatch(clearPortfolio())
        this.props.dispatch(clearSongs())
    }

    fetchPortfolio(e) {
        e.preventDefault();
        e.target.blur();
        this.clearStore();
        this.props.dispatch(fetchPortfolio())
    }

    showLoginForm(e) {
        e.preventDefault();
        e.target.blur();
        this.clearStore();
        this.props.dispatch(showLoginForm())
    }

    updateSong(song) {
        this.props.dispatch(updateSong(song))
    }

    pauseAllSongs() {
        this.props.dispatch(pauseAllSongs())
    }

    fetchRecipes(e) {
        e.preventDefault();
        e.target.blur();
        this.clearStore();
        this.props.dispatch(fetchRecipes())
    }

    fetchSession(obj) {
        this.clearStore();
        this.props.dispatch(fetchSession(obj))
        this.props.dispatch(fetchRecipes())
    }

    fetchFiddles(e) {
        e.preventDefault();
        e.target.blur();
        this.clearStore();
        this.props.dispatch(fetchFiddles())
    }

    fetchSongs(e) {
        e.preventDefault();
        e.target.blur();
        this.clearStore();
        this.props.dispatch(fetchSongs())
    }

    onViewRecipeDetail(recipeToShowID) {
        this.props.dispatch(clearRecipes())
        this.props.dispatch(fetchRecipe(recipeToShowID))
    }

    isActive(value) {
        return value ? 'active' : '';
    }

    render() {
        const { portfolio, fiddles, recipes, recipe, session, songs} = this.props;

        let tab = <LoadingSpinner />

        if (fiddles.fetched) {
            tab = <FiddlesJS data={fiddles.fiddleitems} />
        } else if (fiddles.fetching) {
            tab = <LoadingSpinner />
        } else if (portfolio.fetched) {
            tab = <Portfolio data={portfolio.portfolioitems} />;
        } else if (portfolio.error) {
            tab = <ErrorComponent data={portfolio.error.message} />;
        } else if (fiddles.error) {
            tab = <ErrorComponent data={fiddles.error.message} />;
        } else if (songs.error) {
            tab = <ErrorComponent data={songs.error.message} />;
        } else if (songs.fetching) {
            tab = <LoadingSpinner />
        }  else if (songs.fetched) {
            tab = <ViewSongs layout={this} data={songs.songitems} />
        } else if (session.error) {
            tab = <ErrorComponent data={session.error} />;
        } else if (session.fetched) {
            // gated by session
            if (recipes.fetched) {
                tab = <RecipeTable data={recipes.recipeitems}
                    layout={this}
                    onViewRecipeDetail={this.onViewRecipeDetail}
                />
            } else if (recipe.fetched) {
                tab = <RecipeViewDetails
                    layout={this}
                    data={recipe}
                />
            }
        } else if (session.showForm) {
             tab = <LoginForm layout={this} data={session} />
        }

        return <div>
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Toggle />
                    <Navbar.Brand>
                        <a href="#">JW</a>
                    </Navbar.Brand>
                </Navbar.Header>
                    <Navbar.Collapse>
                    <Nav>
                        <NavItem
                            eventKey={1}
                            className={this.isActive(this.props.portfolio.isActive)}
                            onClick={this.fetchPortfolio.bind(this)}
                            href="#"
                        >Portfolio
                        </NavItem>
                        <NavItem
                            eventKey={2}
                            className={this.isActive(this.props.fiddles.isActive)}
                            onClick={this.fetchFiddles.bind(this)}
                            href="#"
                        >Fiddles
                        </NavItem>
                        <NavItem
                            eventKey={3}
                            className={this.isActive(this.props.recipes.isActive)}
                            onClick={this.showLoginForm.bind(this)}
                            href="#"
                        >Recipes
                        </NavItem>
                        <NavItem
                            eventKey={4}
                            className={this.isActive(this.props.songs.isActive)}
                            onClick={this.fetchSongs.bind(this)}
                            href="#"
                        >Songs
                        </NavItem>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            {tab}
                        </div>
                    </div>
                </div>
            </div>
    }
}
