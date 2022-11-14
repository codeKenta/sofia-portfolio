import * as React from 'react'
import { FormField } from '@sanity/base/components'
import { withDocument } from 'part:@sanity/form-builder'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import CreatableSelect from 'react-select/creatable'
import sanityClient from '../utils/sanityClient'

const SectionLinkInput = React.forwardRef((props, ref) => {
  const {
    type,
    value: valueProp,
    markers,
    presence,
    compareValue,
    onChange,
    parent,
    document,
  } = props

  const [options, setOptions] = React.useState([])

  const pageLinkRef = parent?.link?.reference?._ref

  const value = valueProp?.section
    ? { label: valueProp.section, value: valueProp.section }
    : options.find((option) => option.value === valueProp?.section)

  React.useEffect(() => {
    const currentDocumentId = document?._id

    const query = `*[
      _id == $pageLinkRef]{
        blocks[]
      }[0]`

    sanityClient
      .fetch(query, {
        pageLinkRef,
        currentDocumentId,
      })
      .then((results) => {
        const filteredBlocks = results?.blocks?.filter(({ id }) => id)

        const ids = filteredBlocks.map(({ _type, id, heading }) => ({
          label: `${heading || ''}(${_type})`,
          value: id,
        }))

        setOptions(ids)
      })
      .catch((err) => console.log('ERROR, err', err))
  }, [pageLinkRef])

  const handleAutocompleteChange = React.useCallback(
    (event, meta) => {
      const { action } = meta
      const newValue = event?.value

      switch (action) {
        case 'select-option':
          // value exists among options, it's a reference
          onChange(PatchEvent.from(set({ _type: 'sectionLink', section: newValue })))
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
      id="SectionLinkInput-id"
    >
      <CreatableSelect
        isClearable
        inputId="SectionLinkInput-id"
        styles={{ control: (styles) => ({ ...styles, borderRadius: 0 }) }}
        options={options}
        onChange={handleAutocompleteChange}
        value={value}
      />
    </FormField>
  )
})

export default withDocument(SectionLinkInput)
