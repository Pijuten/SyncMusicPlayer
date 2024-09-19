<template>
    <!-- Playlist (right column with drag and drop) -->
    <div class="w-1/4 h-[500px] bg-white rounded-lg shadow-xl overflow-auto mr-6 max-h-[80vh]">
        <div class="p-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-6">Playlist</h1>

            <!-- Container for drag-and-drop -->
            <Container v-if="fileQueue.queue.value.length" @drop="onDrop">
                <Draggable v-for="(filePath, index) in fileQueue.queue.value" :key="filePath">
                    <li
                        class="flex items-center p-3 rounded-lg transition duration-150 ease-in-out hover:bg-gray-50 cursor-pointer">
                        <span class="text-gray-700">{{ getFileName(filePath) }}</span>
                    </li>
                </Draggable>
            </Container>
        </div>
    </div>
</template>

<script setup lang="ts">
import { fileQueue } from '../store/FileQueueStore'
import { Container, Draggable } from 'vue3-smooth-dnd'
// Handle the drop event
const onDrop = ({ removedIndex, addedIndex }: { removedIndex: number; addedIndex: number}): void => {
    fileQueue.reorderQueue(removedIndex, addedIndex);
};

const getFileName = (filePath: string | undefined | null): string => {
  if (!filePath) return ''; // Handle undefined or null
  return filePath.split('/').pop() || '';
}
</script>