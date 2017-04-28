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



const LoginForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();

        let user = e.target.elements.user.value.trim();
        let pass = e.target.elements.pass.value.trim();

        if (!user || !pass) {
            return;
        }

        return this.props.needscope.fetchSession({user: user, pass: pass}).bind(this);
    },
    render: function () {
        let data = this.props.data;

        return (
            <form className="MessageForm" onSubmit={this.handleSubmit}>
            <input type="hidden" value="prayer" />
              <input
                type="text"
                className="form-control"
                name="user"
                placeholder="user"
                autoComplete="off"
                value={this.user}
                onChange={this.handleNameChange}
              />
              <input
                type="password"
                className="form-control"
                name="pass"
                placeholder="pass"
                autoComplete="off"
                value={this.pass}
                onChange={this.handlePassChange}
              />
              <button
                type="submit"
                className="btn btn-primary"
              >
                Log In
              </button>
            </form>
        )
    }
});

const FiddlesJS = React.createClass({
    render: function () {
        let data = this.props.data;

        return (
            <div className="fiddle">
                {
                    data.map((item, i) => {
                        let colors = ['#3F51B5','#4CAF50', '#009688', '#00BCD4'];
                        let pageIndex = i % colors.length;
                        let styleColor = {
                            color: colors[pageIndex]
                        };
                        let backgroundStyle = {
                            backgroundColor: colors[pageIndex],
                            padding: '10px 10px 5px 10px',
                            marginBottom: '2.5rem'
                        };
                        let groupClass = 'group' + i;
                        let headingID = 'heading' + item.id;
                        let heading = item.fiddles.length === 0 ? null :
                            <h2 id={headingID} style={styleColor}>{item.name}</h2>;
                        let fiddles = item.fiddles.map(function(fiddle, n) {
                            let str = '//jsfiddle.net/' + fiddle.fiddle +
                                '/embedded/result,js,html,css/dark/';
                            return (
                                <div key={n} className="fiddle-item" style={backgroundStyle}>
                                    <h3>{fiddle.title}</h3>
                                    <p>{fiddle.description}</p>
                                    <div className="fiddle-wrap">
                                        <iframe
                                            width="100%"
                                            height="500"
                                            src={str}
                                            scrolling="yes"
                                        >
                                        </iframe>
                                    </div>
                                </div>
                            )
                        });

                        return (
                            <div key={i} className={groupClass}>
                                {heading}
                                <div>{fiddles}</div>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
});

const Portfolio = React.createClass({
    render: function () {
        let data = this.props.data;
        return (
            <div className="portfolio">
                {
                    data.map((item, i) => {
                        let headingID = 'heading' + item.id;
                        let photos = item.images.map(function(image, n) {
                            let str = 'http://sbtest.com/portfolio/images/' + image.img;
                            return (
                                <div key={n} className="photo-item">
                                    <img src={str} />
                                    <figcaption>{image.caption}</figcaption>
                                </div>
                            )
                        });


                        return (
                            <div key={i}>
                                <h2 id={headingID}>{item.name}</h2>
                                <div>{photos}</div>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
});

const RecipeViewDetails = React.createClass({
    handleClick: function (e) {
        e.preventDefault();
        this.props.needscope.fetchRecipes(e);
    },
    render: function() {
        const data = this.props.data.recipe;
        let comments = (data.comments.length < 1) ? [] : data.comments;
        let ingredients = data.ingredients;
        let steps = data.steps;
        return (
            <div className="recipeItem">
            <p><a href="#" onClick={this.handleClick}>Back &gt;</a></p>
            <h3>{data.r_name}</h3>
                <h5>Ingredients</h5>
                <ul>
                    {
                    ingredients.map((item, i) => {
                            return (
                                <li key={'ingredient' + i}>{item}</li>
                            );
                        })
                    }
                </ul>
                <h5>Steps</h5>
                <ul>
                    {
                        steps.map((item, i) => {
                            return (
                                <li key={'step' + i}>{item}</li>
                            );
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
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
});

const RecipeTable = React.createClass({
    handleClick: function (evt) {
        evt.preventDefault();
        this.props.needscope.onViewRecipeDetail(parseFloat(evt.target.id));
        evt.target.blur();
    },
    render: function () {
        let data = this.props.data;

        return (
            <div class="table-wrap">
                <table class="table">
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
                                            href="#"
                                            onClick={this.handleClick}>View
                                        </a>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
});

const LoadingSpinner = React.createClass({
    render: function () {
        return (
            <div id="loading">
                <i className="fa fa-cog fa-spin"></i> loading...
            </div>
        )
    }
});

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
        // TODO: make error component and use for ALL errors
        tab = ( <div>{portfolio.error.message}</div>);
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
