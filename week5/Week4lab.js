
const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection
async function connectDB() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is missing from .env");
  }

  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected successfully!");
}

// Person schema
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  gender: String,
  salary: Number,
  city: String
});

// Person model
const Person = mongoose.model(
  "modelname",
  PersonSchema,
  "personCollection"
);

// Insert one person
async function insertOne(name, age, gender, salary) {
  const person = new Person({
    name,
    age,
    gender,
    salary
  });

  return await person.save();
}

// Insert multiple people
async function insertMany(persons) {
  const defaultPersons = [
    { name: "SimonNHQ", age: 42, gender: "Male", salary: 3456 },
    { name: "NeeshaNN", age: 53, gender: "Female", salary: 1000 },
    { name: "MaryNHQ", age: 27, gender: "Female", salary: 5402 },
    { name: "MikeNJQ", age: 40, gender: "Male", salary: 4519 }
  ];

  return await Person.insertMany(persons ?? defaultPersons);
}

// Find all persons
async function findAll() {
  return await Person.find({})
    .sort({ salary: 1 })
    .select("name salary age")
    .limit(100);
}

// Find females aged 30 or above
async function findFemalesOver30() {
  return await Person.find({
    gender: "Female",
    age: { $gte: 30 }
  })
    .sort({ salary: 1 })
    .select("name salary age")
    .limit(10);
}

// Count persons
async function countDocuments() {
  return await Person.countDocuments();
}

// Delete persons aged 45 or above
async function deleteManyPersons() {
  return await Person.deleteMany({
    age: { $gte: 45 }
  });
}

// Update female salaries
async function updateManyPersons() {
  return await Person.updateMany(
    { gender: "Female" },
    { $set: { salary: 5555 } }
  );
}

// Export model and functions
module.exports = {
  Person,
  connectDB,
  insertOne,
  insertMany,
  findAll,
  findFemalesOver30,
  countDocuments,
  deleteManyPersons,
  updateManyPersons
};
