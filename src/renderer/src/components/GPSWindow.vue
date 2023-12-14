<script>
 import mapboxgl from 'mapbox-gl';

export default {
  data() {
    return {
      map: null,
      mapboxAccessToken: "pk.eyJ1IjoiZW1yZWhhbmNldGluIiwiYSI6ImNscTVnZndlNDA2emEyanA3azRsb3luYjcifQ.WxKanmEldiLBF_LtCxIWmA"
    };
  },
  mounted() {
    mapboxgl.accessToken = this.mapboxAccessToken; // Set the Mapbox access token

    this.map = new mapboxgl.Map({
      container: this.$refs.map,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      zoom: 17,
      //center: [29.260582, 41.032640],
      center:[-110.7921091,38.4051641],


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
  }
};


</script>
<template>
  <div class="">
    <div ref="map" style="width: 100%; height: 500px;"></div>
  </div>
</template>
<style scoped>

.container{
  border: 1px solid red;
}


</style>