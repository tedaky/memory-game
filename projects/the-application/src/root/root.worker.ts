/// <reference lib="webworker" />

addEventListener('message', (event: MessageEvent): void => {
  const response = `worker response to ${event.data}`
  postMessage(response)
})
