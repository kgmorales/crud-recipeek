export default () => ({
  mongoDB: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  pakrika: {
    user: process.env.PAPRIKA_USER,
    pass: process.env.PAPRIKA_PASS,
  },
  port: parseInt(`${process.env.PORT}`) || 3000,
});
