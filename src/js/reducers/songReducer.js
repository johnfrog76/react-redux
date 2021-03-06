
export default function reducer (state = {
  songitems: [],
  fetching: false,
  fetched: false,
  isActive: false,
  cache: null,
  error: null
}, action) {
  switch (action.type) {
    case 'CLEAR_SONGS': {
      return {...state, fetching: false, fetched: false, isActive: false, error: null, songitems: []}
    }
    case 'INACTIVE_SONGS': {
      return {...state, fetching: false, fetched: false, isActive: false, error: null}
    }
    case 'FETCH_SONGS_PENDING': {
      return {...state, isActive: true, fetching: true}
    }
    case 'FETCH_SONGS_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'DISPLAY_SONGS': {
      return {
        ...state,
        fetching: false,
        isActive: true,
        fetched: true
      }
    }
    case 'FETCH_SONGS_FULFILLED': {
      let d = new Date()
      let myVal = d.getTime()

      return {
        ...state,
        fetching: false,
        isActive: true,
        fetched: true,
        cache: myVal,
        songitems: action.payload
      }
    }
    case 'PAUSE_ALL_SONGS': {
      let i
      let newSongs = state.songitems.slice(0)
      let len = newSongs.length

      for (i = 0; i < len; i++) {
        newSongs[i].playing = false
      }

      return {
        ...state,
        fetching: false,
        isActive: true,
        fetched: true,
        songitems: newSongs
      }
    }
    case 'UPDATE_SONG': {
      let payload = action.payload
      let pos = payload.pos
      let isPlaying = payload.playing
      let playPos = payload.playPos
      let newSongs = state.songitems.slice(0)
      let song = newSongs[pos]

      if (isPlaying === true) {
        song.playPos = playPos
      }

      song.playing = isPlaying

      return {
        ...state,
        fetching: false,
        isActive: true,
        fetched: true,
        songitems: newSongs
      }
    }
  }

  return state
}
