

const html = [
  {
    _key: '3ab9d915dc35',
    _type: 'block',
    children: [
      {
        _key: '6c23bfe19706',
        _type: 'span',
        marks: [],
        text: 'HTML Ipsum Presents',
      },
    ],
    markDefs: [],
    style: 'h1',
  },
  {
    _key: 'cccb50599cc3',
    _type: 'block',
    children: [
      {
        _key: 'f5d0c5220ebd',
        _type: 'span',
        marks: ['strong'],
        text: 'Pellentesque habitant morbi tristique',
      },
      {
        _key: '50cb7b3dca3b',
        _type: 'span',
        marks: [],
        text: ' senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. ',
      },
      {
        _key: '943f6493298b',
        _type: 'span',
        marks: ['em'],
        text: 'Aenean ultricies mi vitae est.',
      },
      {
        _key: 'ca1d57062337',
        _type: 'span',
        marks: [],
        text: ' Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, ',
      },
      {
        _key: 'b48967669ece',
        _type: 'span',
        marks: ['code'],
        text: 'commodo vitae',
      },
      {
        _key: '87b3740921ce',
        _type: 'span',
        marks: [],
        text: ', ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. ',
      },
      {
        _key: '429668ee1a7e',
        _type: 'span',
        marks: ['dd73f6fa3859'],
        text: 'Donec non enim',
      },
      {
        _key: 'cd9851b27dfd',
        _type: 'span',
        marks: [],
        text: ' in turpis pulvinar facilisis. Ut felis.',
      },
    ],
    markDefs: [
      {
        _key: 'dd73f6fa3859',
        _type: 'link',
        href: '#',
      },
    ],
    style: 'normal',
  },

]

export default {
  heading: 'Sofia Andersson',
  excerpt: html,
  ctaPrimary: {
    url: '/case',
    label: 'Case',
  },
  ctaSecondary: {
    url: '/kontakt',
    label: 'Kontakta mig',
  },
  mediaProps: {
    component: 'picture',
    breakpoints: {
      xs: '//source.unsplash.com/Sl03gvNZuss/1280x720',
      sm: '//source.unsplash.com/Sl03gvNZuss/1920x1080',
    },
  },
}
