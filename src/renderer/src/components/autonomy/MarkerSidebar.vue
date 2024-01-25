<script>

export default {

    data() {
        return {
            markerTypes: [
                { type: "Hammer" },
                { type: "Bottle" },
                { type: "ArUco" }
            ],
            selected: false,
            markers: [],

        }
    },
    mounted() {
        this.changeSelected();
    },
    methods: {
        changeSelected() {
            //this.$emit('markerTypeChange', marker);
            const marker = document.getElementById("markerType");
            if (marker.value == "ArUco") {
                this.selected = true;
            } else {
                this.selected = false;
            }
        },
        addMarker() {
            let latitude = document.getElementById("inputLatitude").value;
            let longitude = document.getElementById("inputLongitude").value;
            let markerType = document.getElementById("markerType").value;

            if (this.selected == true) {
                let markerID = document.getElementById("markerID").value;
                let marker = { latitude: latitude, longitude: longitude, markerType: markerType, markerID: markerID };
                this.markers.push(marker);
            } else {
                //console.log(x, y, markerType);
                let marker = { latitude: latitude, longitude: longitude,  markerType: markerType };
                this.markers.push(marker);
            }
            console.log(this.markers);
            //console.log(this.allMarkers[0].x);
            //console.log("changeSelected")
        },
        deleteMarker(marker){
            this.markers.splice(this.markers.indexOf(marker), 1);
        },
        sendMarkers(){
         //   this.$emit('sendMarkers', this.markers);
        }
    },
}
</script>

<template id="bodyMarkerSideBar">
    <div>
        <header class="header">
            <ul>
                <li v-for="task in markers">
                    <div id="markerTypeImg"><img src="" alt="">{{ task.markerType }}</div>
                    <div id="coordinateLatitudeLongitude">
                        {{ task.latitude }}
                        {{ task.longitude }}
                    </div>
                    <div id="markerIDOutput">
                        {{ task.markerID }}
                    </div>
                    <div id="greenRedButtons">
                        <button id="greenButton"></button>
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
                <div class="markerTypes">
                    <select id="markerType" @click="this.changeSelected()">
                        <option v-for="marker in markerTypes"> {{ marker.type }} </option>
                    </select>
                    <input id="markerID" v-if="this.selected" type="text" maxlength="4">
                </div>

            </div>
            <div class="abortAndPauseButton">
                <button class="buttons" id="abortButton">
                    Abort
                </button>
                <button class="buttons" id="pauseButton">
                    Pause
                </button>
            </div>

        </div>


    </div>
</template>

<style scoped>
/* #bodyMarkerSideBar {} */


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
#greenRedButtons{
    float: right;
    margin-right: .5rem;
}

#greenButton{
    background-color: rgb(63, 248, 63);
    border-radius: 50%;
    height: 1rem;
}

#redButton{
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