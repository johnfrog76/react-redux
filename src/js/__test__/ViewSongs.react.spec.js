/* global it, describe, expect */
import React from 'react'
import {shallow} from 'enzyme'
import {ViewSongs} from '../components/ViewSongs'
import renderer from 'react-test-renderer'

describe('<ViewSongs />', () => {
  const mockData = [{
    active: true,
    audioclip: 'there_will_never_be_another_you.mp3',
    id: '13',
    order: '6',
    playPos: 0,
    playing: false,
    title: 'There Will Never Be Another You',
    youtube: 'n/a'
  }]
  const wrapper = shallow(<ViewSongs layout='' data={mockData} />)

  it('wrapper has class songs', () => {
    expect(wrapper.hasClass('songs')).toBe(true)
  })

  it('data song title matches component song title', () => {
    expect(wrapper.find('div.song-title').text()).toBe(mockData[0].title)
  })
})
