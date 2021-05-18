require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');
const axios = require('axios');
const router= express.Router();


const SECRET_SESSION = process.env.SECRET_SESSION;
console.log(SECRET_SESSION);


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);


app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

app.use(flash());            // flash middleware
app.use(passport.initialize());      // Initialize passport
app.use(passport.session());         // Add a session

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash(); //library that allows quick flash messages anytime a user logsin/logsout/wrong pw
  res.locals.currentUser = req.user;
  next();
});






app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/profile', (req, res) => {
//   res.render('profile');
// });

app.use('/auth', require('./controllers/auth'));
app.use('/reviews', require('./controllers/reviews'));
// app.use('/natparks', require('./controllers/natparks'));

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  console.log('inside of profile')
  res.render('profile', { id, name, email });
});

// ---------------------------------------------

app.get('/results/:parkName', (req, res)=> {
  const query = req.query.q;
  //const urlQuery = query.replace(/\s/g, '+')
  console.log(query)
  const credentials = process.env.APIKEY;
  axios.get(`https://${credentials}@developer.nps.gov/api/v1/parks?q=${query}`)
  .then(response => {
    console.log(response.data);
    res.render('searchresult', {data:response.data});
  })
});

//getting park info 
app.post('/favs', (req,res)=>{
  const parkFav = {
    name: req.body.name,
    parkId: req.body.parkId
  };
  //adding to favs
  db.favs.create(parkFav)
  .then(createdFav=>{
    // console.log(createdFav)
    res.redirect('favs');
  })
 });
 //grabbing all favs in db and redirecting to favs page
app.get('/favs', (req,res)=>{
  db.favs.findAll()

    .then(favPark => {
      // console.log("here is fav park")
      // console.log(favPark)
       res.render('favs', {favPark})
    })
})


// select details from favs page and redirect with details to details page
app.get('/details', (req,res) => {
  const query = req.params.parkName;
  const credentials = process.env.APIKEY;
  axios.get(`https://${credentials}@developer.nps.gov/api/v1/parks?q=${query}`)
  .then(response => {
    const parkInfo = response.data
        console.log(parkInfo)
        res.render('details', {data:response.data});
      })
    });


    app.post("/details", async function (req, res) {
      const newFav = { name: req.body.name };
      try {
        const isInFavs = await db.fav.findAll({ where: newFav });
        if (isInFavs.length > 0) {
          res.send({
            message: "Park already a favorite",
            redirect: "http://localhost:3000/",
          });
        } else {
          const newParkFav = await db.fav.create(newFav);
          console.log(newParkFav.name, "created.")
          res.redirect('/details/')
        }
      } catch (err) {
        res.send("something went wrong trying to create favs");
      }
    });
    
// // --------------------------------------------------



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
