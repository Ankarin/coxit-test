export const fetchTracks = async () => {
  return await fetch("https://onair.radioapi.io/thisisgo/go/onair.json");
};
