// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of Express app
const app = express();

// Use EJS as the view engine
app.set('view engine', 'ejs');

// Set up Body Parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

const projects = [
    {
      title: 'Project 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor mi id enim faucibus viverra.',
      skills: ['HTML', 'CSS', 'JavaScript'],
      budget: 1000,
      call:'9330257165',
      email:"dassudipto200@gmail.com"
    },
    {
      title: 'Project 2',
      description: 'Nunc et ante sit amet eros ullamcorper auctor vel sit amet mauris. In efficitur ipsum vel ex malesuada dapibus.',
      skills: ['React', 'Node.js', 'MongoDB'],
      budget: 2000,
      call:'9330257165',
      email:"dassudipto200@gmail.com"
    },
    {
      title: 'Project 3',
      description: 'Praesent eu purus condimentum, volutpat eros at, dignissim sem. Maecenas imperdiet nulla nisl, ut interdum velit suscipit nec.',
      skills: ['Python', 'Django', 'PostgreSQL'],
      budget: 1500,
      call:'9330257165',
      email:"dassudipto200@gmail.com"
    }
  ];




// Define a route
app.get('/', (req, res) => {
  res.render('index', { title: 'My App', projects:projects });
});
app.get('/addproject', (req, res) => {
    res.render('addproject');
  });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
