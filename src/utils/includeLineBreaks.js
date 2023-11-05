import React from 'react'

/*
 *-* is a special character that is used to indicate where a hyphen line break should be inserted.
 * is a special character that is used to indicate where a hard line break should be inserted. (no ihyphen)
 */
const includeLineBreaks = (str = '') =>
  str
    .replace('*-*', '\u00AD')
    ?.split(/(\*)/g)
    .map((part) => (part === '*' ? <br /> : part))

export default includeLineBreaks
