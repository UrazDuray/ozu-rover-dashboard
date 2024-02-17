<script>
export default {
  name: 'ArchiveNavigator',
  props: {
    archives: {
      type: Array,
      required: true
    }
  },
  emits: ['archive-selected'],
  methods: {
    selectArchive(archive) {
      // Emit an event with the selected archive
      this.$emit('archive-selected', archive)
    }
  } // Declare the 'archive-selected' event
}
</script>

<template>
  <div class="scrolling-menu">
    <ul>
      <!-- Add @click event handler to each <li> -->
      <li v-for="(archive, index) in archives" :key="index" @click="selectArchive(archive)">
        {{ archive.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.scrolling-menu {
  overflow-y: auto;
  height: 250px;
  background-color: grey;
  padding: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

.scrolling-menu ul {
  list-style-type: none;
  padding: 0;
}

.scrolling-menu ul li {
  display: block;
  margin-bottom: 10px;
  cursor: pointer; /* Add cursor pointer to indicate clickable */
}
</style>
