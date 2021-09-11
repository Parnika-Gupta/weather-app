window.addEventListener("load", () => {
  let long;
  let lat;

  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );

  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature-degree-span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      let para = document.querySelector(".icon");
      let img = new Image();
      const api = `http://api.weatherapi.com/v1/current.json?key=eb9c8cbc3cb24036981164810211109&q=${lat},${long}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp_f, temp_c, condition } = data.current;
          //Set DOM Elements from the API
          temperatureDegree.textContent = temp_f;
          temperatureDescription.textContent = condition.text;
          locationTimezone.textContent = `${data.location.tz_id}`;
          img.src = data.current.condition.icon;
          para.appendChild(img);

          //Change Temp

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = temp_c;
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temp_f;
            }
          });
        });
    });
  }
});
