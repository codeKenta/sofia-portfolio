import * as React from 'react'
import MediaRow from './MediaRow'
import mock from './mock'

export default {
  title: 'Blocks/MediaRow',
  component: MediaRow,
}

const Template = (args) => <MediaRow {...args} />

export const Default = Template.bind({})
Default.args = mock
