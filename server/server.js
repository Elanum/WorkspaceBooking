/* eslint-disable no-console */
import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.use((req, _res, next) => {
  console.log(`request of type ${req.method} to URL ${req.originalUrl}`);
  next();
});

app.route('/api/hello').get((_req, res) => {
  res.status(200).json({
    message: 'World',
  });
});

app.use((_req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));

module.exports = app;
