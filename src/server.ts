import express from 'express';

const app = express();

app.get('/', (request, response) => {
    return response.send('Hello Express + TypeScript')
})

app.listen(4000, () => console.log(`🚀 Server is running at port 4000`))