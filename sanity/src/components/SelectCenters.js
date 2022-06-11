import * as React from 'react'
import { Card, Stack, Select } from '@sanity/ui'
import { FormField } from '@sanity/base/components'
import { useId } from '@reach/auto-id'
import { useRouter } from '@sanity/base/router'
import PatchEvent, { unset } from '@sanity/form-builder/PatchEvent'
import sanityClient from '../utils/sanityClient'
import padelClient from '../utils/padelClient'

const PadelSelect = React.forwardRef((props, ref) => {
  const {
    type, // Schema information
    value, // Current field value
    readOnly, // Boolean if field is not editable
    markers, // Markers including validation rules
    presence, // Presence information for collaborative avatars
    compareValue, // Value to check for "edited" functionality
    onFocus, // Method to handle focus state
    onBlur, // Method to handle blur state
    onChange, // Method to handle patch events
    parent,
  } = props

  const { _id: documentId } = parent

  // const {
  //   padelApi: { client: padelClient, methodName, fields: padelApiFields },
  // } = type

  const inputId = useId()

  const { navigateUrl } = useRouter()
  const [options, setOptions] = React.useState([])

  const padelApiFields = ['name']

  const mutateAndNavigate = React.useCallback(
    async (doc) => {
      let result = null

      if (documentId) {
        const { _type, ...patchFields } = doc
        result = await sanityClient
          .patch(documentId)
          .set({
            ...patchFields,
          })
          .commit()
      } else {
        result = await sanityClient.create(doc)
      }

      let url = ''

      if (parent._type === 'center') {
        url = `${result._type}s;${result._id}`
      }
      navigateUrl(url)
    },
    [navigateUrl, documentId],
  )

  // Creates a change handler for patching data
  const handleChange = React.useCallback(
    (event) => {
      const value = event.currentTarget.value // get current value

      if (!value) {
        onChange(PatchEvent.from(unset()))
      } else {
        const selected = options.find((market) => market?.id === value)

        const doc = {
          _type: parent._type,
          padelId: selected.id,
        }

        padelApiFields.forEach((field) => {
          doc[field] = selected[field]
        })

        mutateAndNavigate(doc)
      }
    },
    [onChange, options, parent],
  )

  React.useEffect(() => {
    const fetchOptions = async () => {
      const markets = await padelClient.getMarkets()

      const { id: defaultMarketId } = markets.find((market) => market?.currency === 'SEK') // This will change on backend in the future.

      const optionsResult = await padelClient.getFacilities(defaultMarketId)

      if (optionsResult?.status !== 400) {
        setOptions(optionsResult)
      }
    }

    fetchOptions()
  }, [])

  return (
    <FormField
      description={type.description} // Creates description from schema
      title={type.title} // Creates label from schema title
      __unstable_markers={markers} // Handles all markers including validation
      __unstable_presence={presence} // Handles presence avatars
      compareValue={compareValue} // Handles "edited" status
    >
      <Card padding={0}>
        <Stack>
          <Select
            id={inputId} // A unique ID for this input
            fontSize={2}
            padding={[3, 3, 4]}
            space={[3, 3, 4]}
            value={value} // Current field value
            readOnly={readOnly} // If "readOnly" is defined make this field read only
            onFocus={onFocus} // Handles focus events
            onBlur={onBlur} // Handles blur events
            ref={ref}
            onChange={handleChange}
          >
            <option value={''}>---</option>
            {options.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
        </Stack>
      </Card>
    </FormField>
  )
})

export default PadelSelect
