/* global test expect */
import React from 'react'
import {Portfolio} from '../components/Portfolio'
import renderer from 'react-test-renderer'

test('Testing Snapshot of Portfolio component', () => {
  const mockData = [{
    'id': 1,
    'name': 'typography',
    'images': [{
      'id': 4,
      'img': 'cautiousReckless.png',
      'caption': 'Cautious / Reckless typography',
      'active': true,
      'order': 1,
      'cat_id': 1
    },
    {
      'id': 30,
      'img': 'wtoFoot.png',
      'caption': 'WTO type composition',
      'active': true,
      'order': 1,
      'cat_id': 1
    }]
  }]

  const component = renderer.create(<Portfolio data={mockData} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
