import * as React from 'react'
import mock from './mock'
import Filter from './Filter'

export default {
  title: 'Blocks/Filter',
  component: Filter,
}

const Template = (args) => <Filter {...args} />

export const Default = Template.bind({})
Default.args = mock
