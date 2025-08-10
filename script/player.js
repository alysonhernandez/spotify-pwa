document.getElementById("playPauseBtn").addEventListener("click", () => {
  const token = localStorage.getItem("spotifyToken");
  if (!token) return alert("Login first");

  fetch("https://api.spotify.com/v1/me/player/pause", {
    method: "PUT",
    headers: { "Authorization": "Bearer " + token }
  })
  .then(() => console.log("Playback paused"))
  .catch(err => console.error("Playback error:", err));
});
