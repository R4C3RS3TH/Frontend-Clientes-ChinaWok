import { WebSocketService } from './websocket';
import { userProfileStore, toastStore } from '$lib/stores';
import { goto } from '$app/navigation';

export class AuthService {
    private static instance: AuthService;
    private wsService: WebSocketService;
    private isInitialized: boolean = false;

    private constructor() {
        this.wsService = WebSocketService.getInstance();
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public initialize(): void {
        if (this.isInitialized) {
            return;
        }

        this.wsService.addListener((data: any) => {
            console.log('AuthService received message:', data);
            this.handleAuthMessage(data);
        });

        this.isInitialized = true;
        console.log('Auth service initialized');
    }

    public login(email: string, password: string): void {
        const message = {
            action: 'Auth.LoginCliente',
            data: {
                email,
                password
            }
        };
        console.log('Sending login request:', message);
        this.wsService.send(message);
    }

    public register(data: any): void {
        const message = {
            action: 'Auth.RegisterCliente',
            data: data
        };
        console.log('Sending register request:', message);
        this.wsService.send(message);
    }

    private handleAuthMessage(data: any): void {
        // Check for specific auth responses
        // This depends heavily on the backend contract
        if (data.Detail && data.Detail.ui) {
            const { action, data: payload } = data.Detail.ui;

            // Assuming the backend sends a specific action for successful login/register
            // or we rely on the generic 'REDIRECT' or 'HYDRATE' actions handled in socket.ts

            // If we need custom handling:
            if (action === 'AUTH_SUCCESS') {
                userProfileStore.set(payload.user);
                toastStore.set({ message: 'Bienvenido!', type: 'success' });
                goto('/');
            }

            if (action === 'AUTH_ERROR') {
                toastStore.set({ message: payload.message || 'Error de autenticación', type: 'error' });
            }
        }
    }
}
