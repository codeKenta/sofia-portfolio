export default function previewTitle(blockName, key = 'heading', media = undefined) {
  return {
    select: {
      [key]: key,
    },
    prepare: (selection) => ({
      title: selection[key] || '',
      subtitle: blockName,
      media,
    }),
  }
}
