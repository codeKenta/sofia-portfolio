//  fontFamilyPrimary = '"Gotham Light", serif',

// fontFamilySecondary = '"Abril Fatface", cursive',
// fontFamilySecondary = 'Hiragino',

// href = '/fonts/Hiragino/Hiragino-Kaku-Gothic.woff2'
const overrides = {
  styleOverrides: (theme) => `
    /* Include font files here. */

    @font-face {
      font-family: 'Poppins';
      font-weight: 700;
      font-display: swap;
      src: url('/fonts/Poppins/Poppins-Bold.woff2') format('woff2');
    }

    @font-face {
      font-family: 'Gotham Light';
      font-weight: 400;
      font-display: swap;
      src: url('fonts/Gotham/Gotham-Light-Regular.woff2') format('woff2');
    }


    @font-face {
      font-family: 'Open Sans';
      font-weight: 300;
      font-display: swap;
      src: url('/fonts/Open_Sans/OpenSans-Light.woff2') format('woff2');
    }

    @font-face {
      font-family: 'Open Sans';
      font-weight: 500;
      font-display: swap;
      src: url('/fonts/Open_Sans/OpenSans-Medium.woff2') format('woff2');
    }

    /* Define :root css variables. */
    :root {
      --cia-theme-spacing: ${theme.spacing(1)};
      --cia-section-spacing: ${theme.spacing(2)};
      --cia-container-spacing: ${theme.spacing(2)};
      --cia-toolbar-dense-min-height: 48px;
      --cia-toolbar-min-height: 56
      --cia-toolbar-spacing: ${theme.spacing(2)};
      ${theme.breakpoints.up('sm')} {
        --cia-section-spacing: ${theme.spacing(6)};
        --cia-container-spacing: ${theme.spacing(4)};
      }
    }
    /* Opinionated defaults taken from sanitize.css */
    /* https://github.com/csstools/sanitize.css */
    iframe, img, input, select, textarea {
      height: auto;
      max-width: 100%;
    }
    ol ol, ol ul, ul ol, ul ul {
      margin: 0;
    }
    nav ol, nav ul {
      list-style: none;
      padding: 0;
    }
    svg:not([fill]) {
      fill: currentColor;
    }
    /* Custom global css */
    [type="search"]::-webkit-search-cancel-button, [type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
      appearance: none;
    }
    [id] {
      scroll-margin-top: var(--cia-header-height, 0px);
    }
  `,
}

export default overrides
