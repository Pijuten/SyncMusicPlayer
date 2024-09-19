import { ref, readonly, DeepReadonly, Ref } from 'vue'

interface FileQueueStore {
  queue: DeepReadonly<Ref<string[]>>
  enqueue: (filePath: string) => void
  enqueueFirst: (filePath: string) => void
  dequeue: () => string | undefined
  peek: () => string | undefined
  isEmpty: () => boolean
  size: () => number
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

  return {
    queue: readonly(queue) as DeepReadonly<Ref<string[]>>,
    enqueue,
    enqueueFirst,
    dequeue,
    peek,
    isEmpty,
    size
  }
}

export const fileQueue = createFileQueue()