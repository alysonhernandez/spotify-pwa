document.getElementById("playPauseBtn").addEventListener("click", () => {
  const token = localStorage.getItem("spotifyToken");
  if (!token) return alert("Login first");

  fetch("https://api.spotify.com/v1/me/player", {
    method: "GET",
    headers: { "Authorization": "Bearer " + token }
  })
  .then(res => res.json())
  .then(data => {
    const isPlaying = data.is_playing;

    const url = isPlaying
      ? "https://api.spotify.com/v1/me/player/pause"
      : "https://api.spotify.com/v1/me/player/play";

    fetch(url, {
      method: "PUT",
      headers: { "Authorization": "Bearer " + token }
    })
    .then(() => console.log(isPlaying ? "Playback paused" : "Playback started/continued"))
    .catch(err => console.error("Playback control error:", err));
  })
  .catch(err => console.error("Player state fetch error:", err));
});


document.getElementById("skipForwardBtn").addEventListener("click", () => {
  const token = localStorage.getItem("spotifyToken");
  if (!token) return alert("Login first");

  fetch("https://api.spotify.com/v1/me/player/next", {
    method: "POST",
    headers: { "Authorization": "Bearer " + token }
  })
  .then(() => console.log("Song Skipped Forward"))
  .catch(err => console.error("Skip Forward error:", err));
});

document.getElementById("skipPreviousBtn").addEventListener("click", () => {
  const token = localStorage.getItem("spotifyToken");
  if (!token) return alert("Login first");

  fetch("https://api.spotify.com/v1/me/player/previous", {
    method: "POST",
    headers: { "Authorization": "Bearer " + token }
  })
  .then(() => console.log("Song Skipped Previous"))
  .catch(err => console.error("Skip Previous error:", err));
});