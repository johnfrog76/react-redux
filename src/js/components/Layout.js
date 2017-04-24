import React from "react"
import { connect } from "react-redux"

//import { fetchUser } from "../actions/userActions"
//import { fetchTweets } from "../actions/tweetsActions"
import {fetchPortfolio} from "../actions/portfolioActions"
import {clearPortfolio} from "../actions/portfolioActions"

import {fetchFiddles} from "../actions/fiddleActions"
import {clearFiddles} from "../actions/fiddleActions"


const Footer = React.createClass({
    render: function () {
        return (
            <footer>
                <div>
                    <a href="#">Contact</a>&nbsp;/&nbsp;
                    <a href="#">About</a>&nbsp;/&nbsp;
                    <a href="#">Portfolio</a>&nbsp;/&nbsp;
                    <a href="#" onClick={this.props.data.fetchTweets.bind(this)}>Fiddles</a>&nbsp;/&nbsp;
                    <a href="#">Recipes</a>
                </div>
            </footer>
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
    // user: store.user.user,
    // userFetched: store.user.fetched,
    // tweets: store.tweets.tweets,
    portfolio: store.portfolio,
    fiddles: store.fiddles
  };
})

export default class Layout extends React.Component {
  componentWillMount() {
    //this.props.dispatch(fetchUser())
     this.props.dispatch(fetchPortfolio())
  }

  fetchPortfolio(e) {
    e.preventDefault();
    e.target.blur();
    this.props.dispatch(clearFiddles())
    this.props.dispatch(fetchPortfolio())
  }

  isActive(value) {
     return value ? 'active' : '';
  }

  fetchFiddles(e) {
    e.preventDefault();
    e.target.blur();
    this.props.dispatch(clearPortfolio())
    this.props.dispatch(fetchFiddles())
  }

  render() {
    const { portfolio, fiddles } = this.props;
    let tab = <LoadingSpinner />

    if (fiddles.fetched) {
        tab = <FiddlesJS data={fiddles.fiddleitems} />
    } else if (fiddles.fetching) {
        tab = <LoadingSpinner />
    } else if (portfolio.fetched) {
        tab = <Portfolio data={portfolio.portfolioitems} />;
    } else if (portfolio.error) {
        tab = ( <div>{portfolio.error.message}</div>);
    }

    return <div>
        <nav>
            <div>
                <a href="#" className={this.isActive(this.props.portfolio.isActive)} onClick={this.fetchPortfolio.bind(this)}>Portfolio</a>&nbsp;/&nbsp;
                <a href="#" className={this.isActive(this.props.fiddles.isActive)} onClick={this.fetchFiddles.bind(this)}>Fiddles</a>
            </div>
        </nav>
         {tab}
     </div>
  }
}
