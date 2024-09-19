import { ref, readonly, Ref } from 'vue';

// Define the type for each queue item
export interface FileItem {
  name: string;
  path: string;
}

interface FileQueueStore {
  queue: Ref<readonly FileItem[]>; 
  enqueue: (fileName: string, filePath: string) => void;
  enqueueFirst: (fileName: string, filePath: string) => void;
  dequeue: () => FileItem | undefined;
  peek: () => FileItem | undefined;
  isEmpty: () => boolean;
  size: () => number;
  reorderQueue: (removedIndex: number, addedIndex: number) => void;
  removeFromQueue: (index: number) => void; // Added the method to the interface
}

const queue = ref<FileItem[]>([]); // The queue now holds FileItem objects

function createFileQueue(): FileQueueStore {
  function enqueue(fileName: string, filePath: string): void {
    queue.value.push({ name: fileName, path: filePath });
  }
  
  function enqueueFirst(fileName: string, filePath: string): void {
    queue.value.unshift({ name: fileName, path: filePath });
  }

  function dequeue(): FileItem | undefined {
    return queue.value.shift();
  }

  function peek(): FileItem | undefined {
    return queue.value[0];
  }

  function isEmpty(): boolean {
    return queue.value.length === 0;
  }

  function size(): number {
    return queue.value.length;
  }

  function reorderQueue(removedIndex: number, addedIndex: number): void {
    const currentQueue = [...queue.value]; // Create a copy of the queue
    const [movedItem] = currentQueue.splice(removedIndex, 1); // Remove the item
    currentQueue.splice(addedIndex, 0, movedItem); // Insert the item at the new position
    queue.value = currentQueue; // Re-assign to trigger reactivity
  }

  function removeFromQueue(index: number): void {
    queue.value.splice(index, 1); // Remove item at the specific index
  }

  return {
    queue: readonly(queue),  // Provide readonly access to the queue externally
    enqueue,
    enqueueFirst,
    dequeue,
    peek,
    isEmpty,
    size,
    reorderQueue,
    removeFromQueue  // Add the method to the return object
  };
}

export const fileQueue = createFileQueue();