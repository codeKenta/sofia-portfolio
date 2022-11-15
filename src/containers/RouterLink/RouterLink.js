import * as React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGlobalHandlers } from '~/context'

const RouterLink = React.forwardRef(function RouterLink(props, ref) {
  const { as, children, external, href = '', replace, scroll, shallow, ...other } = props
  const { onNavMenuClose } = useGlobalHandlers()

  const cleanUpHref = href?.replace('//', '/')
  const { asPath } = useRouter()
  const isSamePage = cleanUpHref?.split('#')?.shift() === asPath

  // link to section on the same page
  if (cleanUpHref.includes('#') && isSamePage) {
    return (
      <a onClick={onNavMenuClose} href={cleanUpHref} ref={ref} {...other}>
        {children}
      </a>
    )
  }

  // Render as a regular `a` tag if external link.
  if (external || /^https?:\/\//.test(cleanUpHref)) {
    return (
      <a href={cleanUpHref} rel="noopener noreferrer" target="_blank" ref={ref} {...other}>
        {children}
      </a>
    )
  }

  return (
    <Link as={as} href={cleanUpHref} replace={replace} scroll={scroll} shallow={shallow} passHref>
      <a ref={ref} {...other}>
        {children}
      </a>
    </Link>
  )
})

RouterLink.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  external: PropTypes.bool,
  href: PropTypes.string.isRequired,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
}

export default RouterLink
