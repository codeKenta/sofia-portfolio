import { formatLink } from '~/api/sanity/utils'

export default `{
  ...*[_type == "siteSettings"][0] {
    name, phone, email, "linkedInUrl": ${formatLink("linkedInUrl")}, "image": {
        "component": "picture",
        "src": avatar.asset->url + "?dl="
    }
  },
  showImage,
}`
