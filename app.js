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
      type: String,
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
  const userSchema=new mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true
    }
  })
  const clientSchema=new mongoose.Schema({
    name:{
      type:String
    },
    email:{
      type:String,
      required:true
    }
  })
  
  
  const Project = mongoose.model('Project', projectSchema);
  const User=mongoose.model('User',userSchema);
  const Client =mongoose.model('Client',clientSchema);



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
app.get('/registerclient',(req,res)=>{
  res.render('registerclient');
})
app.get('/clientdashboard',(req,res)=>{
  const {id}=req.query;
 Client.findById(id).then((c)=>{
  Project.find({email:c.email}).then((projects)=>{
   res.render('clientdashboard',{projects:projects,client:c})
  })
 })

})
app.post('/registerclient',(req,res)=>{
  const { name, email} = req.body;
  console.log(req.body);
  Client.findOne({ email: email })
    .then((user) => {
      if (user) {
        // If user exists, redirect to project page
        console.log('user exits')
        res.redirect(`/clientdashboard?id=${user._id}`);
      } else {
        // If user doesn't exist, create new user and redirect to project page
        const newUser = new Client({ name: name, email: email });
        newUser
          .save()
          .then((r) => {
            console.log('new user');
            res.redirect(`/clientdashboard?id=${r._id}`);
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
})
app.post('/adduser', (req, res) => {
  const { name, email, id, proid } = req.body;
  console.log(req.body);
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        // If user exists, redirect to project page
        console.log('user exits')
        res.redirect(`/projectsc?id=${proid}`);
      } else {
        // If user doesn't exist, create new user and redirect to project page
        const newUser = new User({ name: name, email: email });
        newUser
          .save()
          .then((r) => {
            console.log('new user');
            res.redirect(`/projectsc?id=${proid}`);
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

app.get('/alluser9330',(req,res)=>{
  User.find({}).then((users)=>{
    res.render('allusers',{users});
  }).catch((err)=>{
    console.log(err);
  })
})


app.get('/addproject', (req, res) => {
  const {id} =req.query;
   Client.findById(id).then((client)=>{
    res.render('addproject',{client});
   }).catch((err)=>{
    console.log('error',err)
   })
    
  });
  app.get('/project', (req, res) => {
    const {id,islogin}= req.query; 
    Project.findById(id).then((project)=>{
      res.render('project', { project ,islogin });
    }).catch((err)=>{
      console.log("error",err)
    })
    });
    app.get('/projectsc', (req, res) => {
      const {id,islogin}= req.query; 
      Project.findById(id).then((project)=>{
        res.render('project2', { project,islogin:true });
      }).catch((err)=>{
        console.log("error",err)
      })
      });
  app.post('/deleteproject',(req,res)=>{
    const {id}=req.body;
    Project.findByIdAndDelete(id).then((r)=>{
      res.send('Successfully deleted');
    }).catch((err)=>{
      console.log(err)
    })
  })
  app.get('/allclient9330',(req,res)=>{
     Client.find({}).then((clients)=>{
     
      res.render('allclients',{clients});
    }).catch((err)=>{
      console.log(err);
    })
  })
    
  
  app.post('/addproject', (req, res) => {
    const {id}=req.body
    
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
    res.redirect(`/clientdashboard?id=${id}`)
  }).catch((err)=>res.send(err))
   
  });

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () =>{mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error connecting to MongoDB', err))});
