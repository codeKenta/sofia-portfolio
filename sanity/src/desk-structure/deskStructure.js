import S from '@sanity/desk-tool/structure-builder'
import resolvePreviewUrl from '../utils/resolvePreviewUrl'
import Iframe from 'sanity-plugin-iframe-pane'

export const getDefaultDocumentNode = () => {
  return S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: (doc) => resolvePreviewUrl(doc),
      })
      .title('Preview'),
  ])
}

const pages = S.listItem().title('Pages').child(S.documentTypeList('page'))
const settings = S.listItem()
  .title('Site settings')
  .child(S.document().schemaType('siteSettings').documentId('siteSettings'))

export default () => S.list().title('Content').items([pages, settings])
