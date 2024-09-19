<template>
    <div class="mb-6 relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search files and folders..."
        class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        @input="$emit('search', searchQuery)"
      />
      <SearchIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, Ref } from 'vue'
  import { SearchIcon } from 'lucide-vue-next'
  
  const searchQuery: Ref<string> = ref('');
  </script>