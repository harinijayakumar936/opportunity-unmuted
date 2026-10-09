const audio = document.getElementById("audio-player");
const miniPlayer = document.getElementById("mini-player");
const miniPlayButton = document.getElementById("mini-play-button");
const miniTitle = document.getElementById("mini-title");
const miniProgress = document.getElementById("mini-progress");
const miniTime = document.getElementById("mini-time");
const playerStatus = document.getElementById("player-status");

let currentEpisode = null;
let audioMissing = false;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  if (secs < 10) {
    secs = "0" + secs;
  }
  return minutes + ":" + secs;
}

function episodeLength() {
  if (audio.duration && isFinite(audio.duration)) {
    return audio.duration;
  }
  return currentEpisode.minutes * 60;
}

function isPlaying(episode) {
  return currentEpisode !== null && currentEpisode.id === episode.id && !audio.paused;
}

function updatePlayer() {
  if (currentEpisode === null) {
    return;
  }

  miniTitle.textContent = currentEpisode.title;

  if (audioMissing) {
    miniTime.textContent = "Audio coming soon";
    miniProgress.hidden = true;
    miniPlayButton.disabled = true;
  } else {
    const length = episodeLength();
    miniTime.textContent = formatTime(audio.currentTime) + " / " + formatTime(length);
    miniProgress.hidden = false;
    miniProgress.value = Math.round((audio.currentTime / length) * 100);
    miniPlayButton.disabled = false;
  }

  miniPlayer.classList.toggle("is-playing", !audio.paused);
  if (audio.paused) {
    miniPlayButton.setAttribute("aria-label", "Play");
  } else {
    miniPlayButton.setAttribute("aria-label", "Pause");
  }

  updateEpisodePlayButton();
}

function showAudioMissing() {
  audioMissing = true;
  playerStatus.textContent = "Audio coming soon for this episode.";
  updatePlayer();
}

// a missing or broken mp3 shows up as "not supported"
function handlePlayError(error) {
  if (error.name === "NotSupportedError") {
    showAudioMissing();
  }
}

function playEpisode(episode) {
  if (currentEpisode !== null && currentEpisode.id === episode.id && !audioMissing) {
    togglePlay();
    return;
  }

  currentEpisode = episode;
  audioMissing = false;
  playerStatus.textContent = "";
  miniPlayer.hidden = false;
  document.body.classList.add("player-open");

  if (episode.audio === "") {
    audio.removeAttribute("src");
    showAudioMissing();
    return;
  }

  audio.src = episode.audio;
  updatePlayer();
  audio.play().catch(handlePlayError);
}

function togglePlay() {
  if (audioMissing) {
    return;
  }
  if (audio.paused) {
    audio.play().catch(handlePlayError);
  } else {
    audio.pause();
  }
}

function seekTo(percent) {
  audio.currentTime = (percent / 100) * episodeLength();
}

miniPlayButton.addEventListener("click", togglePlay);

miniProgress.addEventListener("input", function () {
  seekTo(miniProgress.value);
});

audio.addEventListener("timeupdate", updatePlayer);
audio.addEventListener("play", updatePlayer);
audio.addEventListener("pause", updatePlayer);
audio.addEventListener("loadedmetadata", updatePlayer);
audio.addEventListener("error", function () {
  if (audio.getAttribute("src")) {
    showAudioMissing();
  }
});
