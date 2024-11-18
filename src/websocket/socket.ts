import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners: Map<string, Function[]> = new Map();

  constructor() {
    this.initSocket();
  }

  private initSocket() {
    const SOCKET_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';

    this.socket = io(SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectDelay,
      timeout: 10000
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('connect_error', (error) => {
      console.log('Connection error:', error);
      this.handleReconnect();
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected:', reason);
      if (reason === 'io server disconnect') {
        this.connect(); // Reconnect if server disconnected
      }
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnection attempt ${this.reconnectAttempts}`);
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  connect(userId?: string) {
    if (!this.socket) return;

    if (userId) {
      this.socket.auth = { userId };
    }

    this.socket.connect();
  }

  disconnect() {
    if (!this.socket) return;
    this.socket.disconnect();
  }

  emit(event: string, data: any) {
    if (!this.socket?.connected) {
      console.warn('Socket not connected. Message queued.');
      return;
    }
    this.socket.emit(event, data);
  }

  on(event: string, callback: Function) {
    if (!this.socket) return;

    const eventListeners = this.listeners.get(event) || [];
    eventListeners.push(callback);
    this.listeners.set(event, eventListeners);

    this.socket.on(event, callback as any);
  }

  off(event: string, callback?: Function) {
    if (!this.socket) return;

    if (callback) {
      this.socket.off(event, callback as any);
      const eventListeners = this.listeners.get(event) || [];
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
        this.listeners.set(event, eventListeners);
      }
    } else {
      this.socket.off(event);
      this.listeners.delete(event);
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const webSocketService = new WebSocketService();