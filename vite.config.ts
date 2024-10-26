import vue from "@vitejs/plugin-vue";
import {fileURLToPath, URL} from "url";
import {defineConfig} from "vite";
import VueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
    base: process.env.NODE_ENV === "production" ? "/diginotes/" : "/",
    build: {
        target: "esnext",
    },
    plugins: [
        vue(),
        VueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
});
