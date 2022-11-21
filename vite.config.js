import { resolve } from "path";

import { defineConfig } from "vite";

export default defineConfig( ( {
    command,
    mode,
} ) => {

    switch ( command ) {

        case "serve":
            return createDevelopmentEnvironment();

        case "build":
            return createProductionEnvironment();

        default:
            throw new Error( "执行中断：暂不支持处理该类行为" );

    }

    function createDevelopmentEnvironment () {

        return {
            base: "/",
            mode: "development",
            publicDir: "public",
            server: {
                host: "localhost",
                port: 8080,
                open: true,
                https: false,
                strictPort: false,
                cors: true,
            },
        };

    }

    function createProductionEnvironment () {

        return {
            base: "/",
            mode: "production",
            publicDir: false,
            build: {
                target: "modules",
                outDir: "build",
                assetsDir: "static",
                assetsInlineLimit: 1024 * 5,
                chunkSizeWarningLimit: 500,
                sourcemap: false,
                minify: "esbuild",
                lib: {
                    entry: resolve( __dirname, "library/index.js"),
                    /* 👋 modify this line 👇 */
                    name: "global-name",
                    formats: [ "es", "iife" ],
                    /* 👋 modify this line 👇 */
                    fileName: "file-name",
                },
                rollupOptions: {
                    /* 👋 modify this line 👇 */
                    external: [ "vue", "react", "three" ],
                    /* 👋 modify this dictionary 👇 */
                    output: {
                        globals: {
                            vue: "Vue",
                            react: "React",
                            three: "THREE",
                        },
                    },
                },
            },
        };

    }

} );
