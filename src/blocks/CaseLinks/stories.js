import * as React from 'react'
import CaseLinks from './CaseLinks'
import mock from './mock'

export default {
  title: 'Blocks/CaseLinks',
  component: CaseLinks,
}

const Template = (args) => <CaseLinks {...args} />

export const Default = Template.bind({})
Default.args = mock
