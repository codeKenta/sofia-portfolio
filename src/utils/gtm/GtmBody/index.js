import React from 'react'
import PropTypes from 'prop-types'

const GtmBody = ({ gtmId }) => (
  <noscript>
    <iframe
      title="gtm"
      src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
      height={0}
      width={0}
      style={{ display: 'none' }}
    />
  </noscript>
)

GtmBody.propTypes = {
  gtmId: PropTypes.string.isRequired,
}

GtmBody.uiName = 'GtmBody'

export default GtmBody
