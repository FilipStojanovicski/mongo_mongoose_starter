require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({name:"Filip", age: 28, favoriteFoods: ["apples", "oranges"]});
  person.save(function(err, data){
    if (err) return console.error(err);
    done(null, data);
  });
};

var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  let people = Person.create(arrayOfPeople, function(err, data){
    if (err) return console.err(err);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, peopleFound){
    if (err) return console.log(err);
    done(null, peopleFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, personFound){
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, personFound){
    if (err) return console.log(err);
    console.log(personFound);
    done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function(err, personFound){
    if(err) return console.log(err);

    personFound.favoriteFoods.push(foodToAdd);

    personFound.save(function(err, updatedPerson){
      if (err) return console.log(err);
      done(null, updatedPerson);
    });

  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function (err, updatedPerson){
    if (err) return console.log(err);
    console.log(updatedPerson);
    done(null, updatedPerson);
  });

};

const removeById = (personId, done) => {

  Person.findByIdAndRemove(personId, function(err, removedPerson){
    if (err) return console.log(err);
    console.log(removedPerson);
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function(err, removedPeople){
    if (err) return console.log(error);
    console.log(removedPeople);
    done(null, removedPeople);
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
  .sort({name: "asc"})
  .limit(2)
  .select(["name", "favoriteFoods"])
  .exec(function(err, data){
    if (err) return console.log(err);
    console.log(data);
    done(null, data);
  })
  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
