import S from '@sanity/desk-tool/structure-builder'

const pages = S.listItem().title('Pages').child(S.documentTypeList('page'))
const settings = S.listItem()
  .title('Site settings')
  .child(S.document().schemaType('siteSettings').documentId('siteSettings'))

export default () => S.list().title('Content').items([pages, settings])
