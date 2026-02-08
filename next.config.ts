/**
 * Module Patching for Development Bypass
 * 
 * This file patches Node.js module loading to redirect @opennextjs/cloudflare
 * imports to our local shim when BYPASS_AUTH is enabled.
 */

import Module from "module";

const isBypassMode = process.env.BYPASS_AUTH === "true";

if (isBypassMode) {
    const originalResolveFilename = (Module as any)._resolveFilename;

    (Module as any)._resolveFilename = function (
        request: string,
        parent: any,
        isMain: boolean,
        options?: any
    ) {
        // Redirect @opennextjs/cloudflare to our shim
        if (request === "@opennextjs/cloudflare") {
            return require.resolve("./src/lib/cloudflare-shim.ts");
        }

        return originalResolveFilename(request, parent, isMain, options);
    };

    console.log("[DEV] Module patching enabled for Cloudflare bypass");
}

// Now continue with normal config
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        optimizePackageImports: [
            "@tabler/icons-react",
            "lucide-react",
            "@radix-ui/react-icons",
            "recharts",
            "@workos-inc/node",
            "date-fns",
            "remeda",
            "framer-motion",
        ],
    },
};

export default nextConfig;