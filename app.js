var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=4QUt-dLizN6NO8PXF2HUHABnkDXE9Ut8Oe4C7CqfKgY";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });


corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      const plantData = JSON.parse(request.response).data;
      addData(plantData);
    })
);

const addData = (plants) => {
  const goodPlants = plants.filter(plant => plant.year == 1753);
  goodPlants.forEach(plant => {
    putPlant(plant);
  });
}

const putPlant = (plant) => {
  console.log(plant)
  let newDiv = document.createElement('div');
  let title = document.createElement('h3');
  title.innerHTML = plant.common_name;
  let pic = document.createElement('img');
  pic.setAttribute("src", plant.image_url);
  newDiv.appendChild(title);
  newDiv.appendChild(pic);
  document.getElementById('plants').appendChild(newDiv);
}


