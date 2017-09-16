/* global test expect */
import React from 'react'
import {FiddlesJS} from '../components/Fiddles'
import renderer from 'react-test-renderer'

test('Testing Snapshot of FiddlesJS component', () => {
  const mockData = [{
    'id': 1,
    'name': 'Data Structures',
    'fiddles': [{
      'id': 1,
      'fiddle': '3e1753dw',
      'title': 'Singly Linked List',
      'description': 'Add, List and Remove items from linked list.',
      'active': true,
      'order': 1,
      'cat_id': 1
    }]
  }]

  const component = renderer.create(<FiddlesJS data={mockData} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
