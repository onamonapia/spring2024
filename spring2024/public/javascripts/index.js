let clientSongs = [];
let numberOfSongs = 0;

document.addEventListener("DOMContentLoaded", function (event) {
    

    document.getElementById("enter").addEventListener("click", function() {
        let currName = document.getElementById("songName").value;
        let currArtist = document.getElementById("artistName").value;
        let currLang = document.getElementById("songLanguage").value;
        let currSongLink = document.getElementById("songLink").value;
        let currDateListened = document.getElementById("dateListened").value;
        let currLinkedFrom = document.getElementById("linkedFrom").value;
        let currGenre = document.getElementById("songGenre").value;
        let currKeyword = document.getElementById("keywordList").value;
        console.log(currName);

        createASong(currName, currArtist, currLang, currSongLink, currDateListened, currLinkedFrom, currGenre, currKeyword);
    });

    document.getElementById("languageEnter").addEventListener("click", function() {
        // send to server
        let lang = "{\"lang\": \"" + document.getElementById("findLanguage").value + "\"}";
        //console.log(lang);
        $.ajax({
            url: "/sendLanguage",
            type: "POST",
            data: lang,
            
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(result) {
                console.log(result);
                console.log(JSON.stringify(song));
            }
        });

        displaySongs3();
    });

    document.getElementById("keywordEnter").addEventListener("click", function() {
        // send to server
        let keyword = "{\"keyword\": \"" + document.getElementById("findKeywords").value + "\"}";
        console.log(keyword);
        $.ajax({
            url: "/sendKeyword",
            type: "POST",
            data: keyword,
            
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(result) {
                console.log(result);
                // console.log(JSON.stringify(song));
            }
        });

        displaySongs3();
    });
    

    document.getElementById("genreEnter").addEventListener("click", function() {
        // send to server
        let genre = "{\"genre\": \"" + document.getElementById("findGenre").value + "\"}";
        console.log(genre);
        $.ajax({
            url: "/sendGenre",
            type: "POST",
            data: genre,
            
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(result) {
                console.log(result);
                // console.log(JSON.stringify(song));
            }
        });

        displaySongs3();
    });

    // document.getElementById("linkedEnter").addEventListener("click", function() {
    //     // send to server
    //     let genre = "{\"linked\": \"" + document.getElementById("findLink").value + "\"}";
    //     console.log(genre);
    //     $.ajax({
    //         url: "/sendLinked",
    //         type: "POST",
    //         data: genre,
            
    //         contentType: "application/json; charset=utf-8",
    //         dataType: "json",
    //         success: function(result) {
    //             console.log(result);
    //             // console.log(JSON.stringify(song));
    //         }
    //     });

    //     displaySongs3();
    // });



    $(document).on("pagebeforeshow", "#show", function (event) {
        let showList = document.getElementById("showList");
        showList.innerHTML = "";
        displaySongs();
        
    });

    $(document).on("pagebeforeshow", "#find", function (event) {

        displaySongs2();
        
    });

    $(document).on("pagebeforeshow", "#details", function (event) {
        let songID = localStorage.getItem("parm");
        for (let i = 0; i < clientSongs.length; i++) {
            if (songID == clientSongs[i].id) {
                curr = clientSongs[i];
                document.getElementById("title").innerHTML = "Title: " + curr.title;
                document.getElementById("artist").innerHTML = "Aritst: " + curr.artist;
                document.getElementById("language").innerHTML = "Langauge: " + curr.language;
                document.getElementById("link").innerHTML = "Links: " + curr.links.toString();
                document.getElementById("dates").innerHTML = "Dates listened to: " + curr.dates.toString();
                document.getElementById("links").innerHTML = "Songs linked: " + curr.linkedSongs.toString();
                document.getElementById("genre").innerHTML = "Genres: " + curr.genre.toString();
                document.getElementById("keywords").innerHTML = "Keywords: " + curr.keywords.toString();

            }

        }
        
    });


});

let createASong = function(currName, currArtist, currLang, currSongLink, currDateListened, currLinkedFrom, currGenre, currKeyword) {
    let song = new Song(numberOfSongs);
    song.setTitleAndArtist(currName, currArtist);
    song.setLanguage(currLang);
    song.addDate(currDateListened);
    song.addGenre(currGenre);
    song.addKeyword(currKeyword);
    song.addLink(currSongLink);
    song.addNewLinkedSong(currLinkedFrom);
    numberOfSongs++;
    // clientSongs.push(song);

    // send to server
    $.ajax({
        url: "/addSong",
        type: "POST",
        data: JSON.stringify(song),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            console.log(result);
            console.log(JSON.stringify(song));
            //document.location.href = "index.html#show";
        }
    });

    document.getElementById("songName").value = "";
    document.getElementById("artistName").value = "";
    document.getElementById("songLanguage").value = "";
    document.getElementById("songLink").value = "";
    document.getElementById("dateListened").value = "";
    document.getElementById("linkedFrom").value = "";
    document.getElementById("songGenre").value = "";
    document.getElementById("keywordList").value = "";

    document.location.href = "index.html#add";
}



