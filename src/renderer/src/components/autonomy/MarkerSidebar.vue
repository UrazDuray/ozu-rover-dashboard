<script>
import MarkerDictionary from './Types.js';
import MarkerIcon from './MarkerIcon.vue';

export default {
  data() {
    return {
      flaskBackendUrl: "http://127.0.0.1:5000/goal/", // URI for Back-end
      dictionary: new MarkerDictionary(),
      markerTypes: [
        { type: "Hammer" },
        { type: "Bottle" },
        { type: "ArUCO" }
      ],
      selected: "Hammer",
      markers: [],
      marker: {
        type: undefined,
        latitude: undefined,
        longitude: undefined,
        markerID: undefined,
        id: undefined
      },
      center: [-110.7916091, 38.4063641],
    }
  },
  components:{
    MarkerIcon
  },
  methods: {
    addMarker() {
      let latitude = document.getElementById("inputLatitude").value;
      let longitude = document.getElementById("inputLongitude").value;
      let markerType = document.getElementById("markerType").value;
      let markerID = undefined;
      let id = this.generateID();
      
      if (this.hasAdditionalOptions()) {
        markerID = document.getElementById("markerID").value;
      }
      
      let marker = {
        latitude: latitude,
        longitude: longitude,
        markerType: markerType,
        markerID: markerID,
        id: id
      };

      this.markers.push(marker);
      this.$emit("addMarker", latitude, longitude, markerType, markerID, id);
    },
    deleteMarker(marker) {
      this.markers.splice(this.markers.indexOf(marker), 1);
      this.$emit("deleteMarker", marker.id);
    },
    sendMarker(mark) {
      this.marker.gps[0] = mark.latitude;
      this.marker.gps[1] = mark.longitude;
      this.marker.type = this.dictionary.getID(mark.markerType);
      axios.post(this.flaskBackendUrl + "enqueue", this.marker).then((response) => {
        console.log("Successful", response);
      }).catch((error) => {
        console.log("Error :", error);
      });
    },
    abortButton() {
      this.marker.gps[0] = mark.latitude;
      this.marker.gps[1] = mark.longitude;
      this.marker.type = mark.markerType;
      console.log(this.marker);
      axios.post(this.flaskBackendUrl + "abort", this.marker).then((response) => {
        console.log("Successful", response);
      }).catch((error) => {
        console.log("Error: :", error);
      });
    },
    hasAdditionalOptions() {
      if (this.selected == "ArUCO") {
        return true;
      } else {
        return false;
      }
    },
    generateID() {
      var id = 0;
      return function () {
        return id++;
      }
    }
  }
}
</script>

<template id="bodyMarkerSideBar">
  <div class="containerMarkerSidebar">
    <header class="header">
      <ul>
        <li v-for="task in markers">
          <div id="markerTypeImg"><img src="Hammer.svg" alt="">{{ task.markerType }}</div>
          <div id="coordinateLatitudeLongitude">
            {{ task.latitude }}
            {{ task.longitude }}
          </div>
          <div id="markerIDOutput">
            {{ task.markerID }}
          </div>
          <div id="greenRedButtons">
            <button id="greenButton" @click="sendMarker(task)"></button>
            <button id="redButton" @click="deleteMarker(task)"></button>
          </div>
        </li>
      </ul>
    </header>
    <div class="section">
      <div class="addButton">
        <button @click="this.addMarker()" class="buttons" id="addButton">
          Add
        </button>
      </div>
      <div class="inputs">
        
        <div class="coordinate">
          <input id="inputLatitude" type="text" placeholder="LAT">
          <input id="inputLongitude" type="text" placeholder="LON">
        </div>
        
        <!-- Marker Types -->
        <!-- <img :src="Hammer" alt="Hammer"> -->
        <!-- <Hammer /> -->
        <div class="markerTypes">
          <select v-model="selected" id="markerType">
            <option v-for="marker in markerTypes">
              <span id="optionSelector">
                {{ marker.type }}
              </span>
            </option>
          </select>
          <MarkerIcon :id="this.dictionary.getID(this.selected)"/>
          <input v-if="hasAdditionalOptions()" id="markerID" type="text" maxlength="4">
        </div>
        

      </div>
      <div class="abortAndPauseButton">
        <button class="buttons" id="abortButton">
          Abort
        </button>
        <!-- <button class="buttons" id="pauseButton">
                Pause
            </button> -->
   </div>

    </div>


  </div>
</template>

<style scoped>
.containerMarkerSidebar {
  pointer-events: all;
}

.header {
  height: 35vh;
}

.header ul li {
  list-style: none;

}

#markerTypeImg {
  display: inline-block;
  margin-left: -1rem;
}

#coordinateLatitudeLongitude {
  display: inline-block;
  margin: .4rem;
}

#markerIDOutput {
  display: inline-block;
  margin: .4rem;
}

#greenRedButtons {
  float: right;
  margin-right: .5rem;
}

#greenButton {
  background-color: rgb(63, 248, 63);
  border-radius: 50%;
  height: 1rem;
}

#redButton {
  background-color: red;
  border-radius: 50%;
  height: 1rem;
}

.section {
  height: 20vh;
  display: flex;
  flex-direction: column;
}

#addButton {
  display: flex;
  float: right;
}

.inputs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}

.coordinate {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30%;
  height: 100%;
  color: black;
}

#inputLatitude,
#inputLongitude {
  color: black;
}

.inputs select,
.inputs select option {
  color: black;
  height: 35%;
  display: flex;
  flex-direction: row;
  text-align: center;
}

.markerTypes {
  display: flex;
  justify-content: center;
  align-items: center;
}

#markerID {
  width: 3rem;
  margin-left: .5rem;
  color: black;
}


.addButton {
  width: 100%;
  display: block;
}

.abortAndPauseButton {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.buttons {
  color: black;
}
</style>