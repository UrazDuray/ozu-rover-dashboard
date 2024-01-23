<script>
export default {
    

}
</script>

<template id="bodyMarkerSideBar">
    <div>
        <header class="header">
            <ul>
                <li> TASK-2 </li>
                <li> <!-- v-for --> </li>
            </ul>
        </header>

        <div class="section">
            <div class="addButton">
                <button class="buttons">
                    Add
                </button>
            </div>
            <div class="inputs">

                <input type="text" placeholder="X coordinate">
                <input type="text" placeholder="Y coordinate">
                <option value="">
                    <select name="" id="">
                        <!-- v-for -->
                    </select>
                </option>
            </div>
            <div class="abortAndPauseButton">
                <button class="buttons">
                    Abort
                </button>
                <button class="buttons">
                    Pause
                </button>
            </div>

        </div>


    </div>
</template>

<style scoped>
#bodyMarkerSideBar {
}


.header {
    height: 40vh;

}

.header ul li {
    list-style: none;

}

.section {
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.addButton {
    width: 100%;
    display: block;
}
.abortAndPauseButton {
    
}

.buttons {
    color: black;
}

</style>