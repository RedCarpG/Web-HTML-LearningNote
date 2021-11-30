/** Video Player
 * 
*/
function video_playPause() {
    example_video = document.getElementById("example_video");
    if (example_video.paused) {
        example_video.play();
    } else {
        example_video.pause();
    }
}

/** Canvas
 * 
*/
function canvas_draw() {
    var canvas = document.getElementById('example_canvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0,0,80,100);
}

/** Drag & Drop
 * 
*/
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
}


/** Drag & Drop
 * 
*/
var text = document.getElementById("get_location_text");
var mapholder = document.getElementById("get_location_mapholder");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        text.innerHTML = "Your browser does not suppurt this function";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    latlon = new google.maps.LatLng(lat, lon)
    mapholder.style.height = '250px';
    mapholder.style.width = '500px';

    var myOptions = {
        center: latlon,zoom:14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL}
    };
    var map = new google.maps.Map(mapholder, myOptions);
    var marker = new google.maps.Marker({position: latlon, map: map, title: "You are here!"});

    text.innerHTML = "latitude: " + lat + "<br/>" +
                     "longitude: " + lon;	
}
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            text.innerHTML = "Permission denied"
            break;
        case error.POSITION_UNAVAILABLE:
            text.innerHTML = "Position unavailable"
            break;
        case error.TIMEOUT:
            text.innerHTML = "Timeout"
            break;
        case error.UNKNOWN_ERROR:
            text.innerHTML = "Unknown error"
            break;
    }
}

/** Web Storage 
 * Here use localStorage for example
*/

//Store a value to a key
function storage_store(key, value) {
    localStorage[key]=value;
}

//Get a value from a key
function storage_get(key) {
    return localStorage.getItem(key);
}

//Delete storage
function storage_del(key) {
    localStorage.removeItem(key);
    alert("Delete success!");
    loadAll();
}


function click_store() {
    if(typeof(Storage)!=="undefined") {
        key_text = document.getElementById("store_text_key");
        value_text = document.getElementById("store_text_value");

        key = key_text.value;
        value = value_text.value;

        key_text.value = "";
        value_text.value = "";

        var o = new Object;
        o.key = key;
        o.value = value;
        storage_store(key, JSON.stringify(o));

    } else {
        document.getElementById("store_text_key").innerHTML="Sorry, your browser does not support web storage.";
    }
}

function click_get() {
    if(typeof(Storage)!=="undefined") {
        key = document.getElementById("get_text_key").value;
        value = JSON.parse(storage_get(key)).value;
        document.getElementById("get_text_value").innerHTML=value;
    } else {
        document.getElementById("get_text_key").innerHTML="Sorry, your browser does not support web storage.";
    }
}

/** Workers
 *  
 */
 var w;

 function workerStart() {
     if(typeof(Worker) !== "undefined") {
         if(typeof(w) == "undefined") {
             w = new Worker("demo_workers.js");
         }
         w.onmessage = function(event) {
             document.getElementById("woker_result").innerHTML = event.data;
         };
     } else {
         document.getElementById("woker_result").innerHTML = "Sorry, your browser does not support Web Workers...";
     }
 }
 
 function workerStop() { 
     w.terminate();
     w = undefined;
 }

 /** SSE (Server sent event)
  * 
  */
  if(typeof(EventSource)!=="undefined") {
      var source=new EventSource("demo_sse.php");
      source.onmessage=function(event) {
          document.getElementById("sse_result").innerHTML+=event.data + "<br>";
      };
  } else {
      document.getElementById("sse_result").innerHTML="Sorry, your brower does not support server-sent event...";
  }