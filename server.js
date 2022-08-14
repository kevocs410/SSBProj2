//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const Anime= require('./models/schema.js');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


///// model

//___________________


// Routes
//___________________
//localhost:3000



app.get('/' , (req, res) => {
  res.send('Hello World!');
});







/// create route 
app. get("/anime/new", (req,res)=>{
  res.render("new.ejs")
  // res.render("new.ejs");
})

app.post("/anime", (req, res) =>{

  Anime.create(req.body, (error,createdAnime) =>{
    res.redirect("/anime")
  });
});



///show route
app.get("/anime/:id", (req, res)=>{
  Anime.findById(req.params.id, (err,foundAnime) =>{
    res.render("show.ejs",{
      animes:foundAnime
    })
  })
  // res.send("show page")
  // res.render("show.ejs")
})

//index route
app.get("/anime", (req, res) => {
  Anime.find({}, (error, allAnimes) => {
      res.render("index.ejs", {
          animes: allAnimes
      });
  });
});


///delete route
app.delete("/anime/:id", (req, res)=>{
  // res.send('deleting...');
  Anime.findByIdAndRemove(req.params.id, (err, removedAnime) => {
      res.redirect("/anime");
  });
});


////edit route
app.get("/anime/:id/edit", (req, res)=>{
  Anime.findById(req.params.id, (err, foundAnime)=>{
      res.render(
      "edit.ejs",
      {
        animes: foundAnime
      }
    )
  })
})



//////UPDATED ROUTES


app.put("/anime/:id", (req, res)=>{
  Anime.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedAnime) => {
      res.redirect("/anime");
  });
});




//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

