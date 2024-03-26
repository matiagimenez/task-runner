import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen({ port, host }, () => {
	console.log(`Example app listening on ${host}:${port}`);
});
