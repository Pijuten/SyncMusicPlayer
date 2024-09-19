<template>
  <div @click="handleHideContextMenu">
    
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6 overflow-hidden">
    <FileBrowser ref="fileBrowserRef" />
    <Playlist/>
  </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import FileBrowser from "./components/FileBrowser.vue";
import Playlist from "./components/Playlist.vue";

export default {
  components: {
    FileBrowser,
    Playlist
  },
  setup() {
    // Define a proper type for the ref using `InstanceType<typeof FileBrowser>`
    const fileBrowserRef = ref<InstanceType<typeof FileBrowser> | null>(null);

    // Method to handle the click event and call a method from FileBrowser
    const handleHideContextMenu = () => {
      if (fileBrowserRef.value) {
        // Call the desired method of FileBrowser, replace `hideContextMenu` with the actual method name
        fileBrowserRef.value.hideContextMenu(); 
      }
    };

    return {
      handleHideContextMenu,
      fileBrowserRef
    };
  }
}
</script>
