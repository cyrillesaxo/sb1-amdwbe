import { io, Socket } from 'socket.io-client';
import { toast } from './ToastService';

export class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private readonly reconnectDelay = 1000;
  private readonly listeners = new Map<string, Function[]>();
  private messageQueue: { event: string; data: any }[] = [];
  private isConnecting = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    const SOCKET_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';

    try {
      this.socket = io(SOCKET_URL, {
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: this.reconnectDelay,
        timeout: 10000,
        transports: ['websocket', 'polling']
      });

      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
      toast.error('Failed to initialize real-time connection');
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected successfully');
      this.reconnectAttempts = 0;
      this.isConnecting = false;
      this.processMessageQueue();
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      if (reason === 'io server disconnect') {
        this.connect(); // Reconnect if server disconnected
      }
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      toast.error('Connection error occurred');
    });
  }

  private async handleReconnect() {
    if (this.isConnecting) return;

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.isConnecting = true;
      this.reconnectAttempts++;
      
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      console.log(`Attempting reconnection ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      
      if (!this.socket?.connected) {
        this.connect();
      }
    } else {
      console.error('Max reconnection attempts reached');
      toast.error('Unable to establish connection. Please refresh the page.');
      this.isConnecting = false;
    }
  }

  public connect(userId?: string) {
    if (!this.socket || this.isConnecting) return;

    try {
      if (userId) {
        this.socket.auth = { userId };
      }

      this.socket.connect();
    } catch (error) {
      console.error('Failed to connect:', error);
      this.handleReconnect();
    }
  }

  public disconnect() {
    if (!this.socket) return;
    
    try {
      this.socket.disconnect();
      this.messageQueue = [];
      this.listeners.clear();
    } catch (error) {
      console.error('Error during disconnect:', error);
    }
  }

  public emit(event: string, data: any) {
    if (!this.socket?.connected) {
      console.warn('Socket not connected, queueing message');
      this.messageQueue.push({ event, data });
      return;
    }

    try {
      this.socket.emit(event, data);
    } catch (error) {
      console.error('Error emitting event:', error);
      this.messageQueue.push({ event, data });
    }
  }

  private processMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message && this.socket?.connected) {
        this.socket.emit(message.event, message.data);
      }
    }
  }

  public on(event: string, callback: Function) {
    if (!this.socket) return;

    try {
      const eventListeners = this.listeners.get(event) || [];
      eventListeners.push(callback);
      this.listeners.set(event, eventListeners);
      this.socket.on(event, callback as any);
    } catch (error) {
      console.error('Error adding event listener:', error);
    }
  }

  public off(event: string, callback?: Function) {
    if (!this.socket) return;

    try {
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
    } catch (error) {
      console.error('Error removing event listener:', error);
    }
  }

  public isConnected(): boolean {
    return this.socket?.connected || false;
  }

  public getConnectionStatus(): 'connected' | 'connecting' | 'disconnected' {
    if (this.socket?.connected) return 'connected';
    if (this.isConnecting) return 'connecting';
    return 'disconnected';
  }
}

export const webSocketService = new WebSocketService();