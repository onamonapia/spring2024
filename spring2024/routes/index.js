

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// req: from client
// res: response to client
// render: get that file, process it



// i feel like i should be able to link to them directly but i can't so here they are. 
// Song Class
// a node in a songlist graph
// Constructor
// Effects: creates a new song object.
//title, artist, language, youtube link, genre, date listened to, linked from, keywords
let Song = function(id) {
  this.id = id;
  this.title;
  this.artist;
  this.language;
  this.genre = [];
  this.dates = [];
  // i have decided to make this an undirected graph.
  this.linkedSongs = [];
  this.links = [];
  this.keywords = [];
  this.closeness = -1;
}

Song.prototype.toString = function() {
  return this.title + " by " + this.artist + " (" + this.language + ")";
}

// requires: a language
// effects: adds the language to this song
// throws: error if the song already has a language
// (i dont know what to do if a song has multiple languages)
// (it'll just be the majority language i guess)
Song.prototype.setLanguage = function(lang) {

      this.language = lang;

}

// returns: the language of this song
Song.prototype.getLanguage = function() {
  return this.language;
}

// requires: a string
// effects: adds genres to list 
Song.prototype.addGenre = function(genres) {
  let genreList = genres.split(',');
  for (let i = 0; i < genreList.length; i++) {
      let curr = genreList[i].trim();
      let alreadyAdded = false;
      console.log(curr);
      for (let j = 0; j < this.genre.length; j++) {
          
          if (curr == this.genre[j]) {
              alreadyAdded = true;
          }   
      }
      if (alreadyAdded == false) {
          this.genre.push(curr);
      }
  }
}
// checks if a given genre is listed under a song
Song.prototype.searchGenres = function(testGenre) {
  for (let i = 0; i < this.genre.length; i++) {
      if (this.genre[i] == testGenre) {
          return true;
      }
  }
  return false;
}

Song.prototype.getGenres = function() {
  return this.genre.toString();
}

// requires: a string
// effects: adds keywords to list 
Song.prototype.addKeyword = function(newKeywords) {
  let keywordList = String(newKeywords).split(',');
  for (let i = 0; i < keywordList.length; i++) {
      let curr = keywordList[i].trim();
      let alreadyAdded = false;
      console.log(curr);
      for (let j = 0; j < this.keywords.length; j++) {
          
          if (curr == this.keywords[j]) {
              alreadyAdded = true;
          }   
      }
      if (alreadyAdded == false) {
          this.keywords.push(curr);
      }
  }
}

// checks if a given keyword is listed under a song
Song.prototype.searchKeywords = function(testKeyword) {
  for (let i = 0; i < this.keywords.length; i++) {
      if (this.keywords[i] == testKeyword) {
          return true;
      }
  }
  return false;
}

Song.prototype.searchGenres = function(testGenre) {
  for (let i = 0; i < this.genre.length; i++) {
      if (this.genre[i] == testGenre) {
          return true;
      }
  }
  return false;
}

Song.prototype.searchLinked = function(linked) {
  for (let i = 0; i < this.linkedSongs.length; i++) {
      if (this.linkedSongs[i] == linked) {
          return true;
      }
  }
  return false;
}



Song.prototype.getKeywords = function() {
  return this.keywords.toString();
}



// requires: a date
// effects: adds dates to list 
Song.prototype.addDate = function(newDate) {
  let alreadyAdded = false;
  for (let i = 0; i < this.dates.length; i++) {
      if (newDate == this.dates[i]) {
          alreadyAdded = true;
      }
  }
  if (alreadyAdded == false) {
      this.dates.push(newDate);
  }
}

Song.prototype.getDates = function() {
  return this.dates.toString();
}


// checks if a given date is listed under a song
Song.prototype.searchDates = function(testDate) {
  for (let i = 0; i < this.dates.length; i++) {
      if (this.dates[i] == testDate) {
          return true;
      }
  }
  return false;
}

// requires: a link (but i won't check)
// effects: adds to the list of links to it if it's not already in the list
Song.prototype.addLink = function(newLink) {
  let alreadyIn = false;
  for (let i = 0; i < this.links.length; i++) {
      if (this.links[i] == newLink) {
          alreadyIn = true;
          i = this.links.length;
      }
  }
  if (alreadyIn == false) {
      this.links.push(newLink);
  }
}

Song.prototype.getLinks = function(newLink) {
  return this.links.toString();
}

// setter
// requires: a string name for the title and artist
// throws: an error if the song already exists. 
Song.prototype.setTitleAndArtist = function(name, musician) {
  //console.log(this.title + ", " + this.artist);
  if (this.title == null && this.artist == null) {
      this.title = name;
      this.artist = musician;
      //console.log("name: " + this.title + " artist: " + this.artist);
  }
  else {
      throw "Song already exists. And if the code gets to this point, something's gone wrong.";
  }
}

// returns: a list of this song's [title, artist]
Song.prototype.getTitleAndArtist = function() {
  return [this.title, this.artist];
}

