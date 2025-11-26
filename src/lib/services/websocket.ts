export class WebSocketService {
    private static instance: WebSocketService;
    private socket: WebSocket | null = null;
    private url: string = '';
    private reconnectInterval: number = 5000;
    private messageHandler: ((data: any) => void) | null = null;
    private isConnected: boolean = false;

    private constructor() { }

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    public connect(url: string): void {
        this.url = url;
        if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
            console.log('WebSocket is already connected or connecting.');
            return;
        }

        console.log(`Connecting to WebSocket at ${this.url}...`);
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log('WebSocket connected.');
            this.isConnected = true;
        };

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (this.messageHandler) {
                    this.messageHandler(data);
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        this.socket.onclose = () => {
            console.log('WebSocket disconnected. Reconnecting in 5 seconds...');
            this.isConnected = false;
            setTimeout(() => this.connect(this.url), this.reconnectInterval);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.socket?.close();
        };
    }

    public setMessageHandler(handler: (data: any) => void): void {
        this.messageHandler = handler;
    }

    public send(data: any): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.warn('WebSocket is not open. Cannot send message.');
        }
    }

    public close(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}
