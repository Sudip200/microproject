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
    author:{
      type:String,
      required:true
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
  
  
  const Project = mongoose.model('Project', projectSchema);
  




// const projects = [
//     {
//       id:0,
//       title: 'Project 1',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor mi id enim faucibus viverra.',
//       skills: ['HTML', 'CSS', 'JavaScript'],
//       budget: 1000,
//       call:'9330257165',
//       email:"dassudipto200@gmail.com"
//     },
//     {
//       id:1,
//       title: 'Project 2',
//       description: 'Nunc et ante sit amet eros ullamcorper auctor vel sit amet mauris. In efficitur ipsum vel ex malesuada dapibus.',
//       skills: ['React', 'Node.js', 'MongoDB'],
//       budget: 2000,
//       call:'9330257165',
//       email:"dassudipto200@gmail.com"
//     },
//     {
//       id:2,
//       title: 'Project 3',
//       description: 'Praesent eu purus condimentum, volutpat eros at, dignissim sem. Maecenas imperdiet nulla nisl, ut interdum velit suscipit nec.',
//       skills: ['Python', 'Django', 'PostgreSQL'],
//       budget: 1500,
//       call:'9330257165',
//       email:"dassudipto200@gmail.com"
//     }
//   ];




// Define a route
app.get('/', (req, res) => {
Project.find({}).then((projects)=>{
  res.render('index', { title: 'My App', projects:projects });
}).catch((err)=>{
  console.log("error",err)
})
});
app.get('/addproject', (req, res) => {
    res.render('addproject');
  });
  app.get('/project', (req, res) => {
    const {id}= req.query; 
    Project.findById(id).then((project)=>{
      res.render('project', { project });
    }).catch((err)=>{
      console.log("error",err)
    })
    });
  
    
  
  app.post('/addproject', (req, res) => {
    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      skills: req.body.skills.split(',').map(skill => skill.trim()), // convert comma separated string to array of trimmed strings
      budget: req.body.budget,
      call: req.body.call,
      email: req.body.email,
      author:req.body.name,
    });
  newProject.save().then((r)=>{
    console.log(r);
   
    res.redirect('/')
  }).catch((err)=>res.send(err))
   
  });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () =>{mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error connecting to MongoDB', err))});