// equals method
// requires: a song object
// returns: true if they are equal (i.e., have the same title and artist)
// false otherwise.
Song.prototype.sameSong = function(song2) {
  if (this.title == song2.title && this.artist == song2.artist) {
      return true;
  }

  return false;
}

// requires: a title and an artist
// returns: true if they are equal to this song's title and artist
// false otherwise.
Song.prototype.sameSong2 = function(title2, artist2) {
  if (this.title == title2 && this.artist == artist2) {
      return true;
  }
  return false
  ;
}

Song.prototype.sameSong3 = function(link) {
  for (let i = 0; i < this.links.length; i++) {
      if (this.links[i] == link) {
          return true;
      }
  }
  return 3;
}

Song.prototype.addNewLinkedSong = function(newSong) {
  this.linkedSongs.push(newSong);
}

Song.prototype.getLinkedSongs = function() {
  return this.linkedSongs;
}

Song.prototype.getCloseness = function() {
  return this.closeness;
}
Song.prototype.setCloseness = function(newCloseness) {
  this.closeness = newCloseness;
}



// Constructor
// effects: creates a new SongGraph 
let SongGraph = function() {
  this.nodes = [];
  this.languages = [];
  this.edges = [];
}

SongGraph.prototype.addNode = function(newSong) {
  let alreadyIn = false;
  for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].sameSong(newSong)) {
          this.nodes[i].addGenre[newSong.getGenres()];
          this.nodes[i].addKeyword[newSong.getKeywords()];
          this.nodes[i].addLink[newSong.getLinks()];
          this.nodes[i].addDate[newSong.getDates()];
          alreadyIn = true;
          i = this.nodes.length;
      }
  }
  this.nodes.push(newSong);
  alreadyIn = false;
  for (let i = 0; i < this.languages.length; i++) {
      if (this.languages[i] == newSong.getLanguage()) {
          alreadyIn = true;
      }
  }
  if (alreadyIn == false) {
      this.languages.push(newSong.getLanguage());
  }
}

SongGraph.prototype.getLanguages = function() {
  return this.languages.sort();
}


// resets graph after a bfs
SongGraph.prototype.resetBfs = function() {
  for (let i = 0; i < this.nodes.length; i++) {
      nodes[i].setCloseness(-1);
  }
}

SongGraph.prototype.getSongsByKeyword = function(keyword) {
  //console.log("input language: " + lang);
  let temp = new SongGraph();
  for (let i = 0; i < this.nodes.length; i++) {
    console.log("current keywords: " + this.nodes[i].getKeywords().toString());
    for (let j = 0; j < this.nodes[i].getKeywords(); j++) {
      if (keyword == this.nodes[i].getKeywords()[j]) {
        temp.nodes.push(this.nodes[i]);
      }
    }
  }
  // console.log(songsInLanguage.nodes[0].getTitleAndArtist());
  return temp;
}

// returns a graph of all songs in a language
SongGraph.prototype.getSongsByLanguage = function(lang) {
  console.log("input language: " + lang);
  let songsInLanguage = new SongGraph();
  for (let i = 0; i < this.nodes.length; i++) {
    console.log("current language: " + this.nodes[i].getLanguage());
      if (this.nodes[i].getLanguage() == lang) {
          console.log("YES");
          songsInLanguage.nodes.push(this.nodes[i]);
          
      }
  }
  console.log(songsInLanguage.nodes[0].getTitleAndArtist());
  return songsInLanguage;
}


// an absolutely awful implementation of a bfs. 
// based off a link. 
// HOWEVER. it returns a NEW graph of all the songs that are in it

SongGraph.prototype.bfs = function(link) {
  let startNode;
  for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].sameSong3(link)) {
          startNode = this.nodes[i];
          i = this.nodes.length;
      }
  }
  let queue = [];
  startNode.setCloseness = 0;
  let returnGraph = new SongGraph();
  returnGraph.addNode(startNode);
  queue.push(startNode);
  while (queue.length > 0) {
      let curr = queue.shift();
      for (let i = 0; i < curr.getLinkedSongs(); i++) {
          if (curr.getLinkedSongs[i].getCloseness() == -1) {
              curr.getLinkedSongs[i].setCloseness(curr.getCloseness() + 1);
              queue.push(curr.getLinkedSongs[i]);
              returnGraph.addNode(curr.getLinkedSongs[i]);
          }
      };
  }
  return returnGraph;
}

// returns a graph of songs with only that keyword

SongGraph.prototype.findKeyword = function(keyword) {
  let returnGraph = new SongGraph();
  for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].searchKeywords(keyword)) {
          returnGraph.push(this.nodes[i]);
      }
  }
  return returnGraph;
}

SongGraph.prototype.bfsFromAnotherSong = function(link) {
  let startNode;
  for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].sameSong3(link)) {
          startNode = this.nodes[i];
          i = this.nodes.length;
      }
  }
  let queue = [];
  startNode.setCloseness = 0;
  let returnGraph = new SongGraph();
  returnGraph.addNode(startNode);
  queue.push(startNode);
  while (queue.length > 0) {
      let curr = queue.shift();
      for (let i = 0; i < curr.getLinkedSongs(); i++) {
          if (curr.getLinkedSongs[i].getCloseness() == -1) {
              curr.getLinkedSongs[i].setCloseness(curr.getCloseness() + 1);
              queue.push(curr.getLinkedSongs[i]);
              returnGraph.addNode(curr.getLinkedSongs[i]);
          }
      };
  }
  return returnGraph;
}


