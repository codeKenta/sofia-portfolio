import * as React from 'react'
import MediaGrid from './MediaGrid'
import mock from './mock'

export default {
  title: 'Blocks/MediaGrid',
  component: MediaGrid,
}

const Template = (args) => <MediaGrid {...args} />

export const Default = Template.bind({})
Default.args = mock
