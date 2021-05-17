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

app.get('/results', (req, res)=> {
  const query = req.query['q'];
  //const urlQuery = query.replace(/\s/g, '+')
  const credentials = process.env.APIKEY;
  axios.get(`https://${credentials}@developer.nps.gov/api/v1/parks?q=Yellowstone`)
  .then(response => {
    console.log(response.data);
    // res.render('index', {data:response.data});
  })
});

// // Detail route? Let's find out.
// app.get('/park/:park_id', (req, res) => {
//   const park_id = req.params['park_id'];
//   const credentials = process.env.APIKEY;
//   //console.log(req.params);
//   axios.get('https://developer.nps.gov/api/v1/parks?parkCode=acad&', {
//     params: {
//       apikey: credentials,
//       i: park_id
//     }
//   })
//   .then(response => {
//     console.log(response.data);
//     res.render('detail', {data:response.data});
//   })

// });


// app.get('/routes', (req, res) => {
//   const park_id = req.params['park_id'];
//   const credentials = process.env.APIKEY;
//   //console.log(req.params);
//   axios.get('https://developer.nps.gov/api/v1/parks?parkCode=acad&', {
//     params: {
//       apikey: credentials,
//       i: movie_id
//     }
//   })
//   .then(response => {
//     console.log(response.data);
//     res.render('detail', {data:response.data});
//   })

// });
// // --------------------------------------------------



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