let serverSongs = new SongGraph();
let currGraph = serverSongs;
let jsonArray = [];

var fs = require("fs");
let fileManager = {
  read: function() {
    var rawdata = fs.readFileSync("objectdata.json");
    let gooddata = JSON.parse(rawdata);
    
    console.log("SAVED SONGS: " + gooddata.nodes.length);
    for (let i = 0; i < gooddata.nodes.length; i++) {
      serverSongs.addNode(jsonToSong(gooddata.nodes[i]));
    }



  },
  write: function() {
    let data = JSON.stringify(serverSongs);
    fs.writeFileSync("objectdata.json", data);
  },

  validData: function() {
    var rawdata = fs.readFileSync("objectdata.json");
    console.log(rawdata.length);
    if (rawdata.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
}


let jsonToSong = function(json) {
  let newSong = new Song(json.id);
  newSong.title = json.title;
  newSong.artist = json.artist;
  newSong.genre = json.genre;
  newSong.closeness = json.closeness;
  newSong.language = json.language;
  newSong.links = json.links;
  newSong.linkedSongs = json.linkedSongs;
  newSong.dates = json.dates;
  newSong.keywords = json.keywords;
  return newSong;
}


router.get("/getSongs", function(req, res) {
  serverSongs = new SongGraph();
  fileManager.read();
  
  res.status(200).json(serverSongs.nodes);
  //console.log("MADE IT TO GET");
});

router.post("/addSong", function(req, res) {
  //console.log("MADE IT TO POST");
  console.log(req.body);
  const newSongJSON = req.body;
  let newSong = new Song();
  newSong.id = newSongJSON.id;
  console.log(newSong.id);
  newSong.title = newSongJSON.title;
  newSong.artist = newSongJSON.artist;
  newSong.genre = newSongJSON.genre;
  newSong.closeness = newSongJSON.closeness;
  newSong.language = newSongJSON.language;
  newSong.links = newSongJSON.links;
  newSong.linkedSongs = newSongJSON.linkedSongs;
  newSong.dates = newSongJSON.dates;
  newSong.keywords = newSongJSON.keywords;
  serverSongs.addNode(newSong);
  fileManager.write();
  res.status(200).json(newSong);
});


// WORKS
router.post("/sendLanguage", function(req, res) {
  console.log(serverSongs.nodes.length);
  let lang = req.body.lang;
  console.log(lang);
 
  currGraph = serverSongs.getSongsByLanguage(lang);
  
  //console.log(currGraph.nodes[0].getLanguage());
});

router.post("/sendKeyword", function(req, res) {

  //console.log(serverSongs.nodes.length);
  console.log("TEMP GRAPH SIZE: " + currGraph.nodes.length);
  let keyword = req.body.keyword;
  console.log("keyword: " + keyword);
  let tempGraph = new SongGraph();
  for (let i = 0; i < serverSongs.nodes.length; i++) {
    console.log("Current keywords: " + serverSongs.nodes[i].keywords.toString());
    if (serverSongs.nodes[i].searchKeywords(keyword) == true ) {
      tempGraph.nodes.push(serverSongs.nodes[i]);
    }
  }
  

  currGraph = tempGraph;
  
  //console.log(currGraph.nodes[0].getLanguage());
});


router.post("/sendGenre", function(req, res) {

  //console.log(serverSongs.nodes.length);
  console.log("TEMP GRAPH SIZE: " + currGraph.nodes.length);
  let genre = req.body.genre;
  console.log("genre: " + genre);
  let tempGraph = new SongGraph();
  for (let i = 0; i < serverSongs.nodes.length; i++) {
    //console.log("Current genres: " + serverSongs.nodes[i].genres.toString());
    if (serverSongs.nodes[i].searchGenres(genre) == true ) {
      tempGraph.nodes.push(serverSongs.nodes[i]);
    }
  }
  

  currGraph = tempGraph;
  
  //console.log(currGraph.nodes[0].getLanguage());
});

// router.post("/sendLinked", function(req, res) {

//   //console.log(serverSongs.nodes.length);
//   //console.log("TEMP GRAPH SIZE: " + currGraph.nodes.length);
//   let linked = req.body.linked;
//   //console.log("genre: " + genre);
//   let tempGraph = new SongGraph();
//   for (let i = 0; i < serverSongs.nodes.length; i++) {
//     //console.log("Current genres: " + serverSongs.nodes[i].genres.toString());
//     if (serverSongs.nodes[i].searchLinked(linked) == true ) {
//       tempGraph.nodes.push(serverSongs.nodes[i]);
//     }
//   }
  

//   currGraph = tempGraph;
  
//   //console.log(currGraph.nodes[0].getLanguage());
// });



router.get("/getPossibleSongs", function(req, res) {
  res.status(200).json(currGraph.nodes);
});

module.exports = router;