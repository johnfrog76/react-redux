import React from 'react'

class FiddlesJS extends React.Component {
  constructor () {
    super()
  }
  render () {
    let data = this.props.data

    return (
      <div>
        <h1>Fiddles</h1>
        <div className='fiddle'>
          {
            data.map((item, i) => {
              let colors = ['#AFB42B', '#4CAF50', '#009688', '#00BCD4']
              let pageIndex = i % colors.length
              let styleColor = {
                color: colors[pageIndex]
              }
              let backgroundStyle = {
                backgroundColor: colors[pageIndex],
                padding: '10px 10px 5px 10px',
                marginBottom: '2.5rem'
              }
              let groupClass = 'group' + i
              let headingID = 'heading' + item.id
              let heading = item.fiddles.length === 0 ? null
                  : <h2 id={headingID} style={styleColor}>{item.name}</h2>
              let fiddles = item.fiddles.map(function (fiddle, n) {
                let str = '//jsfiddle.net/' + fiddle.fiddle +
                '/embedded/result,js,html,css/dark/'
                return (
                  <div key={n} className='fiddle-item' style={backgroundStyle}>
                    <h3>{fiddle.title}</h3>
                    <p>{fiddle.description}</p>
                    <div className='fiddle-wrap'>
                      <iframe
                        width='100%'
                        height='500'
                        src={str}
                        scrolling='yes'
                       />
                    </div>
                  </div>
                )
              })

              return (
                <div key={i} className={groupClass}>
                  {heading}
                  <div>{fiddles}</div>
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
  FiddlesJS
}
