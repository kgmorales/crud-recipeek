export default () => ({
  mongoDB: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  pakrikaUser: process.env.PAPRIKA_USER,
  paprikaPass: process.env.PAPRIKA_PASS,
  port: process.env.PORT || 3000,
});
