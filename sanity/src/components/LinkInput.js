import * as React from 'react'
import { FormField } from '@sanity/base/components'
import { withDocument } from 'part:@sanity/form-builder'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import CreatableSelect from 'react-select/creatable'
import sanityClient from '../utils/sanityClient'

/*
SOURCE: CAKE
*/

const LinkInput = React.forwardRef((props, ref) => {
  const { type, value: valueProp, markers, presence, compareValue, onChange, document } = props

  const [options, setOptions] = React.useState([])

  const value = valueProp?.url
    ? { label: valueProp.url, value: valueProp.url }
    : options.find((option) => option.value === valueProp?.reference?._ref)

  React.useEffect(() => {
    const currentDocumentId = document?._id

    // query for all pages that are not drafts

    const query = `*[
      _type == 'page' && _id != $currentDocumentId &&
      slug != null && !(_id in path("drafts.**"))] | order(slug.current asc)`

    sanityClient
      .fetch(query, {
        currentDocumentId,
      })
      .then((results) => {
        const ids = results.map((result) => ({ label: result?.slug?.current, value: result._id }))

        setOptions(ids)
      })
      .catch((err) => console.log('ERROR, err', err))
  }, [])

  const handleAutocompleteChange = React.useCallback(
    (event, meta) => {
      const { action } = meta
      const newValue = event?.value

      switch (action) {
        case 'select-option':
          // value exists among options, it's a reference
          onChange(
            PatchEvent.from(
              set({ _type: 'link', reference: { _ref: newValue, _type: 'reference' } }),
            ),
          )
          break
        case 'create-option':
          {
            // it's a string value, not a reference
            // prefix value with / if it doesn't exist and isn't an external link
            const isExternal = newValue.search(/^(?:(?:www)|(?:http)|(?:https))|(?:#)/) !== -1
            const valueWithSlash = newValue.search(/^\//) === -1 ? `/${newValue}` : newValue
            onChange(
              PatchEvent.from(set({ _type: 'link', url: isExternal ? newValue : valueWithSlash })),
            )
          }
          break
        case 'clear':
          onChange(PatchEvent.from(unset()))
          break
        default:
          break
      }
    },
    [onChange],
  )

  return (
    <FormField
      description={type.description}
      title={type.title}
      __unstable_markers={markers}
      __unstable_presence={presence}
      compareValue={compareValue}
      id="LinkInput-id"
    >
      <CreatableSelect
        isClearable
        inputId="LinkInput-id"
        styles={{ control: (styles) => ({ ...styles, borderRadius: 0 }) }}
        options={options}
        onChange={handleAutocompleteChange}
        value={value}
      />
    </FormField>
  )
})

export default withDocument(LinkInput)
