export default (queries) => `
  "blocks": blocks[] {
      ${Object.entries(queries).map(
        ([key, query]) => `_type == "${key}" => { "name": _type, "props": ${query} }`,
      )}
}
    `
