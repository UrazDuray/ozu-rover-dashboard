<script>
 import mapboxgl from 'mapbox-gl';
 
export default {
  name: "GPSWindow",
  data() {
    return {
      map: null,
      mapboxAccessToken: "pk.eyJ1IjoiZW1yZWhhbmNldGluIiwiYSI6ImNscW5tcXZrODMwOTQycXJxZWVyYzYwNmoifQ.d_BUVkl22ZIhhK1_Qrt34g"
    };
  },
  mounted() {
    mapboxgl.accessToken = this.mapboxAccessToken; // Set the Mapbox access token

    this.map = new mapboxgl.Map({
      //container: this.$refs.map,
      container:'map',
      //style: 'mapbox://styles/mapbox/satellite-streets-v12',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 18,
      //zoom:9,
      //center: [29.260582, 41.032640],
      //center:[-110.7921091,38.4051641],
      center:[-110.7916091,38.4063641],


      //41.032640, 29.260582
    /*pitch: 80,
    bearing: 41,*/
    });

    this.map.on('style.load', () => {s  
      this.map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 18
      });
    
      this.map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    });
      const marker1 = new mapboxgl.Marker()
        .setLngLat([-110.7916091,38.4063641])
        .addTo(this.map);
      const marker2= new mapboxgl.Marker()
        .setLngLat([-110.7915091,38.4063641])
        .addTo(this.map);
  }
};


</script>
<template>
  <div class="">
    <div id="map" ref="map" style="width:100%;"></div>
  </div>
</template>
<style scoped>

#map{
  height: 100vh;
}


</style>