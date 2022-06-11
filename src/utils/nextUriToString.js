export default function nextUriToString(nextUri) {
  return typeof nextUri === 'string' ? nextUri : nextUri.join('/')
}
