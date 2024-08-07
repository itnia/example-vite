import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import path from 'path';
import fs from 'fs';

function getHtmlEntries() {
    const pagesDir = path.resolve(__dirname + '/pages', "");
    const entries = {};

    // Read all files in the directory
    const files = fs.readdirSync(pagesDir);

    // Filter out HTML files
    const htmlFiles = files.filter((file) => file.endsWith(".html"));

    // Create entries for each HTML file
    htmlFiles.forEach((file) => {
        const name = path.basename(file, ".html");
        entries[name] = path.resolve(pagesDir, file);
    });

    return entries;
}


export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                dir: './dist/',
                entryFileNames: 'script-new.js',
                assetFileNames: 'style-new.css',
                manualChunks: undefined,
            },
            input: getHtmlEntries(),
        }
    },
    plugins: [injectHTML()],
});