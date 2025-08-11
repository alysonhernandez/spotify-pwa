export function updateTrackInfo() {
  const token = localStorage.getItem("spotifyToken");
  if (!token) return alert("Login first");

  fetch("https://api.spotify.com/v1/me/player", {
    method: "GET",
    headers: { "Authorization": "Bearer " + token }
  })
  .then(res => {
    if (!res.ok) throw new Error("No active device or playback");
    return res.json();
  })
  .then(data => {
    const track = data.item;
    if (!track) throw new Error("No track loaded");

    const trackName = track.name;
    const artistName = track.artists.map(artist => artist.name).join(", ");
    const albumCoverUrl = track.album.images[0].url;

    document.getElementById("trackName").textContent = `Track: ${trackName}`;
    document.getElementById("artistName").textContent = `Artist: ${artistName}`;
    document.getElementById("albumCover").src = albumCoverUrl;
  })
  .catch(err => {
    console.error("Error fetching player info:", err);
    document.getElementById("trackName").textContent = "Track: (none)";
    document.getElementById("artistName").textContent = "Artist: (none)";
    document.getElementById("albumCover").src = "";
  });
}
