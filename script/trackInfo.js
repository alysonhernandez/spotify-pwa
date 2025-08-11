let lastTrackId = null;

export function updateTrackInfo() {
  const token = localStorage.getItem("spotifyToken");
  if (!token) return alert("Login first");

  fetch("https://api.spotify.com/v1/me/player?market=from_token", {
    method: "GET",
    headers: { "Authorization": "Bearer " + token }
  })
  .then(res => res.ok ? res.json() : Promise.reject("No playback"))
  .then(data => {
    const track = data.item;
    if (!track || track.id === lastTrackId) return;

    lastTrackId = track.id;

    const trackName = track.name;
    const artistName = track.artists.map(a => a.name).join(", ");
    const albumCoverUrl = track.album.images[0].url;

    const img = new Image();
    img.onload = () => {
      document.getElementById("albumCover").src = img.src;
    };
    img.src = albumCoverUrl;

    document.getElementById("trackName").textContent = `Track: ${trackName}`;
    document.getElementById("artistName").textContent = `Artist: ${artistName}`;
  })
  .catch(err => console.error("Track fetch error:", err));
}

export function startTrackPolling() {
  function poll() {
    updateTrackInfo();
    setTimeout(poll, 3000);
  }
  poll();
}
