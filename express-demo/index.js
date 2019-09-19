const express = require('express');
const app = express();

/* This methods are included app.get() app.post() app.put() app.delete()*/

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3, 4]);
});

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});

// http://localhost:5000/api/post/2019/9
app.get('/api/post/:year/:month', (req, res) => {
    res.send(req.params);
});

// http://localhost:5000/api/post?a=2
app.get('/api/post/', (req, res) => {
    res.send(req.query);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ' + port + '...'));
