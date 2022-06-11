// This file is written in JavaScript because sanity have not implemented types correctly for FormBuilderInput and theres no documentation
// on what types to use for custom input component props
import * as React from 'react'
import PropTypes from 'prop-types'
// because of sanity "parts" system
// eslint-disable-next-line import/no-unresolved
import Fieldset from 'part:@sanity/components/fieldsets/default'
import { FormField } from '@sanity/base/components'
import PatchEvent, { set, unset, setIfMissing } from '@sanity/form-builder/PatchEvent'
import { FormBuilderInput } from '@sanity/form-builder/lib/FormBuilderInput'
import { Switch } from '@sanity/ui'
import Select from 'react-select'

const MEDIA_TYPES = ['image', 'video']

const MediaInput = React.forwardRef((props, ref) => {
  const { type, markers, presence, onChange, value, compareValue, onFocus, onBlur, focusPath } =
    props

  const imageField = type.fields.find((f) => f.name === 'image')
  const breakpointsField = type.fields.find((f) => f.name === 'breakpoints')
  const mediaType = value?.mediaType

  const handleChangeResponsiveness = React.useCallback(
    (event) => {
      const { checked } = event.currentTarget
      const patches = [set(checked, ['auto'])]

      if (checked) {
        // unset breakpoints if auto is checked
        patches.push(unset(['breakpoints']))
      }

      if (!checked) {
        // unset auto responsive image field
        patches.push(unset(['image']))
      }

      onChange(PatchEvent.from(patches))
    },
    [onChange],
  )

  const handleTypeChange = React.useCallback(
    (event) => {
      const newValue = event.value

      const patches = [unset(['breakpoints']), set(newValue, ['mediaType'])]

      // video type doesn't support auto responsiveness
      if (newValue === 'video') {
        patches.push(unset(['image']), set(false, ['auto']))
      }

      onChange(PatchEvent.from(patches))
    },
    [onChange],
  )

  // this is a generic change handler for all <FormBuilderInput> elements
  const handleFormBuilderInputChange = React.useCallback(
    (fields) => (patchEvent) => {
      // copy and reverse fields array, then prefix all patches with correct path
      let prefixedPatchEvent = fields
        .slice()
        .reverse()
        .reduce((acc, field) => {
          acc = acc.prefixAll(field.name)

          return acc
        }, patchEvent)

      // the full path of the innermost field
      const path = fields.map((field) => field.name)

      // create patches for all fields that don't yet exist, otherwise Sanity throws an error
      const setIfMissingPatches = fields.map((field) => {
        const fieldPath = path.slice(0, path.indexOf(field.name) + 1)
        return setIfMissing({ _type: field.name }, fieldPath)
      })

      // prepend patches to PatchEvent
      setIfMissingPatches.reverse().forEach((patch) => {
        prefixedPatchEvent = prefixedPatchEvent.prepend(patch)
      })

      // run onChange with our PatchEvent
      onChange(prefixedPatchEvent)
    },
    [onChange],
  )

  return (
    <Fieldset legend={type.title} description={type.description}>
      <FormField
        __unstable_markers={markers}
        __unstable_presence={presence}
        compareValue={compareValue}
        title="Type"
      >
        <Select
          onBlur={onBlur}
          onChange={handleTypeChange}
          onFocus={onFocus}
          options={MEDIA_TYPES.map((t) => ({ label: t, value: t }))}
          styles={{ control: (styles) => ({ ...styles, borderRadius: 0 }) }}
          value={{ label: value?.mediaType, value: value?.mediaType }}
        />
      </FormField>

      {value?.mediaType === 'image' && (
        <React.Fragment>
          <FormField
            __unstable_markers={markers}
            __unstable_presence={presence}
            compareValue={compareValue}
            title="Automatic responsiveness"
          >
            <Switch
              ref={ref}
              checked={value?.auto ?? false}
              onBlur={onBlur}
              onChange={handleChangeResponsiveness}
              onFocus={onFocus}
            />
          </FormField>
          {value?.auto === true && (
            <FormBuilderInput
              compareValue={compareValue}
              focusPath={focusPath}
              key="image"
              markers={markers}
              onBlur={onBlur}
              onChange={handleFormBuilderInputChange([imageField])}
              onFocus={onFocus}
              path={['image']}
              presence={presence}
              type={imageField.type}
              value={value?.image}
            />
          )}
        </React.Fragment>
      )}

      {(value?.auto === false || value?.mediaType === 'video') && (
        <FormField
          title={breakpointsField.type.title}
          description={breakpointsField.type.description}
        >
          {breakpointsField.type.fields.map((breakpointField) => (
            <FormField
              key={breakpointField.name}
              title={breakpointField.type.title}
              description={breakpointField.type.description}
            >
              {breakpointField.type.fields.map(
                (mediaField) =>
                  mediaField.name === mediaType && (
                    <FormBuilderInput
                      key={mediaField.name}
                      compareValue={compareValue}
                      focusPath={focusPath}
                      markers={markers}
                      onBlur={onBlur}
                      onChange={handleFormBuilderInputChange([
                        breakpointsField,
                        breakpointField,
                        mediaField,
                      ])}
                      onFocus={onFocus}
                      path={['breakpoints', breakpointField.name, mediaField.name]}
                      presence={presence}
                      type={mediaField.type}
                      value={value?.breakpoints?.[breakpointField.name]?.[mediaField.name]}
                    />
                  ),
              )}
            </FormField>
          ))}
        </FormField>
      )}
    </Fieldset>
  )
})

MediaInput.propTypes = {
  type: PropTypes.object,
  markers: PropTypes.array,
  presence: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.object,
  compareValue: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  focusPath: PropTypes.array,
}

export default MediaInput
