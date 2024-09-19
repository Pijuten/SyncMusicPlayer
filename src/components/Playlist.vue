<template>
    <div class="w-1/4 h-[500px] bg-white rounded-lg shadow-xl overflow-auto mr-6 max-h-[80vh]">
      <div class="p-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Playlist</h1>
  
        <!-- Container for drag-and-drop -->
        <Container v-if="queueItems.length" @drop="onDrop" drag-handle-selector=".drag-handle">
          <Draggable v-for="(fileItem, index) in queueItems" :key="fileItem.path">
            <li class="flex items-center p-3 rounded-lg transition duration-150 ease-in-out hover:bg-gray-50">
              <div class="drag-handle mr-2"
                   :class="{ 'cursor-grabbing': isGrabbing, 'cursor-grab': !isGrabbing }"
                   @mousedown="isGrabbing = true" @mouseup="isGrabbing = false"
                   @mouseleave="isGrabbing = false">
                <Menu class="text-gray-400 hover:text-gray-600" />
              </div>
              <span class="text-gray-700 truncate">{{ getFileName(fileItem) }}</span>
              <div class="ml-auto flex items-center">
                <X class="text-gray-400 hover:text-gray-600" @click="removeFromQueue(index)" />
              </div>
            </li>
          </Draggable>
        </Container>
      </div>
    </div>
  </template>
  
  <script>
  import { fileQueue } from '../store/FileQueueStore';
  import { Container, Draggable } from 'vue3-smooth-dnd';
  import { Menu, X } from 'lucide-vue-next';
  import { computed } from 'vue';
  
  export default {
    components: {
      Container,
      Draggable,
      Menu,
      X
    },
    setup() {
      const queueItems = computed(() => fileQueue.queue.value || []);
        const onDrop = ({ removedIndex, addedIndex }) => {
          fileQueue.reorderQueue(removedIndex, addedIndex);
        };
        const getFileName = (fileItem) => {
          if (!fileItem) return '';
          return fileItem.name.split('/').pop() || '';
        };
        const removeFromQueue = (index) => {
          fileQueue.removeFromQueue(index);
        };
      return {
        queueItems,
        fileQueue,
        isGrabbing: false,
        onDrop,
        getFileName,
        removeFromQueue
      };
    }
  };
  </script>