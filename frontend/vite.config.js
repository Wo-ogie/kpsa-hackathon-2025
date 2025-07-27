import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // 모든 호스트에서 접근 허용
        port: 5173, // 원하는 포트 번호
        allowedHosts: [
            'c5b86f0e66b2.ngrok-free.app', // ngrok 도메인 추가
            'localhost',
            '127.0.0.1'
        ]
    }
});
