const express = require('express');
const app = express();

// This enable the use of json in things like req.body.name 
app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]

/* This methods are included app.get() app.post() app.put() app.delete()*/

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course ' + req.params.id + ' was not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name is required and should be minimum 3 characters');
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name 
    };
    courses.push(course);
    res.send(course);
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
