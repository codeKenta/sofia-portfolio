import groq from 'groq'

export function formatLink(fieldName) {
  return `
    coalesce('/' + ${fieldName}.reference->slug.current, ${fieldName}.url, '')
  `
}

export function formatCtaLink(
  fieldGroupName = 'cta',
  labelFieldName = 'label',
  urlFieldName = 'url',
) {
  return `
    "${fieldGroupName}": {
      "label": ${labelFieldName},
      "url": ${formatLink(urlFieldName)}
    }
  `
}

export const formatMedia = groq`{
  component,
  "src": select(
    component == "picture" => picture.asset->url + "?dl=",
    component == "video" => video.asset->url + "?dl=",
  )
}`

export const formatAdvancedMedia = groq`{
  component,
  "breakpoints": {
    ...select(
      component == "picture" => {
        "xs": xsPicture.asset->url + "?dl=",
        "sm": smPicture.asset->url + "?dl=",
        "md": mdPicture.asset->url + "?dl=",
        "lg": lgPicture.asset->url + "?dl=",
        "xl": xlPicture.asset->url + "?dl=",
      },
      component == "video" => {
        "xs": xsVideo.asset->url + "?dl=",
        "sm": smVideo.asset->url + "?dl=",
        "md": mdVideo.asset->url + "?dl=",
        "lg": lgVideo.asset->url + "?dl=",
        "xl": xlVideo.asset->url + "?dl=",
      },
    )
  }
}`

export const formatImage = groq`{
    "component": "picture",
    "src": image.asset->url + "?dl="
}`

export const formatMenuItem = `{
  label,
  url
}`

// Supports two levels of menus
export const menuQuery = `menuItems[] {
  label,
  defined(url) => {'url': ${formatLink('url')}},
  menuItems[] {
    label,
    defined(url) => {'url': ${formatLink('url')}},
  }
}
`
