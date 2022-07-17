export const getLocation = (lat, long) => {
  return fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`,
    {
      //options => (optional)
      method: "get", //Get / POST / ...
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch(function (err) {
      return err;
      // Called if the server returns any errors
    });
};
