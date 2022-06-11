import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import * as documents from './documents'
import * as blocks from './blocks'
import * as objects from './objects'

// transform all schema imports into arrays and add them to the main schema
const allDocuments = Object.values(documents)
const allBlocks = Object.values(blocks)
const allObjects = Object.values(objects)

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...allDocuments, ...allBlocks, ...allObjects]),
})
