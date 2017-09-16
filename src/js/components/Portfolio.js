import React from 'react'

class Portfolio extends React.Component {
  constructor () {
    super()
  }
  render () {
    let data = this.props.data
    return (
      <div>
        <h1>Portfolio</h1>
        <div className='portfolio'>
          {
            data.map((item, i) => {
              let headingID = 'heading' + item.id
              let photos = item.images.map(function (image, n) {
                let str = 'http://sbtest.com/portfolio/images/' + image.img
                return (
                  <div key={n} className='photo-item'>
                    <img src={str} />
                    <figcaption>{image.caption}</figcaption>
                  </div>
                )
              })

              return (
                <div key={i}>
                  <h2 id={headingID}>{item.name}</h2>
                  <div>{photos}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export {
  Portfolio
}
