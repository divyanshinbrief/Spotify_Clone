document.addEventListener("DOMContentLoaded", () => {
    const songs = [
        {
            title: "Ishq Hai",
            artist: "Anurag Saikia",
            src: "songs/ishqHai.mp3",
            img: "songs/ishq_hai.jpeg"
        },
        {
            title: "Janib",
            artist: "Arijit Singh",
            src: "songs/janib.mp3",
            img: "songs/janib.jpg"
        },
    ];

    const libBoxes = document.querySelector(".lib-boxes");
    const audio = new Audio();
    let currentSongIndex = null;
    let isPlaying = false;

    const playerIcons = document.querySelectorAll(".playerIcons img");
    const playPauseBtn = playerIcons[2];

    const timeStart = document.querySelector(".time_playScale p:nth-child(1)");
    const playScale = document.querySelector(".playScale");
    const timeEnd = document.querySelector(".time_playScale p:nth-child(3)");

    const leftPlayerImg = document.querySelector(".leftPlayer img");
    const leftPlayerTitle = document.querySelector(".info p:nth-child(1)");
    const leftPlayerArtist = document.querySelector(".info p:nth-child(2)");

    function setSong(index) {
        const song = songs[index];
        audio.src = song.src;
        leftPlayerImg.src = song.img;
        leftPlayerTitle.textContent = song.title;
        leftPlayerArtist.textContent = song.artist;
        audio.load();
        currentSongIndex = index;
        audio.play();
        isPlaying = true;

        // Update playBtn attribute when a new song starts playing
        playBtn.setAttribute("src", "Assets/playing.png");
    }
    const playBtn=document.querySelector("#playBtn");

    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying;

        // Update playBtn attribute based on isPlaying
        if (isPlaying) {
            playBtn.setAttribute("src", "Assets/playing.png");
        } else {
            playBtn.setAttribute("src", "Assets/player_icon3.png");
        }
    }

    // Load songs in library
    libBoxes.innerHTML = "";
    songs.forEach((song, index) => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
            <img src="${song.img}" alt="${song.title}" style="width:20%; border-radius: 10px; margin-bottom: 10px;">
            <div class="box-p1">${song.title}</div>
            <div class="box-p2">${song.artist}</div>
            <button class="badge" data-index="${index}">Play</button>
        `;
        libBoxes.appendChild(box);
    });

    // Play button in library
    libBoxes.addEventListener("click", (e) => {
        if (e.target.matches("button.badge")) {
            const index = parseInt(e.target.getAttribute("data-index"));
            setSong(index);
        }
    });

    // Middle Player Button
    playPauseBtn.addEventListener("click", togglePlayPause);

    // Update Time
    audio.addEventListener("timeupdate", () => {
        timeStart.textContent = formatTime(audio.currentTime);
        timeEnd.textContent = formatTime(audio.duration);

        let progress = (audio.currentTime / audio.duration) * 100;
        playScale.style.width = `${progress}%`;
    });

    // Format time as mm:ss
    function formatTime(seconds) {
        if (isNaN(seconds)) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
});
