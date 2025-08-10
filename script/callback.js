const clientId = "46bcebb835964614b78bc14ff6630d1d";
const redirectUri = "https://alysonhernandez.github.io/spotify-pwa/callback.html";

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

if (code) {
  const verifier = localStorage.getItem("code_verifier");

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      code_verifier: verifier
    })
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem("spotifyToken", data.access_token);
    localStorage.setItem("spotifyRefreshToken", data.refresh_token);
    window.location.href = "index.html";
  })
  .catch(err => console.error("Token exchange failed", err));
}
