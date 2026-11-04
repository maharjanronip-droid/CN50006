const express = require('express'); 
const fs= require('fs') 
const app = express(); 
// Built-in middleware for parsing form data and JSON 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
// Home route 
app.get('/', (req, res) => { 
res.send('Hello! This is my first Express application.'); 
}); 
// Start server 
const PORT = 5000; 
app.listen(PORT, () => { 
console.log(`Server is running on port ${PORT}`); 
}); 
app.get('/about', function (req, res) { 
res.send('This is a basic Express application'); 
}); 
app.get('/users/:userId/books/:bookId', function (req, res) { 
res.send(req.params); 
});
app.get('/GetStudents', (req, res) => { 
    fs.readFile('./student.json', 'utf8', (err, data) => { 
 
        if (err) { 
            return res.status(500).json({ 
                status: false, 
                statusCode: 500, 
                message: 'Error reading Students.json' 
            }); 
        } 
 
        res.status(200).json({ 
            status: true, 
            statusCode: 200, 
            requestedAt: new Date().toISOString(), 
            requestUrl: req.originalUrl, 
            requestMethod: req.method, 
            studentData: JSON.parse(data) 
        }); 
    }); 
}); 
