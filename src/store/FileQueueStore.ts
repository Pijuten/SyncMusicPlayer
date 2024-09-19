import { ref, readonly, DeepReadonly, Ref } from 'vue'

interface FileQueueStore {
  queue: Ref<readonly string[]>; 
  enqueue: (filePath: string) => void
  enqueueFirst: (filePath: string) => void
  dequeue: () => string | undefined
  peek: () => string | undefined
  isEmpty: () => boolean
  size: () => number
  reorderQueue: (removedIndex: number, addedIndex: number) => void
}

const queue = ref<string[]>([])

function createFileQueue(): FileQueueStore {
  function enqueue(filePath: string): void {
    queue.value.push(filePath)
  }
  function enqueueFirst(filePath: string): void {
    queue.value.unshift(filePath)
  }

  function dequeue(): string | undefined {
    return queue.value.shift()
  }

  function peek(): string | undefined {
    return queue.value[0]
  }

  function isEmpty(): boolean {
    return queue.value.length === 0
  }

  function size(): number {
    return queue.value.length
  }

  function reorderQueue(removedIndex: number, addedIndex: number): void {
    const currentQueue = [...queue.value]; // Create a copy of the queue
    const [movedItem] = currentQueue.splice(removedIndex, 1); // Remove the item
    currentQueue.splice(addedIndex, 0, movedItem); // Insert the item at the new position
    queue.value = currentQueue; // Re-assign to trigger reactivity
  }

  return {
    queue: readonly(queue),  // Provide readonly access to the queue externally
    enqueue,
    enqueueFirst,
    dequeue,
    peek,
    isEmpty,
    size,
    reorderQueue
  }
}

export const fileQueue = createFileQueue()