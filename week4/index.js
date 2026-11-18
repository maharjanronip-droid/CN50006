const mongoose = require('mongoose'); 
 
const MONGO_URI = 'mongodb+srv://maharjanronip_db_user:Nuzzy2508@cluster0.0nr8miq.mongodb.net/';

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
 
const Person = mongoose.model('modelname', PersonSchema, 'personCollection');


async function insertOne() {

  const saved = await new Person({

    name: 'NHQ', age: 32, gender: 'Male', salary: 1234, city: 'London'

  }).save();

  console.log('One document inserted:', saved);

}

async function insertMany() {

  const result = await Person.insertMany([

    { name: 'SimonNHQ', age: 42, gender: 'Male', salary: 3456, city: 'London' },

    { name: 'NeeshaNN', age: 53, gender: 'Female', salary: 1000, city: 'Manchester' },

    { name: 'MaryNHQ', age: 27, gender: 'Female', salary: 5402, city: 'London' },

    { name: 'MikeNJQ', age: 40, gender: 'Male', salary: 4519, city: 'Birmingham' }

  ]);

  console.log('Many documents inserted:', result.length);

}

async function findAll() {

  const docs = await Person.find({}).sort({ salary: 1 })

    .select('name salary age').limit(100);

  console.log('Showing multiple documents:');

  docs.forEach(d => console.log(d.age, d.name, d.salary));

}

async function findFemalesOver30() {

  const givenAge = 30;

  const docs = await Person.find({ gender: 'Female', age: { $gte: givenAge } })

    .sort({ salary: 1 }).select('name salary age').limit(10);

  console.log('Females aged 30 or above:');

  docs.forEach(d => console.log(d.age, d.name, d.salary));

}

async function countDocuments() {

  console.log('Total Documents Count:', await Person.countDocuments());

}

async function deleteManyPersons() {

  const result = await Person.deleteMany({ age: { $gte: 45 } });

  console.log('Deleted documents:', result.deletedCount);

}

async function updateManyPersons() {

  const result = await Person.updateMany(

    { gender: 'Female' }, { $set: { salary: 5555 } });

  console.log('Updated documents:', result.modifiedCount);

}

async function findByCity(city) {

  const docs = await Person.find({ city }).select('name age city salary');

  console.log(`People in ${city}:`, docs);

}

async function main() {

  try {

    await mongoose.connect(MONGO_URI);

    console.log(`Connected to ${MONGO_URI}`);

    await insertOne();

    await insertMany();

    await findAll();

    await findFemalesOver30();

    await countDocuments();

    await deleteManyPersons();

    await updateManyPersons();

    await findByCity('London');

  } catch (err) {

    console.error('Error:', err);

  } finally {

    await mongoose.connection.close();

    console.log('Connection closed');

  }

}

main();