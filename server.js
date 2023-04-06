// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Create an instance of Express app
const app = express();

// Use EJS as the view engine
app.set('view engine', 'ejs');

// Set up Body Parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));


const uri = 'mongodb+srv://dassudipto200:1234@cluster0.3syr1vm.mongodb.net/<database-name>?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB', err));



  const projectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    skills: {
      type: [String],
      required: true
    },
    budget: {
      type: Number,
      required: true
    },
    call: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  });
  
  module.exports = mongoose.model('Project', projectSchema);
  




const projects = [
    {
      id:0,
      title: 'Project 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor mi id enim faucibus viverra.',
      skills: ['HTML', 'CSS', 'JavaScript'],
      budget: 1000,
      call:'9330257165',
      email:"dassudipto200@gmail.com"
    },
    {
      id:1,
      title: 'Project 2',
      description: 'Nunc et ante sit amet eros ullamcorper auctor vel sit amet mauris. In efficitur ipsum vel ex malesuada dapibus.',
      skills: ['React', 'Node.js', 'MongoDB'],
      budget: 2000,
      call:'9330257165',
      email:"dassudipto200@gmail.com"
    },
    {
      id:2,
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
  app.get('/project', (req, res) => {
    const {id}= req.query; 
    const project = projects[id] // You need to implement this function to fetch project data by ID
  
    if (!project) {
      res.status(404).send('Project not found');
    } else {
      res.render('project', { project });
    }
  });
  

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () =>{mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error connecting to MongoDB', err))});
