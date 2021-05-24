
# parkBook
The web app designed for you to catalog your notes and memories of National Parks.

# HOW TO USE

parkBook has the ability to search for parks and then add them to a favorites list.  You can then comment your parks, edit and delete your comments.  As of right now, it is a travel journal for yourself to use to keep track of memories and/or notes about parks you wish to visit.

# LANGUAGES/FRAMEWORKS USED
This project was created using:  
FontEnd: HTML,CSS, EJS, Bootstrap  
BackEnd: Node.js, Express, Sequelize, Passport, Flash

# HOW TO INSTALL
1. *`Fork`* and *`Clone`* this respository to your local machine
2. Open `index.html` in your browser to play or 
3. Open the directory in your text editor of choice to view or edit the code


# HOW IT WORKS

### NPS API

Offered by the National Park Service (NPS), this app holds information about all of the National Parks in the US.

An example of how I used the API to search and render data:

```javascript
app.get("/results/:parkName", (req, res) => {
  const query = req.query.q;
  const credentials = process.env.APIKEY;
  axios
    .get(`https://${credentials}@developer.nps.gov/api/v1/parks?q=${query}`)
    .then((response) => {
      console.log(response.data);
      res.render("searchresult", { data: response.data });
    });
});
```

An example of how I used the API to display specific information from the API.  Here, we are asking the API for the full name of the park and for the first image from their array of images to display.

```javascript
<h1 class="d-flex justify-content-center"> Welcome to <%= data.data[0].fullName  %></h1>
<div class="d-flex justify-content-center"><img src="<%= data.data[0].images[0].url %>" alt="image of <%= data.data[0].fullname %>" style="height: 300px; width: auto;"></div> <br>

```


### Buttons

This button takes your search result and adds it to the favorites page.  

```javascript

<form action="/favs" method="POST" class="d-flex justify-content-center">
  <input type="hidden" name="name" value="<%= data.data[0].fullName %>">
  <input type="hidden" name="description" value="<%= data.data[0].description %>">
  <input class = "button1" type="submit" value="Add to Favorites">
</form>
<br>

```

### IF/ELSE

Here is an example of the if/else statement on the /index page. You can see the first half is showing you what would happen if logged in, the second half is you are not.  Depending on whether you are logged in or not, you see a different view; either a welcome message or a search form.

```javascript
<div class="container">
<div class="centered"><% if(currentUser) { %>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">National Park Search</h1>
      <p class="lead">Search for a park below...</p>
      <div class="container">
      <form action="/results/:parkName" method="GET">
        <input class="textarea" type="search" name="q" placeholder="Enter Park Name" />
        <input class="button1" type="submit" />
      </form>
    </div>
  </div>
</div>

  <% } else { %>
    
    
    <div class="jumbotron">
      <h1 class="display-4">Hello, adventurer!</h1>
      <p class="lead"> Welcome to parkBook. A place to search, navigate, and journal your way through 423 National parks.</p>
      <hr class="my-4">
      <p>We're happy you're here! Click the button below to signup.</p>
      <p class="lead">
        <a class="button1" href="/auth/signup" role="button">Signup</a>
      </p>
    </div>

  <% } %> </div>
</div>

```

# FUTURE CONSIDERATIONS
 I would like to expand this to be more of a social site, where national park lovers can unite and share wisdom about the parks they've visited as well as their travel plans for the ones coming up!