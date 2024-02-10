<template id="body">
  <div class="interface">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right">
      <MarkerSidebar @addMarker="addMarkerAtMap" @deleteMarker="deleteMarkerAtMap"></MarkerSidebar>
    </div>
  </div>
  <div id="map" ref="map"></div>
  <div class="gridContainer">
    <div class="css-ccs">
      <div class="dot" style="--x: -3;"></div>
      <div class="dot" style="--x: 0;"></div>
      <div class="dot" style="--x: 1;"></div>
      <div class="dot" style="--x: 2;"></div>
    </div>
  </div>
</template>

<script>
import MarkerSidebar from './autonomy/MarkerSidebar.vue';
import mapboxgl from 'mapbox-gl';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

export default {
  name: "GPSWindow",
  components: {
    MarkerSidebar
  },
  data() {
  },
  mounted() {
    this.map = L.map("map", {
      center: L.latLng(40.731253, -73.996139),
      zoom: 12,
    });
    
    L.tileLayer("http://localhost:3000/?z={z}&x={x}&y={y}.png", {
    }).addTo(this.map);

    L.marker([38.4065, -110.7919]).addTo(this.map);
  },
  methods: {
    addMarkerAtMap(latitude, longitude) {
      // console.log(latitude, longitude);
      // var newMarkerObject = new mapboxgl.Marker().setLngLat([latitude, longitude]).addTo(this.map);
      // var newMarker = { markerObject: newMarkerObject, latitude: latitude, longitude: longitude };
      // this.allMarkers.push(newMarker);
      // console.log(this.allMarkers);
      window.alert("Marker added");
    },
    deleteMarkerAtMap(latitude, longitude) {
      // for (let i = 0; i < this.allMarkers.length; i++) {
      //   if (this.allMarkers[i].latitude == latitude && this.allMarkers[i].longitude == longitude) {
      //     this.allMarkers[i].markerObject.remove();
      //     this.allMarkers.splice(i, 1);
      //     break;
      //   }
      // }
    },
    push() {
    }
  },
}
</script>


<style scoped>
#body {
  overflow: hidden;
}

#map {
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    width: 100vw;
    filter: sepia(100%) hue-rotate(90deg) saturate(100%) brightness(70%) contrast(200%);
}

.interface {
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  color: white;
  z-index: 100;
  pointer-events: none;
  overflow: hidden;
}

.center {
  width: 100%;
  height: 100%;
  z-index: 100;
}

.right {
  margin: 20px;
  height: 60%;
  border-radius: 10px;
  background-color: rgba(50, 117, 53, 0.349);
}

.gridContainer {
  padding: none;
  margin: none;
  position: absolute;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.css-ccs {
  --c: 10;
  --cx: 5;
  --cy: 5;
  --dsize: 10;
  --dcolor: #369;
  --size: 100%;
  position: relative;
  width: var(--size);
  height: 0;
  padding-top: var(--size);
  box-sizing: border-box;
  aspect-ratio: 1/1;
  pointer-events: none;
  background-image:
    linear-gradient(#00000000 calc(var(--cy) * 100% / var(--c) - 1px), #00000000 0 calc(var(--cy) * 100% / var(--c) + 1px), transparent 0),
    linear-gradient(to right, #0000 calc(var(--cx) * 100% / var(--c) - 1px), #00000000 0 calc(var(--cx) * 100% / var(--c) + 1px), transparent 0),
    repeating-linear-gradient(rgba(0, 0, 0, 0) 0 0.5px, #0000 0 calc(100% / var(--c) - 2.0px), rgba(0, 0, 0, 0.384) 0 calc(100% / var(--c))),
    repeating-linear-gradient(to right, #0002 0 0.5px, #0000 0 calc(100% / var(--c) - 2.0px), rgba(0, 0, 0, 0.384) 0 calc(100% / var(--c)));
}

.css-ccs.no-overflow {
  overflow: hidden;
}

.css-css .dot {
  --translationUnit: 100% / var(--c);
  --translationX: var(--translationUnit) * var(--cx);
  --translationY: var(--translationUnit) * var(--cy);
  /* Vertical is "flipped" in CSS: higher values go down! Do negative! */
  --y: calc(var(--translationY) - var(--translationUnit) * var(--function));
  width: calc(var(--dsize) * 1px);
  height: calc(var(--dsize) * 1px);
  background: var(--dcolor);
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  left: calc(var(--translationX) + var(--x) * var(--translationUnit));
  top: var(--y);
}

.marker {
  background-image: url('../assets/cekic.jpeg');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>