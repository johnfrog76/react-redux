import React from 'react'
import {ProgressBar} from 'react-bootstrap'

class ViewSongs extends React.Component {
  constructor () {
    super()
    this.handlePlay = this._handlePlay.bind(this)
    this.handlePause = this._handlePause.bind(this)
    this.pauseAll = this._pauseAll.bind(this)
    this.increment = this._increment.bind(this)
    this.setInt = this._setInt.bind(this)
    this.clearInt = this._clearInt.bind(this)
  }
  _increment (ele, progEle, pos) {
    let p = Math.round(ele.currentTime / ele.duration * 100)
    let retObj = {
      pos: pos,
      playPos: p,
      playing: true
    }

    if (p < 100) {
      this.props.layout.updateSong(retObj)
    } else {
      retObj.playPos = 0
      retObj.playing = false
      this.props.layout.updateSong(retObj)
      this.clearInt()
    }
  }
  _clearInt () {
    if (this.myInterval) {
      clearInterval(this.myInterval)
    }
  }
  _setInt (ele, progEle, pos) {
    let self = this
    this.clearInt()
    this.myInterval = setInterval(function () {
        // TODO: do this another way
      if (document.getElementById(ele.id)) {
        self.increment(ele, progEle, pos)
      } else {
        self.clearInt()
      }
    }, 1000)
  }
  _pauseAll () {
    let i
    let items = document.getElementsByTagName('audio')
    let len = items.length

    for (i = 0; i < len; i++) {
      items[i].pause()
    }

    this.props.layout.pauseAllSongs()
  }
  _handlePlay (e) {
    let ele = e.target.parentElement.firstElementChild
    let progEle = e.target.previousElementSibling.firstChild
    let pos = parseFloat(e.target.id.replace('play', ''))
    let retObj = {
      pos: pos,
      playPos: 0,
      playing: true
    }
    e.preventDefault()
    e.target.blur()
    this.pauseAll()
    ele.play()
    this.setInt(ele, progEle, pos)
    this.props.layout.updateSong(retObj)
  }
  _handlePause (e) {
    let pos = parseFloat(e.target.id.replace('pause', ''))
    let retObj = {
      pos: pos,
      playing: false
    }
    e.preventDefault()
    e.target.blur()
    e.target.parentElement.firstElementChild.pause()
    this.clearInt()
    this.props.layout.updateSong(retObj)
  }
  render () {
    const data = this.props.data

    return (
      <div className='songs'>
        <h1>Songs</h1>
        <ul>
          {
            data.map((item, i) => {
              const mySrc = 'http://katie.sbtest.com/upload/' + item.audioclip
              let playClass = item.playing ? 'hidden' : 'btn btn-xs fa fa-play'
              let pauseClass = item.playing ? 'btn btn-xs fa fa-pause' : 'hidden'

              return (
                <li key={'song' + i}>
                  <audio id={'audio' + item.id} preload='auto'>
                    <source
                      src={mySrc}
                      type='audio/mpeg'
                      />
                      Your browser does not support the audio element.
                  </audio>
                  <div className='song-title'>{item.title}</div>
                  <ProgressBar id={'progress' + item.id} now={item.playPos} />
                  <button
                    id={'play' + i}
                    onClick={this.handlePlay}
                    className={playClass}
                  />
                  <button
                    id={'pause' + i}
                    onClick={this.handlePause}
                    className={pauseClass}
                  />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export {
  ViewSongs
}