function displaySongs() {
    let showList = document.getElementById("showList");
    showList.innerHTML = "";
    document.getElementById("songName").value = "";
    document.getElementById("artistName").value = "";
    document.getElementById("songLanguage").value = "";
    document.getElementById("songLink").value = "";
    document.getElementById("dateListened").value = "";
    document.getElementById("linkedFrom").value = "";
    document.getElementById("songGenre").value = "";
    document.getElementById("keywordList").value = "";
    
    $.get("/getSongs", function(data, status) {
        console.log(status);
        clientSongs = data;
        // console.log("CURRENT TEST");
        // console.log(clientSongs);


    for (let i = 0; i < clientSongs.length; i++ ) {
        console.log(clientSongs[i].keywords.toString());
        let item = document.createElement("li");
        item.classList.add("oneSong");
        item.textContent = clientSongs[i].title + " by " + clientSongs[i].artist + " (" + clientSongs[i].language + ")";
        showList.append(item);
        item.setAttribute("data-parm", clientSongs[i].id);        
    }
    console.log(showList.innerHTML);
    let lilist = document.getElementsByClassName("oneSong");
    let newSongArray = Array.from(lilist);
    
    newSongArray.forEach(function (element, i) {
        
        element.addEventListener("click", function () {
            let parm = this.getAttribute("data-parm");
            localStorage.setItem("parm", parm);
            document.location.href = "index.html#details";
        });
    });

});
}

function displaySongs2() {
    document.getElementById("songName").value = "";
    document.getElementById("artistName").value = "";
    document.getElementById("songLanguage").value = "";
    document.getElementById("songLink").value = "";
    document.getElementById("dateListened").value = "";
    document.getElementById("linkedFrom").value = "";
    document.getElementById("songGenre").value = "";
    document.getElementById("keywordList").value = "";
    $.get("/getSongs", function(data, status) {
        console.log(status);
        clientSongs = data;
        // console.log("CURRENT TEST");
        // console.log(clientSongs);

    let showList = document.getElementById("possibleList");
    showList.innerHTML = "";
    for (let i = 0; i < clientSongs.length; i++ ) {
  
        let item = document.createElement("li");
        item.classList.add("oneSong");
        item.textContent = clientSongs[i].title + " by " + clientSongs[i].artist + " (" + clientSongs[i].language + ")";
        showList.append(item);
        item.setAttribute("data-parm", clientSongs[i].id);        
    }

    let lilist = document.getElementsByClassName("oneSong");
    let newSongArray = Array.from(lilist);
    console.log("test");
    newSongArray.forEach(function (element, i) {
        
        element.addEventListener("click", function () {
            let parm = this.getAttribute("data-parm");
            localStorage.setItem("parm", parm);
            document.location.href = "index.html#details";
        });
    });

});
}

function displaySongs3() {
    //console.log("DISPLAY SONGS 3");
    document.getElementById("songName").value = "";
    document.getElementById("artistName").value = "";
    document.getElementById("songLanguage").value = "";
    document.getElementById("songLink").value = "";
    document.getElementById("dateListened").value = "";
    document.getElementById("linkedFrom").value = "";
    document.getElementById("songGenre").value = "";
    document.getElementById("keywordList").value = "";
    $.get("/getPossibleSongs", function(data, status) {
        console.log(status);
        clientSongs = data;
        // console.log("CURRENT TEST");
        // console.log(clientSongs);

    let showList = document.getElementById("possibleList");
    showList.innerHTML = "";
    for (let i = 0; i < clientSongs.length; i++ ) {
  
        let item = document.createElement("li");
        item.classList.add("oneSong");
        item.textContent = clientSongs[i].title + " by " + clientSongs[i].artist + " (" + clientSongs[i].language + ")";
        showList.append(item);
        item.setAttribute("data-parm", clientSongs[i].id);        
    }

    let lilist = document.getElementsByClassName("oneSong");
    let newSongArray = Array.from(lilist);
    console.log("test");
    newSongArray.forEach(function (element, i) {
        
        element.addEventListener("click", function () {
            let parm = this.getAttribute("data-parm");
            localStorage.setItem("parm", parm);
            document.location.href = "index.html#details";
        });
    });

});
}




