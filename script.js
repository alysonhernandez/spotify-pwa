const clientId = "46bcebb835964614b78bc14ff6630d1d"; 
const redirectUri = "https://alysonhernandez.github.io/spotify-pwa/callback.html";
const scopes = [
  "user-read-playback-state",
  "user-modify-playback-state"
];

document.getElementById("loginBtn").addEventListener("click", () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}`;
  console.log(authUrl);
  window.location.href = authUrl;
});

// Check if redirected back with access token
if (window.location.hash) {
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const token = hashParams.get("access_token");
  if (token) {
    localStorage.setItem("spotifyToken", token);
    window.location.hash = "";
    alert("Logged in!");
  }
}

document.getElementById("playPauseBtn").addEventListener("click", () => {
  const token = localStorage.getItem("spotifyToken");
  if (!token) return alert("Login first");

  fetch("https://api.spotify.com/v1/me/player/pause", {
    method: "PUT",
    headers: { "Authorization": "Bearer " + token }
  }).then(() => {
    console.log("Toggled play/pause");
  });
});


