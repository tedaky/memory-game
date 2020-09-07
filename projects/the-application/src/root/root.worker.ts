/// <reference lib="webworker" />

self.addEventListener('message', (event: MessageEvent): void => {
  const response = `worker response to ${event.data}`
  self.postMessage(response)
})
