// Song Class
// a node in a songlist graph

// Constructor
// Effects: creates a new song object.
//title, artist, language, youtube link, genre, date listened to, linked from, keywords
let Song = function() {
    this.title;
    this.artist;
    this.language;
    this.link = {};
    this.genre = {};
    this.date = {};
    // i have decided to make this an undirected graph.
    this.links = {};
    this.keywords = {};
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

// requires: a link 
// effects: adds to the list of links to it if it's not already in the list
Song.prototype.addLink = function(newLink) {
    let alreadyIn = false;
    for (let i = 0; i < this.link.length; i++) {
        if (this.link[i] == newLink) {
            alreadyIn = true;
            i = this.link.length;
        }
    }
    if (alreadyIn == false) {
        this.link.push(newLink);
    }
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
    return false;
}