// Song Class
// a node in a songlist graph

// Constructor
// Effects: creates a new song object.
//title, artist, language, youtube link, genre, date listened to, linked from, keywords
let Song = function() {
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

// requires: a language
// effects: adds the language to this song
// throws: error if the song already has a language
// (i dont know what to do if a song has multiple languages)
// (it'll just be the majority language i guess)
Song.prototype.setLanguage = function(lang) {
    if (this.language == null) {
        throw "song already has a language";
    }
    else {
        this.language = lang;
    }
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
    let keywordList = newKeywords.split(',');
    for (let i = 0; i < keywordList.length; i++) {
        let curr = keywordList[i].trim();
        let alreadyAdded = false;
        console.log(curr);
        for (let j = 0; j < keywords.length; j++) {
            
            if (curr == keywords[j]) {
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


Song.prototype.getKeywords = function() {
    return this.keywords.toString();
}



// requires: a date
// effects: adds dates to list 
Song.prototype.addDate = function(newDate) {
    let alreadyAdded = false;
    for (let i = 0; i < dates.length; i++) {
        if (newDate == dates[i]) {
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