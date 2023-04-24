import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// The data is now stored in an array of objects for easier manipulation
const data = [
  { id: "2022345", name: "Ahmed Said" },
  { id: "2021389", name: "Rasha Mohamed" },
  { id: "202045", name: "Yasser Mohsen" },
];

// GET method to retrieve all students
app.get("/", (req, res) => {
  res.send(data);
});

// GET method to specific student
app.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id)
  const student = data.find((student) => student.id === id);
  if (student) {
    res.send(student.name);
  } else {
    res.status(404).send(`Student with id ${id} not found`);
  }
});

// POST method to add a new student
app.post("/", (req, res) => {
  const { id, name } = req.body;
  data.push({ id, name });
  res.send(`Added student with id ${id} and name ${name}`);
  console.log(data);
});

// PUT method to update an existing student
app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const index = data.findIndex((student) => student.id === id);
  if (index !== -1) {
    data[index].name = name;
    res.send(`Updated student with id ${id} to have name ${name}`);
  } else {
    res.status(404).send(`Student with id ${id} not found`);
    console.log(data);
  }
});

// DELETE method to remove a student
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = data.findIndex((student) => student.id === id);
  if (index !== -1) {
    const name = data[index].name;
    data.splice(index, 1);
    res.send(`Deleted student with id ${id} and name ${name}`);
  } else {
    res.status(404).send(`Student with id ${id} not found`);
    console.log(data);
  }
});

app.listen(port, () => {
  console.log(`This is port ${port}`);
})