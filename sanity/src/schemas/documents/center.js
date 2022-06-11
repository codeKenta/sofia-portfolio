import SelectCenters from '../../components/SelectCenters'

export default {
  name: 'center',
  title: 'center',
  type: 'document',
  fields: [
    {
      name: 'padelId',
      title: 'Center',
      type: 'string',
      inputComponent: SelectCenters,
      description: 'Select a center',
    },
    {
      name: 'name',
      title: 'Center name',
      type: 'string',
      hidden: true,
    },
  ],
}
