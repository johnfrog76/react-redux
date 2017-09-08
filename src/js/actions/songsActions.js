import axios from 'axios'

export function fetchSongs () {
  return function (dispatch) {
    axios.get('http://katie.sbtest.com/api/index.php?mode=songs')
      .then((response) => {
        let len = response.data.length
        let i
        let retArray = []
        let item

          // add additional props
        for (i = 0; i < len; i++) {
          item = response.data[i]
          item.playing = false
          item.playPos = 0
          retArray.push(item)
        }

        dispatch({type: 'FETCH_SONGS_FULFILLED', payload: retArray})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_SONGS_REJECTED', payload: err})
      })
  }
}

export function songProgress (song) {
  return function (dispatch) {
    dispatch({type: 'SONG_PROGRESS', payload: song})
  }
}

export function pauseAllSongs () {
  return function (dispatch) {
    dispatch({type: 'PAUSE_ALL_SONGS'})
  }
}

export function updateSong (song) {
  return function (dispatch) {
    dispatch({type: 'UPDATE_SONG', payload: song})
  }
}

export function clearSongs () {
  return function (dispatch) {
    dispatch({type: 'CLEAR_SONGS'})
  }
}
