import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { getPage } from '~/api/sanity'
import { createRenderBlock, nextUriToString } from '~/utils'
import * as blockVariants from '~/blocks'

const renderBlock = createRenderBlock(blockVariants)

function Page(props) {
  const { seo, blocks } = props

  return (
    <React.Fragment>
      <Head>
        <title>{seo?.title}</title>
      </Head>
      {blocks?.map((block, idx) => renderBlock(block, idx))}
    </React.Fragment>
  )
}

Page.propTypes = {
  blocks: PropTypes.array,
  seo: PropTypes.object,
}

export async function getStaticProps(ctx) {
  const {
    params: { uri },
  } = ctx

  const uriString = uri ? nextUriToString(uri) : ''
  const result = await getPage(uriString)

  if (result) {
    const { blocks, seo } = result || {}

    return {
      props: {
        seo,
        blocks,
        uriString,
      },
    }
  }
  return { notFound: true }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default Page
