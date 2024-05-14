export const useWebSocket = () => {
  const socketIOHost: string = "ws://localhost:8080";

  const ws = new WebSocket(socketIOHost);

  ws.onopen = () => {
    console.log('Connected to the server');
  };

  ws.onmessage = (event) => {
    console.log('onmessage event: ', event);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('Disconnected from the server');
  };

  return {
    ws,
  }
}