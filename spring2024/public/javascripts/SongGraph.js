

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
        if (nodes[i].sameSong(newSong)) {
            nodes[i].addGenre[newSong.getGenres()];
            nodes[i].addKeyword[newSong.getKeywords()];
            nodes[i].addLink[newSong.getLinks()];
            nodes[i].addDate[newSong.getDates()];
            alreadyIn = true;
            i = this.nodes.length;
        }
    }
    this.nodes.push(newSong);
    alreadyIn = false;
    for (let i = 0; i < this.languages.length; i++) {
        if (languages[i] == newSong.getLanguage()) {
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

// returns a graph of all songs in a language
SongGraph.prototype.getSongsByLanguage = function(lang) {
    let songsInLanguage = [];
    for (let i = 0; i < this.nodes.length; i++) {
        if (nodes[i].getLanguage == lang) {
            songsInLanguage.push(this.nodes[i]);
        }
    }
    return songsInLanguage;
}


// an absolutely awful implementation of a bfs. 
// based off a link. 
// HOWEVER. it returns a NEW graph of all the songs that are in it

SongGraph.prototype.bfs(link) = function() {
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

SongGraph.prototype.bfsFromAnotherSong(link) = function() {
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