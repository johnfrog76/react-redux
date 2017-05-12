
import React from "react";
import {ProgressBar} from 'react-bootstrap';

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
        e.target.blur();
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

class ViewSongs extends React.Component {
    constructor() {
        super();
        this.handlePlay = this._handlePlay.bind(this);
        this.handlePause = this._handlePause.bind(this);
        this.pauseAll = this._pauseAll.bind(this);
        this.increment = this._increment.bind(this);
        this.setInt = this._setInt.bind(this);
        this.clearInt = this._clearInt.bind(this);

    }
    _increment(ele, progEle, pos) {
        let p = Math.round(ele.currentTime / ele.duration * 100);
        let retObj = {
            pos: pos,
            playPos: p,
            playing: true
        };

        if (p < 100) {
            this.props.layout.updateSong(retObj);
        } else {
            retObj.playPos = 0;
            retObj.playing = false;
            this.props.layout.updateSong(retObj);
            this.clearInt();
        }
    }
    _clearInt() {
        if (this.myInterval) {
            clearInterval(this.myInterval);
        }
    }
    _setInt(ele, progEle, pos) {
        let self = this;
        this.clearInt();
        this.myInterval = setInterval(function(){ self.increment(ele, progEle, pos) }, 500);
    }
    _pauseAll() {
        let i;
        let items = document.getElementsByTagName('audio')
        let len = items.length;

        for (i = 0; i < len; i++) {
            items[i].pause();
        }

        this.props.layout.pauseAllSongs();
    }
    _handlePlay(e) {
        let ele = e.target.parentElement.firstElementChild;
        let progEle = e.target.previousElementSibling.firstChild;
        let pos = parseFloat(e.target.id.replace('play', ''));
        let retObj = {
            pos: pos,
            playPos: 0,
            playing: true
        };
        e.preventDefault();
        e.target.blur();
        this.pauseAll();
        ele.play();
        this.setInt(ele, progEle, pos);
        this.props.layout.updateSong(retObj);
    }
    _handlePause(e) {
        let pos = parseFloat(e.target.id.replace('pause', ''));
        let retObj = {
            pos: pos,
            playing: false
        };
        e.preventDefault();
        e.target.blur();
        e.target.parentElement.firstElementChild.pause();
        this.clearInt();
        this.props.layout.updateSong(retObj);
    }
    render() {
        const data = this.props.data;

        return (
            <div className="songs">
                <h5>Songs</h5>
                <ul>
                    {
                        data.map((item, i) => {
                            const mySrc = 'http://katie.sbtest.com/upload/' + item.audioclip;
                            let playClass = item.playing ? 'hidden' : 'btn btn-xs fa fa-play';
                            let pauseClass = item.playing ? 'btn btn-xs fa fa-pause' : 'hidden';

                            return (
                                <li key={'song' + i}>
                                    <audio id={'audio' + item.id} preload="auto">
                                        <source
                                            src={mySrc}
                                            type="audio/mpeg"
                                        />
                                            Your browser does not support the audio element.
                                    </audio>
                                    <div className="song-title">{item.title}</div>
                                    <ProgressBar id={'progress' + item.id} now={item.playPos} />
                                    <button
                                        id={'play' + i}
                                        onClick={this.handlePlay}
                                        className={playClass}
                                    >
                                    </button>
                                    <button
                                        id={'pause' + i}
                                        onClick={this.handlePause}
                                        className={pauseClass}
                                    >
                                    </button>
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
    ErrorComponent,
    ViewSongs
}
