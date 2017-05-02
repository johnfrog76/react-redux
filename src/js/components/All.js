
import React from "react";

class LoadingSpinner extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="loading">
              <i className="fa fa-cog fa-spin"></i> loading...
            </div>
        )
    }
}

class ErrorComponent extends React.Component {
    constructor() {
        super();
    }
    render() {
        let data = this.props.data;
        return (
            <div class="error">
                <i class="fa fa-warning"></i> {data}
            </div>
        )
    }
}

class Portfolio extends React.Component {
    constructor() {
        super();
    }
    render() {
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
}

class LoginForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this._handleSubmit.bind(this);
    }
    _handleSubmit (e) {
        e.preventDefault();
        let user = e.target.elements.user.value.trim();
        let pass = e.target.elements.pass.value.trim();

        if (!user || !pass) {
            return;
        }

        return this.props.layout.fetchSession({user: user, pass: pass});
    }
    render () {
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
}

class RecipeTable extends React.Component {
    constructor() {
        super();
        this.handleClick = this._handleClick.bind(this);
    }
    _handleClick (evt) {
        evt.preventDefault();
        this.props.layout.onViewRecipeDetail(parseFloat(evt.target.id));
        evt.target.blur();
    }
    render() {
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
}

class RecipeViewDetails extends React.Component {
    constructor() {
        super();
        this.handleClick = this._handleClick.bind(this);
    }
    _handleClick(e) {
        e.preventDefault();
        this.props.layout.fetchRecipes(e);
    }
    render() {
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
}

class FiddlesJS extends React.Component {
    constructor() {
        super();
    }
    render() {
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
}


export {
    LoadingSpinner,
    Portfolio,
    FiddlesJS,
    LoginForm,
    RecipeTable,
    RecipeViewDetails,
    ErrorComponent
}
