import React from "react"
import { connect } from "react-redux"

import {fetchPortfolio} from "../actions/portfolioActions"
import {clearPortfolio} from "../actions/portfolioActions"

import {fetchFiddles} from "../actions/fiddleActions"
import {clearFiddles} from "../actions/fiddleActions"

import {fetchSession} from "../actions/recipeSessionActions"
import {showLoginForm} from "../actions/recipeSessionActions"

import {fetchRecipes} from "../actions/recipeActions"
import {fetchRecipe} from "../actions/recipeItemActions"
import {clearRecipe} from "../actions/recipeItemActions"
import {clearRecipes} from "../actions/recipeActions"
import {
    LoadingSpinner,
    Portfolio,
    FiddlesJS,
    LoginForm,
    RecipeTable,
    RecipeViewDetails,
    ErrorComponent
} from "../components/All"

@connect((store) => {
  return {
    portfolio: store.portfolio,
    fiddles: store.fiddles,
    session: store.session,
    recipes: store.recipes,
    recipe: store.recipe
  };
})

export default class Layout extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchPortfolio())
    }

    fetchPortfolio(e) {
        e.preventDefault();
        e.target.blur();
        this.props.dispatch(clearRecipe())
        this.props.dispatch(clearRecipes())
        this.props.dispatch(clearFiddles())
        this.props.dispatch(fetchPortfolio())
    }

    showLoginForm(e) {
        e.preventDefault();
        e.target.blur();
        this.props.dispatch(clearRecipe())
        this.props.dispatch(showLoginForm())
        this.props.dispatch(clearFiddles())
        this.props.dispatch(clearPortfolio())
    }

    fetchRecipes(e) {
        e.preventDefault();
        e.target.blur();
        this.props.dispatch(clearRecipe())
        this.props.dispatch(clearFiddles())
        this.props.dispatch(clearPortfolio())
        this.props.dispatch(fetchRecipes())
    }

    fetchSession(obj) {
        this.props.dispatch(fetchSession(obj))
        this.props.dispatch(clearFiddles())
        this.props.dispatch(clearPortfolio())
        this.props.dispatch(clearRecipe())
        this.props.dispatch(fetchRecipes())
    }

    fetchFiddles(e) {
        e.preventDefault();
        e.target.blur();
        this.props.dispatch(clearRecipe())
        this.props.dispatch(clearRecipes())
        this.props.dispatch(clearPortfolio())
        this.props.dispatch(fetchFiddles())
    }

    onViewRecipeDetail(recipeToShowID) {
        this.props.dispatch(clearRecipes())
        this.props.dispatch(fetchRecipe(recipeToShowID))
    }

    isActive(value) {
        return value ? 'active' : '';
    }

    render() {
        const { portfolio, fiddles, recipes, recipe, session} = this.props;

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
        } else if (session.error) {
            tab = <ErrorComponent data={session.error} />;
        } else if (session.fetched) {
            // gated by session
            if (recipes.fetched) {
                tab = <RecipeTable data={recipes.recipeitems}
                    needscope={this}
                    onViewRecipeDetail={this.onViewRecipeDetail}
                />
            } else if (recipe.fetched) {
                tab = <RecipeViewDetails
                    needscope={this}
                    data={recipe}
                />
            }
        } else if (session.showForm) {
             tab = <LoginForm needscope={this} data={session} />
        }

        return <div>
            <nav>
                <div>
                    <a href="#" className={this.isActive(this.props.portfolio.isActive)}
                        onClick={this.fetchPortfolio.bind(this)}>Portfolio
                    </a>&nbsp;/&nbsp;
                    <a href="#" className={this.isActive(this.props.fiddles.isActive)}
                        onClick={this.fetchFiddles.bind(this)}>Fiddles
                    </a>&nbsp;/&nbsp;
                    <a href="#" className={this.isActive(this.props.recipes.isActive)}
                        onClick={this.showLoginForm.bind(this)}>Recipes</a>
                </div>
            </nav>
            {tab}
        </div>
    }
}
