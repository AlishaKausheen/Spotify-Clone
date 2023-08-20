console.log("Welcome to Sasta Spotify");
//initialize the variable
let songIndex = 0;
let audioElement = new Audio('Songs/Banjaara.mp3');
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");
let songs = [
    { songName: "Banjaara", filePath: "Songs/0.mp3", coverPath: "cover/banjara.jpg" },
    { songName: "Ehd-e-Wafa", filePath: "Songs/1.mp3", coverPath: "cover/ehd-e-wafa.jpg" },
    { songName: "Ilahi", filePath: "Songs/2.mp3", coverPath: "cover/illahi.jpg" },
    { songName: "Lagte Masoom Hai", filePath: "Songs/3.mp3", coverPath: "cover/lagte masoom hai.jpg" },
    { songName: "Tere Bina Jeena", filePath: "Songs/4.mp3", coverPath: "cover/tere bina jeena.jpg" },
    { songName: "Yeh Raaten Ye Mausam", filePath: "Songs/5.mp3", coverPath: "cover/ye raate.jpg" },
    { songName: "Ankhon Se Batana", filePath: "Songs/6.mp3", coverPath: "cover/Aankhon-Se-Batana.jpg" },
    { songName: "Subhanallah", filePath: "Songs/7.mp3", coverPath: "cover/subhanallah.jpg" }
]
songItem.forEach((Element, i) => {
        //console.log(Element, i);
        Element.getElementsByTagName('img')[0].src = songs[i].coverPath;
        Element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
        audioElement.src = songs[i].filePath;
    })
    //handling play/pause/click
masterPlay.addEventListener('click', (e) => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("bi-play-circle-fill");
        masterPlay.classList.add("bi-pause-circle-fill");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.add("bi-play-circle-fill");
        masterPlay.classList.remove("bi-pause-circle-fill");
        gif.style.opacity = 0;
    }
})

//listen to event
audioElement.addEventListener('timeupdate', () => {
    //console.log('timeupdate');
    //updating seek-bar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    //console.log(progress);
    progressBar.value = progress;
})
progressBar.addEventListener("change", () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
    Element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        audioElement.src = `Songs/${songIndex}.mp3`;
        if (e.target.classList.contains("bi-play-circle-fill")) {
            e.target.classList.remove("bi-play-circle-fill");
            e.target.classList.add("bi-pause-circle-fill");
            //audioElement.src = "Songs/Banjaara.mp3";
            audioElement.currentTime = 0;
            audioElement.play();
            masterSongName.innerText = songs[songIndex].songName;
            masterPlay.classList.remove("bi-play-circle-fill");
            masterPlay.classList.add("bi-pause-circle-fill");
            gif.style.opacity = 1;
        } else {
            e.target.classList.add("bi-play-circle-fill");
            e.target.classList.remove("bi-pause-circle-fill");
            audioElement.pause();
            masterPlay.classList.add("bi-play-circle-fill");
            masterPlay.classList.remove("bi-pause-circle-fill");
            gif.style.opacity = 0;
        }
    })
})
document.getElementById(`next`).addEventListener("click", () => {
    if (songIndex >= 8 || songIndex == 0) {
        songIndex = songIndex % 8;
    } else if (songIndex < 0) {
        songIndex = songIndex + 8;
    }
    //songIndex++;
    audioElement.src = `Songs/${songIndex}.mp3`;

    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove("bi-play-circle-fill");
    masterPlay.classList.add("bi-pause-circle-fill");
    songIndex++;
    gif.style.opacity = 1;

})
document.getElementById(`previous`).addEventListener("click", () => {
    if (songIndex >= 8 || songIndex == 0) {
        songIndex = songIndex % 8;
    } else if (songIndex < 0) {
        songIndex = songIndex + 8;
    }
    //songIndex--;
    audioElement.src = `Songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove("bi-play-circle-fill");
    masterPlay.classList.add("bi-pause-circle-fill");
    songIndex--;
    gif.style.opacity = 1;

})