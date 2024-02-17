<script>
import ArchiveNavigator from './science/ArchiveNavigator.vue';

export default {
  name: 'ScienceWindow',
  components: {
    ArchiveNavigator
  },
  data() {
    return {
      archives: [
        { id: 1, name: 'Archive 1' },
        { id: 2, name: 'Archive 2' },
        { id: 3, name: 'Archive 3' },
        { id: 4, name: 'Archive 4' },
        { id: 5, name: 'Archive 5' }
      ],
      selectedArchiveName: ''
    };
  },
  methods: {
    handleNewLog() {
      const newArchiveId = this.archives.length + 1;
      const newArchiveName = `Archive ${newArchiveId}`;
      const newArchive = { id: newArchiveId, name: newArchiveName };
      this.archives.push(newArchive);
    },
    handleCapturePanaroma() {
      console.log('Capture Panaroma');
    },
    handleCaptureHighDef() {
      console.log('Capture High-Def');
    },
    handleArchiveSelected(archive) {
      this.selectedArchiveName = archive.name;
    }
  }
};
</script>

<template>
  <div>
    <div class="space-between"></div>
    <ArchiveNavigator :archives="archives" @archive-selected="handleArchiveSelected" />

    <div class="space-between"></div>

    <div class="button-container">
      <button style="background-color: red; margin-right: 100px; margin-left: 20px" @click="handleNewLog">
        Create New Log
      </button>
      <button style="background-color: red; margin-right: 100px" @click="handleCapturePanaroma">
        Capture Panaroma
      </button>
      <button style="background-color: red" @click="handleCaptureHighDef">Capture High-Def</button>
    </div>

    <div class="space-between"></div>
    
    <div v-if="selectedArchiveName">Selected Archive: {{ selectedArchiveName }}</div>
  </div>
</template>

<style scoped>
.space-between {
  margin-bottom: 20px;
}
</style>
