import * as React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { styled } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import { Collapse, Link } from '@mui/material'
import { menuItemType } from '~/api'
import { Add as AddIcon, Remove as RemoveIcon } from '~/components/icons'
import RouterLink from '../../RouterLink'

const AppNavDrawerListItemItem = styled('li', {
  name: 'AppNavDrawerListItem',
  slot: 'Item',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  paddingLeft: 'calc(32px * var(--level))', // Medium icon size + theme.spacing(1)
}))

const AppNavDrawerListItemLink = styled(Link, {
  name: 'AppNavDrawerListItem',
  slot: 'Link',
})(() => ({
  display: 'inherit',
  alignItems: 'inherit',
  fontSize: 16,
  textTransform: 'uppercase',
  // 'ul &': theme.typography.caption,
  // 'ul ul &': theme.typography.caption,
}))

const AppNavDrawerListItemList = styled('ul', {
  name: 'AppNavDrawerListItem',
  slot: 'List',
})(({ theme }) => ({ margin: theme.spacing(1, 0, 2) }))

function AppNavDrawerListItem(props) {
  const { level = 0, menuLink } = props

  const [expanded, setExpanded] = React.useState(false)
  const handleClick = React.useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  const { asPath } = useRouter()
  const theme = useTheme()

  const matchPath = menuLink.url === asPath

  const submenu = menuLink.items
  const hasSubmenu = submenu?.length > 0
  const Icon = expanded ? RemoveIcon : AddIcon

  const LinkProps = {}
  if (hasSubmenu) {
    LinkProps.component = 'button'
    LinkProps.type = 'button'
    LinkProps.onClick = handleClick
  } else if (menuLink.url) {
    LinkProps.component = RouterLink
    LinkProps.href = menuLink.url
  }

  return (
    <React.Fragment>
      <AppNavDrawerListItemItem style={{ '--level': level }}>
        <AppNavDrawerListItemLink
          sx={{
            color: matchPath ? theme?.palette?.common?.red : 'inherit',
          }}
          {...LinkProps}
        >
          {hasSubmenu && <Icon sx={{ mr: 1 }} />}
          <span>{menuLink.label}</span>
        </AppNavDrawerListItemLink>
      </AppNavDrawerListItemItem>

      {hasSubmenu && (
        <Collapse in={expanded} component="li" timeout="auto" unmountOnExit>
          <AppNavDrawerListItemList>
            {submenu.map((submenuLink, idx) => (
              <AppNavDrawerListItem key={idx} level={level + 1} menuLink={submenuLink} />
            ))}
          </AppNavDrawerListItemList>
        </Collapse>
      )}
    </React.Fragment>
  )
}

AppNavDrawerListItem.propTypes = {
  level: PropTypes.number,
  menuLink: menuItemType.isRequired,
}

export default AppNavDrawerListItem
