<script>
export default {

    data(){
        return{
            
        }
    }
 
}
</script>

<template id="bodyMarkerSideBar">
    <div>
        <header class="header">
            <ul>
                <li> TASK-1 </li>
                <li> TASK-2 </li>
                <li> TASK-3 </li>
                <li> <!-- v-for --> </li>
            </ul>
        </header>

        <div class="section">
            <div class="addButton">
                <button class="buttons" id="addButton">
                    Add
                </button>
            </div>
            <div class="inputs">

                <div class="coordinate">
                    <input id="inputX" type="text" placeholder="LAT">
                    <input id="inputY" type="text" placeholder="LON">
                </div>

                <!-- Marker Types -->
                <div class="markerTypes">
                    <select name="" id="">
                        <option value=""> Deneme1 <!-- v-for --></option>
                        <option value=""> Deneme2 </option>
                        <!-- We will use components here. -->
                    </select>
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
}

.inputs select,
.inputs select option {
    color: black;
    height: 35%;
    display: flex;
    flex-direction: row;
}

.markerTypes{
    display: flex;
    justify-content: center;
    align-items: center;
}

.addButton {
    width: 100%;
    display: block;
}

.abortAndPauseButton{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.buttons {
    color: black;
}


</style>