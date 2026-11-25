
const {
  Person,
  connectDB,
  insertOne,
  insertMany,
  findAll,
  findFemalesOver30,
  countDocuments,
  deleteManyPersons,
  updateManyPersons
} = require("../Week4Lab");

const express = require('express'); 
const fs= require('fs') 
const { Person } = require("./Week4Lab");
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
app.get('/GetStudent/:id', (req, res) => { 
 
    console.log("GetStudent called"); 
 
    fs.readFile(__dirname + "/student.json", "utf8", (err, data) => { 
 
        if (err) { 
            return res.status(500).json({ 
                status: false, 
                statusCode: 500,
                 message: "Error reading Students.json" 
                 
            }); 
        } 
 
        const students = JSON.parse(data); 
        const student = students["Student" + req.params.id]; 
 
        console.log(student); 
 
        if (student) { 
            res.status(200).json(student); 
        } else { 
            res.status(404).json({ 
                status: false, 
                statusCode: 404, 
                message: "Student Not Found", 
                requestedAt: new Date().toISOString(), 
                requestUrl: req.originalUrl, 
                requestMethod: req.method 
            }); 
        } 
    }); 
}); 
// showing html form 
app.get('/studentinfo', (req, res) => { 
res.sendFile('Studentinfo.html', { root: __dirname }); 
}); 
app.post('/submit-data', (req, res) => { 
const name = req.body.firstName + ' ' + req.body.lastName; 
const age = req.body.myAge  
const Gender = ' Gender: ' + req.body.gender; 
const qual = 'Qualification: ' + req.body.Qual; 
console.log(req.body.Qual); 
res.send({ 
status: true, 
message: 'Form Details', 
data: { 
name: name, 
age: age, 
gender: Gender, 
qualification: qual 
} 
}); 
});

app.get("/persons", async (req, res) => {
  try {
    const persons = await Person.find({});
    res.status(200).json({
      status: true,
      data: persons
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
});

app.get("/persons", async (req, res) => {
  try {
    const persons = await Person.find({});
    res.json({ status: true, data: persons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/insertOne", async (req, res) => {
  try {
    const { name, age, gender, salary } = req.body;
    const result = await insertOne(name, age, gender, salary);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/insertMany", async (req, res) => {
  try {
    const result = await insertMany(req.body.persons);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/findAll", async (req, res) => {
  try {
    res.json(await findAll());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/femalesOver30", async (req, res) => {
  try {
    res.json(await findFemalesOver30());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/countPersons", async (req, res) => {
  try {
    res.json({ count: await countDocuments() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/updateManyPersons", async (req, res) => {
  try {
    res.json(await updateManyPersons());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/deleteManyPersons", async (req, res) => {
  try {
    res.json(await deleteManyPersons());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });


