const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

const studentData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '/data/Student.json'), 'utf-8')
);

app.get('/api/students/search', (req, res) => {
  const query = req.query.name?.toLowerCase() || '';
  if (query.length < 3) {
    return res.status(400).json({ message: 'Please enter at least 3 characters.' });
  }

  const matchingStudents = studentData.filter(student =>
    student.name.toLowerCase().includes(query)
  );

  const results = matchingStudents.slice(0, 5);

  res.json(results);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
