<template>
    <div
      v-if="visible"
      class="custom-context-menu"
      :style="{ top: position.y + 'px', left: position.x + 'px' }"
      @click.stop
    >
      <ul>
        <li @click="handleOptionClick('Remove')">Add to queue</li>
        <li @click="handleOptionClick('PlayNext')">Play Next</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      position: {
        type: Object,
        default: () => ({ x: 0, y: 0 }),
      },
      item: {
        type: Object,
        required: true,
      },
      fullPath: {
        type: String,
        required: true,
      },
    },
    methods: {
      handleOptionClick(option) {
        this.$emit('menuOptionSelected', { option, item: this.item, fullPath: this.fullPath });
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-context-menu {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  .custom-context-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .custom-context-menu li {
    padding: 8px;
    cursor: pointer;
  }
  .custom-context-menu li:hover {
    background-color: #f0f0f0;
  }
  </style>