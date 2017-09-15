
import React from 'react'
import {ViewSongs} from '../components/ViewSongs'
import renderer from 'react-test-renderer'

test('Testing Snapshot of ViewSongs component', () => {
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

  const component = renderer.create(
    <ViewSongs layout='' data={mockData} />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
