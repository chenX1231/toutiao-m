module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      // rootValue: 37.5,
      // rootValue(module) {
      //   // console.log(module)  打印
      //   return /vant/i.test(module.file) ? 37.5 : 75
      // },
      rootValue: ({ file }) => (/vant/i.test(file) ? 37.5 : 75),
      propList: ['*']
    }
  }
}
