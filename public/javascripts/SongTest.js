let newSong = new Song();
newSong.setTitleAndArtist("a", "b");
let newSong2 = new Song();
newSong2.setTitleAndArtist("a", "b");

console.log(newSong.sameSong(newSong2));
console.log(newSong.sameSong2("a", "b"));

newSong.addGenre("bluh, bluh2");