import dynamic from 'next/dynamic'

export const ArticleSlideshow = dynamic(() => import(/* webpackChunkName: "blocks/ArticleSlideshow" */ './ArticleSlideshow')) // prettier-ignore
export const Case = dynamic(() => import(/* webpackChunkName: "blocks/Case" */ './Case')) // prettier-ignore
export const Contact = dynamic(() => import(/* webpackChunkName: "blocks/Contact" */ './Contact')) // prettier-ignore
export const Content = dynamic(() => import(/* webpackChunkName: "blocks/Content" */ './Content')) // prettier-ignore
export const DynamicContent = dynamic(() => import(/* webpackChunkName: "blocks/DynamicContent" */ './DynamicContent')) // prettier-ignore
export const Filter = dynamic(() => import(/* webpackChunkName: "blocks/Filter" */ './Filter')) // prettier-ignore
export const Heading = dynamic(() => import(/* webpackChunkName: "blocks/Heading" */ './Heading')) // prettier-ignore
export const Hero = dynamic(() => import(/* webpackChunkName: "blocks/Hero" */ './Hero')) // prettier-ignore
export const LinkedMediaGrid = dynamic(() => import(/* webpackChunkName: "blocks/LinkedMediaGrid" */ './LinkedMediaGrid')) // prettier-ignore
export const Media = dynamic(() => import(/* webpackChunkName: "blocks/Media" */ './Media')) // prettier-ignore
export const MediaGrid = dynamic(() => import(/* webpackChunkName: "blocks/MediaGrid" */ './MediaGrid')) // prettier-ignore
