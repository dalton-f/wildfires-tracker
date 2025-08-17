document.addEventListener("DOMContentLoaded", async () => {
  const wildfireData = await fetchData(
    "https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires&status=open&days=31"
  );

  const wildfires = wildfireData.events;

  const map = L.map("map").setView([0, 0], 2);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  for (const wildfire of wildfires) {
    const geometry = wildfire.geometry?.[0];
    if (!geometry || !geometry.coordinates) return;

    const [lng, lat] = wildfire.geometry[0].coordinates;
    const title = wildfire.title;
    const date = geometry.date;

    const marker = L.marker([lat, lng], { alt: title }).addTo(map);
    marker.bindPopup(
      `<strong>${title}</strong><br>${new Date(date).toLocaleString()}`
    );
  }
});

const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
