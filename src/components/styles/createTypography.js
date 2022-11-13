import { deepmerge } from '@mui/utils'

const caseAllCaps = {
  textTransform: 'uppercase',
}

export default function createTypography(palette, typography) {
  const {
    // fontFamilyPrimary = '"Crimson Text", serif',
    fontFamilyPrimary = '"Gotham Light"',

    // fontFamilySecondary = '"Abril Fatface", cursive',
    // fontFamilySecondary = '"Hiragino Kaku Gothic Std"',
    fontFamilySecondary = 'Poppins',

    // fontFamilySecondary = 'Kanit',

    // fontFamilySecondary = '"Hiragino Kaku Gothic Std"',

    fontFamilyTertiary = '"Open Sans", serif',
    // The default font size of the Material Specification.
    fontSize = 14, // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightSemibold = 600,
    fontWeightBold = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    ...other
  } = typeof typography === 'function' ? typography(palette) : typography

  const coef = fontSize / 14
  const pxToRem = (size) => `${(size / htmlFontSize) * coef}rem`
  const buildVariant = (
    typeFace,
    fontWeight,
    size,
    lineHeight,
    letterSpacing,
    casing,
    responsiveFontSize,
  ) => ({
    fontFamily: typeFace,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following http://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight,
    letterSpacing: `${letterSpacing}em`,
    ...casing,
    ...allVariants,
    ...(responsiveFontSize && {
      '@media (max-width:600px)': {
        fontSize: pxToRem(responsiveFontSize),
      },
    }),
  })

  const variants = {
    h1: buildVariant(fontFamilySecondary, fontWeightBold, 72, 1, -0.01, caseAllCaps, 50),
    h2: buildVariant(fontFamilySecondary, fontWeightBold, 58, 1, 0.01, caseAllCaps, 45),
    h3: buildVariant(fontFamilySecondary, fontWeightBold, 40, 1.05, 0.01, caseAllCaps, 30),
    h4: buildVariant(fontFamilySecondary, fontWeightBold, 22, 1.2, 0.03, caseAllCaps),
    h5: buildVariant(fontFamilySecondary, fontWeightBold, 16, 1.3, 0.03, caseAllCaps),
    h6: buildVariant(fontFamilySecondary, fontWeightBold, 12, 1.5, 0.04, caseAllCaps),
    subtitle1: buildVariant(fontFamilyPrimary, fontWeightRegular, 18, 1.5, 0),
    subtitle2: buildVariant(fontFamilyPrimary, fontWeightMedium, 12, 1.7, 0.02),
    body1: buildVariant(fontFamilyPrimary, fontWeightRegular, 18, 1.6, 0),
    body2: buildVariant(fontFamilyPrimary, fontWeightRegular, 14, 1.6, 0),
    button: buildVariant(fontFamilyTertiary, fontWeightLight, 12, 1.4, 0.04, caseAllCaps),
    caption: buildVariant(fontFamilyPrimary, fontWeightSemibold, 18, 1.3, 0.02, caseAllCaps),
    overline: buildVariant(fontFamilySecondary, fontWeightRegular, 8, 1.7, 0.12, caseAllCaps),
    // Custom variants
    input: buildVariant(fontFamilyTertiary, fontWeightLight, 16, 1.5, 0), // Should at least be 16px fontSize for iOS Safari not to zoom in on focus.
  }

  const typographyOutput = deepmerge(
    {
      htmlFontSize,
      pxToRem,
      fontFamilyPrimary,
      fontFamilySecondary,
      fontFamilyTertiary,
      fontSize,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
      fontWeightSemibold,
      fontWeightBold,
      // Mui uses standalone `fontFamily` internally.
      fontFamily: fontFamilyPrimary,
      ...variants,
    },
    other,
    {
      clone: false, // No need to clone deep
    },
  )

  return typographyOutput
}
