import app from './app';

const { PORT = 5000 } = process.env;

app.listen(PORT, () => console.log(`server started and listening on port ${PORT}!`));

export default app;
