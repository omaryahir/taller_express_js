const Joi = require('joi'); // This library is for validation
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

// Get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Get specific ID 
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course ' + req.params.id + ' was not found');
    res.send(course);
});

// Create Course
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); // result.error
    if (error) return res.status(400).send(error.details[0].message); // 400 Bad Request
    
    const course = {
        id: courses.length + 1,
        name: req.body.name 
    };
    courses.push(course);
    res.send(course);
});

// Update Course
app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) returnres.status(404).send('The course ' + req.params.id + ' was not found');

    const { error } = validateCourse(req.body); // result.error
    if (error) return res.status(400).send(error.details[0].message); // 400 Bad Request
 
    // Update course
    course.name = req.body.name;
    // Return the updated
    res.send(course);
});

// Validate Course
function validateCourse(course) {
    // Validate
    // If invalid, return 400 - Bad request
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

// Delete course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course ' + req.params.id + ' was not found');

    // Delete 
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    // Return the same course
    res.send(course);
})







// Another tests ----------------------------------

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
