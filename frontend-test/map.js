let map;
let marker;
let watchId = null;
let isOnline = false;

// INIT MAP (called once location is known)
function initMap(lat, lng) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat, lng },
    zoom: 16,
  });

  marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
    title: "Captain",
  });
}

// SEND LOCATION TO BACKEND
function sendLocation(lat, lng) {
  fetch("http://localhost:5000/api/captains/location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // later we add Authorization: Bearer <JWT>
    },
    body: JSON.stringify({ lat, lng }),
  }).catch(err => console.error(err));
}

// START LIVE LOCATION
function startTracking() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      if (!map) {
        initMap(lat, lng);
      }

      marker.setPosition({ lat, lng });
      map.setCenter({ lat, lng });

      if (isOnline) {
        sendLocation(lat, lng);
      }
    },
    (err) => console.error(err),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
}

// STOP TRACKING
function stopTracking() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}

// BUTTON HANDLERS
document.getElementById("onlineBtn").onclick = () => {
  isOnline = true;
  document.getElementById("status").innerText = "Status: ONLINE";
  startTracking();
};

document.getElementById("offlineBtn").onclick = () => {
  isOnline = false;
  document.getElementById("status").innerText = "Status: OFFLINE";
  stopTracking();
};
