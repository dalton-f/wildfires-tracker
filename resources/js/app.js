document.addEventListener("DOMContentLoaded", async () => {
  // fetch all open EONET wildfire events in the past 14 days
  const wildfireData = await fetchData(
    "https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires&status=open&days=14"
  );

  const wildfires = wildfireData.events;

  console.log(wildfires);
});

const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(response);

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
