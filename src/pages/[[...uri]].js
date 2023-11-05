import * as React from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { getPage, usePreviewSubscription, filterDataToSingleItem } from '~/api/sanity'
import { createRenderBlock, nextUriToString } from '~/utils'
import * as blockVariants from '~/blocks'

const renderBlock = createRenderBlock(blockVariants)

function Page(props) {
  const { data, preview } = props
  const router = useRouter()
  const filterTags = router?.query?.tags

  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.params ?? {},
    initialData: data?.page,
    enabled: preview,
  })

  const page = filterDataToSingleItem(previewData, preview)

  const { blocks, seo } = page || {}

  React.useLayoutEffect(() => {
    const hash = window.location.hash

    if (hash) {
      const element = document.getElementById(hash.slice(1))
      if (element) {
        element.scrollIntoView()
      }
    }
  }, [])

  return (
    <React.Fragment>
      <Head>{<title>{seo?.title}</title>}</Head>
      {blocks?.map((block, idx) => renderBlock(block, idx, null, filterTags))}
    </React.Fragment>
  )
}

Page.propTypes = {
  data: PropTypes.array,
  preview: PropTypes.bool.isRequired,
}

export async function getStaticProps(ctx) {
  const {
    params: { uri },
    preview = false,
  } = ctx

  const uriString = uri ? nextUriToString(uri) : ''

  const queryResult = await getPage(uriString, preview)

  const { page, query, params } = queryResult

  if (queryResult) {
    return {
      props: {
        data: {
          page,
          query,
          params,
        },
        preview,
      },
      revalidate: 60,
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
