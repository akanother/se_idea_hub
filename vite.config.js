import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from "@vitejs/plugin-vue";
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
    plugins: [
        vue(),
        basicSsl(),
        laravel({
            input: [
                'public/assets/css/bootstrap.min.css',
                'public/assets/css/icons.min.css',
                'public/assets/css/app.min.css',
                'public/assets/css/custom.css',
                'public/assets/libs/sweetalert2/sweetalert2.min.css',
                'node_modules/tom-select/src/scss/tom-select.scss',
                'resources/css/app.css',
                'resources/js/app.jsx'],
            refresh: true,
        }),
    ],
    server: {
        https: true,
        host: '192.168.10.10',
        watch: {
            usePolling: true,
        },
        //Vite ports used by Homestead
        port: 5173,
    }
});

