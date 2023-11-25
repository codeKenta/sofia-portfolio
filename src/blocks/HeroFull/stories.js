import * as React from 'react'
import HeroFull from './HeroFull'
import mock from './mock'

export default {
  title: 'Blocks/HeroFull',
  component: HeroFull,
}

const Template = (args) => <HeroFull {...args} />

export const Default = Template.bind({})
Default.args = mock
