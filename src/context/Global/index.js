import * as React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

export const GlobalStateContext = React.createContext({})
export const GlobalHandlersContext = React.createContext({})

if (process.env.NODE_ENV !== 'production') {
  GlobalStateContext.displayName = 'GlobalStateContext'
  GlobalHandlersContext.displayName = 'GlobalHandlersContext'
}

export function useGlobalState() {
  return React.useContext(GlobalStateContext)
}

export function useGlobalHandlers() {
  return React.useContext(GlobalHandlersContext)
}

const COOKIE_CONSENT_ID = 'cookie-consent'
const COOKIE_BAR_ENTER_DELAY = 2000

function GlobalProvider(props) {
  const { children } = props

  const [isCookieBarOpen, setCookieBarOpen] = React.useState(false)

  const [isNavMenuOpen, setNavMenuOpen] = React.useState(false)

  // Helpers

  const closeAllMenus = () => {
    setNavMenuOpen(false)
  }

  // Mount hook

  React.useEffect(() => {
    const handleRouteChangeStart = () => {
      closeAllMenus()
    }

    if (!localStorage?.getItem(COOKIE_CONSENT_ID)) {
      setTimeout(() => {
        setCookieBarOpen(true)
      }, COOKIE_BAR_ENTER_DELAY)
    }

    Router.events.on('routeChangeStart', handleRouteChangeStart)
    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [])

  // Public handlers

  const onNavMenuToggle = React.useCallback(() => {
    setNavMenuOpen((prev) => !prev)
  }, [])

  const onNavMenuClose = React.useCallback(() => {
    setNavMenuOpen(false)
  }, [])

  const onCookieBarClose = React.useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_ID, 1)
    setCookieBarOpen(false)
  }, [])

  const stateContextValue = React.useMemo(
    () => ({
      isCookieBarOpen,

      isNavMenuOpen,
      // Computed props
      isSomeMenuOpen: isNavMenuOpen,
    }),
    [isCookieBarOpen, isNavMenuOpen],
  )

  const handlersContextValue = React.useMemo(
    () => ({
      onCookieBarClose,
      onNavMenuClose,
      onNavMenuToggle,
    }),
    [onCookieBarClose, onNavMenuClose, onNavMenuToggle],
  )

  return (
    <GlobalStateContext.Provider value={stateContextValue}>
      <GlobalHandlersContext.Provider value={handlersContextValue}>
        {children}
      </GlobalHandlersContext.Provider>
    </GlobalStateContext.Provider>
  )
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GlobalProvider
