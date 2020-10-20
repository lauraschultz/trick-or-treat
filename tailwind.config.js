module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    content: ['./src/**/*.tsx']
  },
  theme: {
    fontFamily: {
      'body': 'Roboto'
    },
    extend: {
      colors: {
        "theme-dark": "#030001",
        "theme-orange": "#F56809",
        "theme-yellow": "#F6DA00",
        "theme-green": "#078E38",
        "theme-purple": "#9226F8",
      },
      backgroundImage: theme => ({
        'ghosts': "url(assets/ghosts.png)"
      })
    },
  },
  variants: {},
  plugins: [],
}
