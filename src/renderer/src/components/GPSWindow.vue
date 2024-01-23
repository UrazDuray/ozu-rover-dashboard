<script>
import MarkerSidebar from './MarkerSidebar.vue';
import mapboxgl from 'mapbox-gl';
//import audio1 from '../assets/sounds/sound.mp3';

export default {
  name: "GPSWindow",
  components: {
    MarkerSidebar
  },
  data() {
    return {
      map: null,
      mapboxAccessToken: "pk.eyJ1IjoiZW1yZWhhbmNldGluIiwiYSI6ImNscW5tcXZrODMwOTQycXJxZWVyYzYwNmoifQ.d_BUVkl22ZIhhK1_Qrt34g",
    };
  },
  mounted() {
    mapboxgl.accessToken = this.mapboxAccessToken; // Set the Mapbox access token

    this.map = new mapboxgl.Map({
      //container: this.$refs.map,
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      //style: 'mapbox://styles/mapbox/streets-v12',
      //style: 'mapbox://styles/mapbox/dark-v11',
      //style: 'mapbox://styles/examples/cj68bstx01a3r2rndlud0pwpv',
      zoom: 18,
      //zoom:9,
      //center: [29.260582, 41.032640], // Ozyeğin Footbal Field
      //center:[-110.7921091,38.4051641],
      center: [-110.7916091, 38.4063641], // better than other location
      //41.032640, 29.260582
      /*pitch: 80,
      bearing: 41,*/
    });

    this.map.on('style.load', () => {

      this.map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 18
      });

      this.map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

    });

    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-110.7936091, 38.4063641]
          },
          properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-110.7916091, 38.4063641]
          },
          properties: {
            title: 'Mapbox',
            description: 'San Francisco, California'
          }
        }
      ]
    };

    for (const feature of geojson.features) {
       //create a HTML element for each feature
      const temp = document.createElement('div');
      temp.className = 'marker';

       //make a marker for each feature and add to the map
      new mapboxgl.Marker(this.temp).setLngLat([-110.7916091, 38.4068641]).addTo(this.map);
    }
    // MARKERS
    /*const marker3 = new mapboxgl.Marker()
      .setLngLat([-110.7916091, 38.4068641])
      .addTo(this.map);
    const marker1 = new mapboxgl.Marker()
      .setLngLat([-110.7916091, 38.4068641])
      .addTo(this.map);
    const marker2 = new mapboxgl.Marker()
      .setLngLat([-110.7915091, 38.4063641])
      .addTo(this.map);
*/
  },
}


</script>
<template id="body">
  <div class="interface">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right">
    <MarkerSidebar></MarkerSidebar>
    </div>
  </div>
  <div id="map" ref="map"></div>
  <!-- The Div label, which is the CSS-CCS class, serves to give the appearance of a coordinate system on the map.  -->
  <div class="grid-container">
    <div class="css-ccs">
      <div class="dot" style="--x: -3;"></div>
      <div class="dot" style="--x: 0;"></div>
      <div class="dot" style="--x: 1;"></div>
      <div class="dot" style="--x: 2;"></div>
    </div>
  </div>
</template>
<style scoped>

#map {
  width: 100vw;
  height: 100vh;
  filter: grayscale(100%) contrast(100%) brightness(50%) sepia(100%) saturate(200%) hue-rotate(60deg) brightness(60%) contrast(135%);
  /* sepia(100%) hue-rotate(165deg) saturate(40%) brightness(0.7); */
  position: absolute;
}
.interface{
  position: absolute;
  height: 100vh;
  width: 100vw;
  display:flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  color: white;
  z-index: 100;
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
.grid-container {
  padding: none;
  margin: none;
  position: absolute;
  width: 100vw;
  height: 100vh;
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