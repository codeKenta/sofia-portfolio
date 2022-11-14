import React from 'react'

const includeLineBreaks = (str) => str.split(/(\*)/g).map((part) => (part === '*' ? <br /> : part))

export default includeLineBreaks
