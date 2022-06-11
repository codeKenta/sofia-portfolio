import * as React from 'react'
import PropTypes from 'prop-types'
import { FormBuilderInput } from '@sanity/form-builder/lib/FormBuilderInput'
import SanityFieldset from 'part:@sanity/components/fieldsets/default'
import { setIfMissing } from '@sanity/form-builder/PatchEvent'
import classes from './Fieldset.module.css'

const Fieldset = React.forwardRef((props, ref) => {
  const {
    compareValue,
    focusPath,
    markers,
    onBlur,
    onChange,
    onFocus,
    presence,
    type,
    value,
    level,
  } = props

  const handleFieldChange = React.useCallback(
    (field, fieldPatchEvent) => {
      onChange(fieldPatchEvent.prefixAll(field.name).prepend(setIfMissing({ _type: type.name })))
    },
    [onChange, type],
  )

  const fieldNames = type.fields.map((f) => f.name)

  const childPresence =
    presence.length === 0 ? presence : presence.filter((item) => fieldNames.includes(item.path[0]))

  const childMarkers =
    markers.length === 0 ? markers : markers.filter((item) => fieldNames.includes(item.path[0]))

  return (
    <SanityFieldset
      legend={type.title}
      description={type.description}
      markers={childMarkers}
      presence={childPresence}
      className={classes.fieldset}
    >
      {type.fields.map((field, i) => {
        return (
          <FormBuilderInput
            level={level + 1}
            ref={i === 0 ? ref : null}
            key={field.name}
            type={field.type}
            value={value && value[field.name]}
            onChange={(patchEvent) => handleFieldChange(field, patchEvent)}
            path={[field.name]}
            markers={markers}
            focusPath={focusPath}
            readOnly={field.type.readOnly}
            presence={presence}
            onFocus={onFocus}
            onBlur={onBlur}
            compareValue={compareValue}
          />
        )
      })}
    </SanityFieldset>
  )
})

Fieldset.propTypes = {
  compareValue: PropTypes.any,
  focusPath: PropTypes.any,
  markers: PropTypes.any,
  onBlur: PropTypes.any,
  onChange: PropTypes.any,
  onFocus: PropTypes.any,
  presence: PropTypes.any,
  type: PropTypes.any,
  value: PropTypes.any,
  level: PropTypes.any,
}

export default Fieldset
