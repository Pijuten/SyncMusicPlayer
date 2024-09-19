<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6 overflow-hidden" @click="hideContextMenu">
    <!-- File Browser (left column) -->
    <div class="w-3/4 h-[500px] bg-white rounded-lg shadow-xl overflow-auto ml-6 max-h-[80vh]">
      <div class="p-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">File Browser</h1>
        <!-- Search Component -->
        <SearchComponent @search="handleSearch" />
        <!-- Breadcrumb -->
        <nav class="flex mb-6" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li v-for="(crumb, index) in breadcrumbs" :key="index" class="inline-flex items-center">
              <ChevronRightIcon v-if="index > 0" class="w-5 h-5 text-gray-400" />
              <a href="#" @click.prevent="navigateTo(crumb.path)"
                class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                :class="{ 'text-gray-500 hover:text-gray-700': index < breadcrumbs.length - 1 }">
                {{ crumb.name }}
              </a>
            </li>
          </ol>
        </nav>
        <!-- File list -->
        <ul class="space-y-2">
          <li v-for="item in filteredItems" :key="item.path" @click="navigateTo(item.path)"
            @contextmenu.prevent="showContextMenu($event, item)"
            class="flex items-center p-3 rounded-lg transition duration-150 ease-in-out hover:bg-gray-50 cursor-pointer">
            <FolderIcon v-if="item.type === 'folder'" class="w-6 h-6 text-blue-500 mr-3" />
            <FileIcon v-else class="w-6 h-6 text-gray-500 mr-3" />
            <span class="text-gray-700">{{ item.name }}</span>
          </li>
        </ul>
        <!-- Empty state -->
        <div v-if="filteredItems.length === 0" class="text-center py-12">
          <FolderOpenIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p class="text-xl font-medium text-gray-600">No results found</p>
          <p class="text-gray-500 mt-2">
            {{ searchQuery ? 'No matching files or folders.' : 'This folder is empty.' }}
          </p>
        </div>
      </div>
    </div>
    
    <Playlist/>

    <!-- Custom Context Menu -->
    <RightClickMenu :visible="contextMenuVisible" :position="contextMenuPosition" :item="selectedItem"
      :fullPath="selectedItemFullPath" @menuOptionSelected="handleMenuOption" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FolderIcon, FileIcon, ChevronRightIcon, FolderOpenIcon } from 'lucide-vue-next'
import RightClickMenu from './RightClickMenu.vue'
import SearchComponent from './SearchComponent.vue'
import { fileQueue } from '../store/FileQueueStore'

// Mock file system structure (unchanged)
const fileSystem = {
  'root': [
    { name: 'Documents', type: 'folder', path: 'root/Documents' },
    { name: 'Images', type: 'folder', path: 'root/Images' },
    { name: 'readme.txt', type: 'file', path: 'root/readme.txt' },
  ],
  'root/Documents': [
    { name: 'Project Proposal.docx', type: 'file', path: 'root/Documents/Project Proposal.docx' },
    { name: 'Meeting Notes', type: 'folder', path: 'root/Documents/Meeting Notes' },
  ],
  'root/Documents/Meeting Notes': [
    { name: 'January.txt', type: 'file', path: 'root/Documents/Meeting Notes/January.txt' },
    { name: 'February.txt', type: 'file', path: 'root/Documents/Meeting Notes/February.txt' },
  ],
  'root/Images': [
    { name: 'vacation.jpg', type: 'file', path: 'root/Images/vacation.jpg' },
    { name: 'family.png', type: 'file', path: 'root/Images/family.png' },
  ],
}

const currentPath = ref('root')
const searchQuery = ref('')

// Computed properties
const currentItems = computed(() => {
  return fileSystem[currentPath.value] || []
})

const filteredItems = computed(() => {
  if (!searchQuery.value) return currentItems.value
  return Object.values(fileSystem).flat().filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})


const breadcrumbs = computed(() => {
  const paths = currentPath.value.split('/')
  return paths.map((name, index) => ({
    name: index === 0 ? 'Home' : name,
    path: paths.slice(0, index + 1).join('/')
  }))
})

const navigateTo = (path) => {
  if (fileSystem[path]) {
    currentPath.value = path
  } else {
    currentPath.value = path.substring(0, path.lastIndexOf('/'))
  }
  searchQuery.value = '' // Clear search query when navigating
}

const handleSearch = (query) => {
  searchQuery.value = query
}

// Context Menu Logic (unchanged)
const contextMenuVisible = ref(false)
const contextMenuPosition = ref({ x: 0, y: 0 })
const selectedItem = ref(null)
const selectedItemFullPath = ref('')

const showContextMenu = (event, item) => {
  contextMenuPosition.value = { x: event.pageX, y: event.pageY }
  selectedItem.value = item
  selectedItemFullPath.value = item.path
  contextMenuVisible.value = true
}

const hideContextMenu = () => {
  contextMenuVisible.value = false
}

const handleMenuOption = ({ option, item, fullPath }) => {
  if (option === "AddQueue" && item.type === "file") {
    fileQueue.enqueue(fullPath); // Only add to the end for 'AddQueue'
  } else if (option === "PlayNext" && item.type === "file") {
    fileQueue.enqueueFirst(fullPath); // Only add to the front for 'PlayNext'
  }
  console.log(`Action: ${option} on item: ${item.name}, Full Path: ${fullPath}`)
  hideContextMenu()
}

</script>

<style scoped>
/* Add any additional component-specific styles here */
</style>