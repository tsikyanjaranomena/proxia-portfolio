// vite.config.ts
import { defineConfig } from "file:///E:/Work/ProxiaTech/proxia-portfolio/app/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Work/ProxiaTech/proxia-portfolio/app/frontend/node_modules/@vitejs/plugin-react-swc/index.js";
import path4 from "path";
import { viteSourceLocator } from "file:///E:/Work/ProxiaTech/proxia-portfolio/app/frontend/node_modules/@metagptx/vite-plugin-source-locator/dist/index.mjs";
import { atoms } from "file:///E:/Work/ProxiaTech/proxia-portfolio/app/frontend/node_modules/@metagptx/web-sdk/dist/plugins.js";
import { vitePrerenderPlugin } from "file:///E:/Work/ProxiaTech/proxia-portfolio/app/frontend/node_modules/vite-prerender-plugin/src/index.js";
import Sitemap from "file:///E:/Work/ProxiaTech/proxia-portfolio/app/frontend/node_modules/vite-plugin-sitemap/dist/index.js";

// prerender/blog-routes.js
import path2 from "node:path";

// prerender/utils.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
var __vite_injected_original_import_meta_url = "file:///E:/Work/ProxiaTech/proxia-portfolio/app/frontend/prerender/utils.js";
var currentFile = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname2 = path.dirname(currentFile);
var projectRoot = path.resolve(__dirname2, "..");
var seoContentDir = path.resolve(projectRoot, "seo", "content");
function normalizeRouteFromMarkdown(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/").replace(/\/index\.md$/, "").replace(/\.md$/, "");
  return normalized ? `/blog/${normalized}/` : "/blog/";
}
function collectMarkdownFiles(dir, bucket = []) {
  if (!fs.existsSync(dir)) {
    return bucket;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectMarkdownFiles(fullPath, bucket);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      bucket.push(fullPath);
    }
  }
  return bucket;
}

// prerender/blog-routes.js
function getBlogRoutes() {
  const routes = /* @__PURE__ */ new Set(["/blog/"]);
  for (const filePath of collectMarkdownFiles(seoContentDir)) {
    const relativePath = path2.relative(seoContentDir, filePath);
    routes.add(normalizeRouteFromMarkdown(relativePath));
  }
  return Array.from(routes).sort();
}

// prerender/blog-sitemap.js
import fs2 from "node:fs";
import path3 from "node:path";
function collectMarkdownLastmod(dir) {
  const bucket = {};
  for (const fullPath of collectMarkdownFiles(dir)) {
    const relativePath = path3.relative(seoContentDir, fullPath);
    const route = normalizeRouteFromMarkdown(relativePath);
    bucket[route] = fs2.statSync(fullPath).mtime;
  }
  return bucket;
}
function getLatestContentMtime(lastmodMap) {
  const dates = Object.values(lastmodMap).filter((value) => value instanceof Date);
  if (dates.length === 0) {
    return void 0;
  }
  return new Date(Math.max(...dates.map((date) => date.getTime())));
}
function getSitemapLastmod() {
  const contentLastmod = collectMarkdownLastmod(seoContentDir);
  const latestContentMtime = getLatestContentMtime(contentLastmod);
  return {
    ...latestContentMtime ? { "/blog/": latestContentMtime } : {},
    ...contentLastmod
  };
}

// vite.config.ts
var __vite_injected_original_dirname = "E:\\Work\\ProxiaTech\\proxia-portfolio\\app\\frontend";
function escapeHtmlAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
process.env.VITE_APP_TITLE ??= process.env.OVERVIEW_TITLE ?? "Proxiatech";
process.env.VITE_APP_DESCRIPTION ??= process.env.OVERVIEW_DESCRIPTION ?? "Proxiatech - agence digitale a Madagascar pour vos solutions web, mobile et logicielles.";
process.env.VITE_APP_TITLE = escapeHtmlAttr(process.env.VITE_APP_TITLE);
process.env.VITE_APP_DESCRIPTION = escapeHtmlAttr(process.env.VITE_APP_DESCRIPTION);
process.env.VITE_APP_LOGO_URL ??= process.env.OVERVIEW_LOGO_URL ?? "https://public-frontend-cos.metadl.com/mgx/img/favicon_atoms.ico";
var vite_config_default = defineConfig(({ command }) => {
  const blogPrerenderRoutes = command === "build" ? getBlogRoutes() : [];
  return {
    plugins: [
      viteSourceLocator({
        prefix: "mgx"
        // Prefix used to identify source locations; do not change.
      }),
      react(),
      atoms(),
      Sitemap({
        hostname: "https://atoms.template.com",
        lastmod: getSitemapLastmod(),
        readable: true,
        generateRobotsTxt: true
      }),
      ...blogPrerenderRoutes.length > 0 ? vitePrerenderPlugin({
        renderTarget: "#root",
        prerenderScript: path4.resolve(__vite_injected_original_dirname, "prerender/blog.js"),
        additionalPrerenderRoutes: blogPrerenderRoutes
      }) : []
    ],
    resolve: {
      alias: {
        "@": path4.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      host: "0.0.0.0",
      // Listen on all network interfaces.
      port: parseInt(process.env.VITE_PORT || "3000"),
      proxy: {
        "/api": {
          target: `http://localhost:8000`,
          changeOrigin: true
        }
      },
      watch: { usePolling: true, interval: 600 }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks
            "react-vendor": ["react", "react-dom"],
            "router-vendor": ["react-router-dom"],
            "ui-vendor": [
              "@radix-ui/react-accordion",
              "@radix-ui/react-alert-dialog",
              "@radix-ui/react-aspect-ratio",
              "@radix-ui/react-avatar",
              "@radix-ui/react-checkbox",
              "@radix-ui/react-collapsible",
              "@radix-ui/react-context-menu",
              "@radix-ui/react-dialog",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-hover-card",
              "@radix-ui/react-label",
              "@radix-ui/react-menubar",
              "@radix-ui/react-navigation-menu",
              "@radix-ui/react-popover",
              "@radix-ui/react-progress",
              "@radix-ui/react-radio-group",
              "@radix-ui/react-scroll-area",
              "@radix-ui/react-select",
              "@radix-ui/react-separator",
              "@radix-ui/react-slider",
              "@radix-ui/react-slot",
              "@radix-ui/react-switch",
              "@radix-ui/react-tabs",
              "@radix-ui/react-toast",
              "@radix-ui/react-toggle",
              "@radix-ui/react-toggle-group",
              "@radix-ui/react-tooltip"
            ],
            "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
            "utils-vendor": [
              "axios",
              "clsx",
              "tailwind-merge",
              "class-variance-authority",
              "date-fns",
              "lucide-react"
            ],
            "query-vendor": ["@tanstack/react-query"]
          }
        }
      },
      chunkSizeWarningLimit: 1e3
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicHJlcmVuZGVyL2Jsb2ctcm91dGVzLmpzIiwgInByZXJlbmRlci91dGlscy5qcyIsICJwcmVyZW5kZXIvYmxvZy1zaXRlbWFwLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcV29ya1xcXFxQcm94aWFUZWNoXFxcXHByb3hpYS1wb3J0Zm9saW9cXFxcYXBwXFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxXb3JrXFxcXFByb3hpYVRlY2hcXFxccHJveGlhLXBvcnRmb2xpb1xcXFxhcHBcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1dvcmsvUHJveGlhVGVjaC9wcm94aWEtcG9ydGZvbGlvL2FwcC9mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHZpdGVTb3VyY2VMb2NhdG9yIH0gZnJvbSAnQG1ldGFncHR4L3ZpdGUtcGx1Z2luLXNvdXJjZS1sb2NhdG9yJztcbmltcG9ydCB7IGF0b21zIH0gZnJvbSAnQG1ldGFncHR4L3dlYi1zZGsvcGx1Z2lucyc7XG5pbXBvcnQgeyB2aXRlUHJlcmVuZGVyUGx1Z2luIH0gZnJvbSAndml0ZS1wcmVyZW5kZXItcGx1Z2luJztcbmltcG9ydCBTaXRlbWFwIGZyb20gJ3ZpdGUtcGx1Z2luLXNpdGVtYXAnO1xuaW1wb3J0IHsgZ2V0QmxvZ1JvdXRlcyB9IGZyb20gJy4vcHJlcmVuZGVyL2Jsb2ctcm91dGVzLmpzJztcbmltcG9ydCB7IGdldFNpdGVtYXBMYXN0bW9kIH0gZnJvbSAnLi9wcmVyZW5kZXIvYmxvZy1zaXRlbWFwLmpzJztcblxuZnVuY3Rpb24gZXNjYXBlSHRtbEF0dHIoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyXG4gICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKTtcbn1cblxucHJvY2Vzcy5lbnYuVklURV9BUFBfVElUTEUgPz89IHByb2Nlc3MuZW52Lk9WRVJWSUVXX1RJVExFID8/ICdQcm94aWF0ZWNoJztcbnByb2Nlc3MuZW52LlZJVEVfQVBQX0RFU0NSSVBUSU9OID8/PVxuICBwcm9jZXNzLmVudi5PVkVSVklFV19ERVNDUklQVElPTiA/P1xuICAnUHJveGlhdGVjaCAtIGFnZW5jZSBkaWdpdGFsZSBhIE1hZGFnYXNjYXIgcG91ciB2b3Mgc29sdXRpb25zIHdlYiwgbW9iaWxlIGV0IGxvZ2ljaWVsbGVzLic7XG5wcm9jZXNzLmVudi5WSVRFX0FQUF9USVRMRSA9IGVzY2FwZUh0bWxBdHRyKHByb2Nlc3MuZW52LlZJVEVfQVBQX1RJVExFKTtcbnByb2Nlc3MuZW52LlZJVEVfQVBQX0RFU0NSSVBUSU9OID0gZXNjYXBlSHRtbEF0dHIocHJvY2Vzcy5lbnYuVklURV9BUFBfREVTQ1JJUFRJT04pO1xucHJvY2Vzcy5lbnYuVklURV9BUFBfTE9HT19VUkwgPz89IHByb2Nlc3MuZW52Lk9WRVJWSUVXX0xPR09fVVJMID8/ICdodHRwczovL3B1YmxpYy1mcm9udGVuZC1jb3MubWV0YWRsLmNvbS9tZ3gvaW1nL2Zhdmljb25fYXRvbXMuaWNvJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kIH0pID0+IHtcbiAgY29uc3QgYmxvZ1ByZXJlbmRlclJvdXRlcyA9IGNvbW1hbmQgPT09ICdidWlsZCcgPyBnZXRCbG9nUm91dGVzKCkgOiBbXTtcblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZpdGVTb3VyY2VMb2NhdG9yKHtcbiAgICAgICAgcHJlZml4OiAnbWd4JywgLy8gUHJlZml4IHVzZWQgdG8gaWRlbnRpZnkgc291cmNlIGxvY2F0aW9uczsgZG8gbm90IGNoYW5nZS5cbiAgICAgIH0pLFxuICAgICAgcmVhY3QoKSxcbiAgICAgIGF0b21zKCksXG4gICAgICBTaXRlbWFwKHtcbiAgICAgICAgaG9zdG5hbWU6ICdodHRwczovL2F0b21zLnRlbXBsYXRlLmNvbScsXG4gICAgICAgIGxhc3Rtb2Q6IGdldFNpdGVtYXBMYXN0bW9kKCksXG4gICAgICAgIHJlYWRhYmxlOiB0cnVlLFxuICAgICAgICBnZW5lcmF0ZVJvYm90c1R4dDogdHJ1ZSxcbiAgICAgIH0pLFxuICAgICAgLi4uKGJsb2dQcmVyZW5kZXJSb3V0ZXMubGVuZ3RoID4gMFxuICAgICAgICA/IHZpdGVQcmVyZW5kZXJQbHVnaW4oe1xuICAgICAgICAgICAgcmVuZGVyVGFyZ2V0OiAnI3Jvb3QnLFxuICAgICAgICAgICAgcHJlcmVuZGVyU2NyaXB0OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncHJlcmVuZGVyL2Jsb2cuanMnKSxcbiAgICAgICAgICAgIGFkZGl0aW9uYWxQcmVyZW5kZXJSb3V0ZXM6IGJsb2dQcmVyZW5kZXJSb3V0ZXMsXG4gICAgICAgICAgfSlcbiAgICAgICAgOiBbXSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogJzAuMC4wLjAnLCAvLyBMaXN0ZW4gb24gYWxsIG5ldHdvcmsgaW50ZXJmYWNlcy5cbiAgICAgIHBvcnQ6IHBhcnNlSW50KHByb2Nlc3MuZW52LlZJVEVfUE9SVCB8fCAnMzAwMCcpLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy9hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiBgaHR0cDovL2xvY2FsaG9zdDo4MDAwYCxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgd2F0Y2g6IHsgdXNlUG9sbGluZzogdHJ1ZSwgaW50ZXJ2YWw6IDYwMCB9LFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgICAvLyBWZW5kb3IgY2h1bmtzXG4gICAgICAgICAgICAncmVhY3QtdmVuZG9yJzogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICAgICdyb3V0ZXItdmVuZG9yJzogWydyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgICAndWktdmVuZG9yJzogW1xuICAgICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWFjY29yZGlvbicsXG4gICAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtYWxlcnQtZGlhbG9nJyxcbiAgICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1hc3BlY3QtcmF0aW8nLFxuICAgICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWF2YXRhcicsXG4gICAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtY2hlY2tib3gnLFxuICAgICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWNvbGxhcHNpYmxlJyxcbiAgICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1jb250ZXh0LW1lbnUnLFxuICAgICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWRpYWxvZycsXG4gICAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudScsXG4gICAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtaG92ZXItY2FyZCcsXG4gICAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtbGFiZWwnLFxuICAgICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LW1lbnViYXInLFxuICAgICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LW5hdmlnYXRpb24tbWVudScsXG4gICAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtcG9wb3ZlcicsXG4gICAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtcHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXJhZGlvLWdyb3VwJyxcbiAgICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1zY3JvbGwtYXJlYScsXG4gICAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2VsZWN0JyxcbiAgICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1zZXBhcmF0b3InLFxuICAgICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXNsaWRlcicsXG4gICAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2xvdCcsXG4gICAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc3dpdGNoJyxcbiAgICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC10YWJzJyxcbiAgICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC10b2FzdCcsXG4gICAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdG9nZ2xlJyxcbiAgICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC10b2dnbGUtZ3JvdXAnLFxuICAgICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXRvb2x0aXAnLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICdmb3JtLXZlbmRvcic6IFsncmVhY3QtaG9vay1mb3JtJywgJ0Bob29rZm9ybS9yZXNvbHZlcnMnLCAnem9kJ10sXG4gICAgICAgICAgICAndXRpbHMtdmVuZG9yJzogW1xuICAgICAgICAgICAgICAnYXhpb3MnLFxuICAgICAgICAgICAgICAnY2xzeCcsXG4gICAgICAgICAgICAgICd0YWlsd2luZC1tZXJnZScsXG4gICAgICAgICAgICAgICdjbGFzcy12YXJpYW5jZS1hdXRob3JpdHknLFxuICAgICAgICAgICAgICAnZGF0ZS1mbnMnLFxuICAgICAgICAgICAgICAnbHVjaWRlLXJlYWN0JyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAncXVlcnktdmVuZG9yJzogWydAdGFuc3RhY2svcmVhY3QtcXVlcnknXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgICB9LFxuICB9O1xufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXFdvcmtcXFxcUHJveGlhVGVjaFxcXFxwcm94aWEtcG9ydGZvbGlvXFxcXGFwcFxcXFxmcm9udGVuZFxcXFxwcmVyZW5kZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFdvcmtcXFxcUHJveGlhVGVjaFxcXFxwcm94aWEtcG9ydGZvbGlvXFxcXGFwcFxcXFxmcm9udGVuZFxcXFxwcmVyZW5kZXJcXFxcYmxvZy1yb3V0ZXMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1dvcmsvUHJveGlhVGVjaC9wcm94aWEtcG9ydGZvbGlvL2FwcC9mcm9udGVuZC9wcmVyZW5kZXIvYmxvZy1yb3V0ZXMuanNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgc2VvQ29udGVudERpciwgbm9ybWFsaXplUm91dGVGcm9tTWFya2Rvd24sIGNvbGxlY3RNYXJrZG93bkZpbGVzIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCbG9nUm91dGVzKCkge1xuICBjb25zdCByb3V0ZXMgPSBuZXcgU2V0KFsnL2Jsb2cvJ10pO1xuXG4gIGZvciAoY29uc3QgZmlsZVBhdGggb2YgY29sbGVjdE1hcmtkb3duRmlsZXMoc2VvQ29udGVudERpcikpIHtcbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBwYXRoLnJlbGF0aXZlKHNlb0NvbnRlbnREaXIsIGZpbGVQYXRoKTtcbiAgICByb3V0ZXMuYWRkKG5vcm1hbGl6ZVJvdXRlRnJvbU1hcmtkb3duKHJlbGF0aXZlUGF0aCkpO1xuICB9XG5cbiAgcmV0dXJuIEFycmF5LmZyb20ocm91dGVzKS5zb3J0KCk7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXFdvcmtcXFxcUHJveGlhVGVjaFxcXFxwcm94aWEtcG9ydGZvbGlvXFxcXGFwcFxcXFxmcm9udGVuZFxcXFxwcmVyZW5kZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFdvcmtcXFxcUHJveGlhVGVjaFxcXFxwcm94aWEtcG9ydGZvbGlvXFxcXGFwcFxcXFxmcm9udGVuZFxcXFxwcmVyZW5kZXJcXFxcdXRpbHMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1dvcmsvUHJveGlhVGVjaC9wcm94aWEtcG9ydGZvbGlvL2FwcC9mcm9udGVuZC9wcmVyZW5kZXIvdXRpbHMuanNcIjtpbXBvcnQgZnMgZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJztcblxuY29uc3QgY3VycmVudEZpbGUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoY3VycmVudEZpbGUpO1xuY29uc3QgcHJvamVjdFJvb3QgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4nKTtcblxuZXhwb3J0IGNvbnN0IHNlb0NvbnRlbnREaXIgPSBwYXRoLnJlc29sdmUocHJvamVjdFJvb3QsICdzZW8nLCAnY29udGVudCcpO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUm91dGVGcm9tTWFya2Rvd24ocmVsYXRpdmVQYXRoKSB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSByZWxhdGl2ZVBhdGhcbiAgICAucmVwbGFjZSgvXFxcXC9nLCAnLycpXG4gICAgLnJlcGxhY2UoL1xcL2luZGV4XFwubWQkLywgJycpXG4gICAgLnJlcGxhY2UoL1xcLm1kJC8sICcnKTtcblxuICByZXR1cm4gbm9ybWFsaXplZCA/IGAvYmxvZy8ke25vcm1hbGl6ZWR9L2AgOiAnL2Jsb2cvJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3RNYXJrZG93bkZpbGVzKGRpciwgYnVja2V0ID0gW10pIHtcbiAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpIHtcbiAgICByZXR1cm4gYnVja2V0O1xuICB9XG5cbiAgZm9yIChjb25zdCBlbnRyeSBvZiBmcy5yZWFkZGlyU3luYyhkaXIsIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KSkge1xuICAgIGlmIChlbnRyeS5uYW1lLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgZnVsbFBhdGggPSBwYXRoLmpvaW4oZGlyLCBlbnRyeS5uYW1lKTtcbiAgICBpZiAoZW50cnkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgY29sbGVjdE1hcmtkb3duRmlsZXMoZnVsbFBhdGgsIGJ1Y2tldCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoZW50cnkuaXNGaWxlKCkgJiYgZW50cnkubmFtZS5lbmRzV2l0aCgnLm1kJykpIHtcbiAgICAgIGJ1Y2tldC5wdXNoKGZ1bGxQYXRoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVja2V0O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxXb3JrXFxcXFByb3hpYVRlY2hcXFxccHJveGlhLXBvcnRmb2xpb1xcXFxhcHBcXFxcZnJvbnRlbmRcXFxccHJlcmVuZGVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxXb3JrXFxcXFByb3hpYVRlY2hcXFxccHJveGlhLXBvcnRmb2xpb1xcXFxhcHBcXFxcZnJvbnRlbmRcXFxccHJlcmVuZGVyXFxcXGJsb2ctc2l0ZW1hcC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovV29yay9Qcm94aWFUZWNoL3Byb3hpYS1wb3J0Zm9saW8vYXBwL2Zyb250ZW5kL3ByZXJlbmRlci9ibG9nLXNpdGVtYXAuanNcIjtpbXBvcnQgZnMgZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgc2VvQ29udGVudERpciwgbm9ybWFsaXplUm91dGVGcm9tTWFya2Rvd24sIGNvbGxlY3RNYXJrZG93bkZpbGVzIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmZ1bmN0aW9uIGNvbGxlY3RNYXJrZG93bkxhc3Rtb2QoZGlyKSB7XG4gIGNvbnN0IGJ1Y2tldCA9IHt9O1xuXG4gIGZvciAoY29uc3QgZnVsbFBhdGggb2YgY29sbGVjdE1hcmtkb3duRmlsZXMoZGlyKSkge1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IHBhdGgucmVsYXRpdmUoc2VvQ29udGVudERpciwgZnVsbFBhdGgpO1xuICAgIGNvbnN0IHJvdXRlID0gbm9ybWFsaXplUm91dGVGcm9tTWFya2Rvd24ocmVsYXRpdmVQYXRoKTtcbiAgICBidWNrZXRbcm91dGVdID0gZnMuc3RhdFN5bmMoZnVsbFBhdGgpLm10aW1lO1xuICB9XG5cbiAgcmV0dXJuIGJ1Y2tldDtcbn1cblxuZnVuY3Rpb24gZ2V0TGF0ZXN0Q29udGVudE10aW1lKGxhc3Rtb2RNYXApIHtcbiAgY29uc3QgZGF0ZXMgPSBPYmplY3QudmFsdWVzKGxhc3Rtb2RNYXApLmZpbHRlcigodmFsdWUpID0+IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSk7XG5cbiAgaWYgKGRhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4gbmV3IERhdGUoTWF0aC5tYXgoLi4uZGF0ZXMubWFwKChkYXRlKSA9PiBkYXRlLmdldFRpbWUoKSkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNpdGVtYXBMYXN0bW9kKCkge1xuICBjb25zdCBjb250ZW50TGFzdG1vZCA9IGNvbGxlY3RNYXJrZG93bkxhc3Rtb2Qoc2VvQ29udGVudERpcik7XG4gIGNvbnN0IGxhdGVzdENvbnRlbnRNdGltZSA9IGdldExhdGVzdENvbnRlbnRNdGltZShjb250ZW50TGFzdG1vZCk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi4obGF0ZXN0Q29udGVudE10aW1lID8geyAnL2Jsb2cvJzogbGF0ZXN0Q29udGVudE10aW1lIH0gOiB7fSksXG4gICAgLi4uY29udGVudExhc3Rtb2QsXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThVLFNBQVMsb0JBQW9CO0FBQzNXLE9BQU8sV0FBVztBQUNsQixPQUFPQSxXQUFVO0FBQ2pCLFNBQVMseUJBQXlCO0FBQ2xDLFNBQVMsYUFBYTtBQUN0QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGFBQWE7OztBQ04wVixPQUFPQyxXQUFVOzs7QUNBN0IsT0FBTyxRQUFRO0FBQ2pYLE9BQU8sVUFBVTtBQUNqQixTQUFTLHFCQUFxQjtBQUZxTSxJQUFNLDJDQUEyQztBQUlwUixJQUFNLGNBQWMsY0FBYyx3Q0FBZTtBQUNqRCxJQUFNQyxhQUFZLEtBQUssUUFBUSxXQUFXO0FBQzFDLElBQU0sY0FBYyxLQUFLLFFBQVFBLFlBQVcsSUFBSTtBQUV6QyxJQUFNLGdCQUFnQixLQUFLLFFBQVEsYUFB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QSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsWUFDQSxlQUFlLENBQUMsbUJBQW1CLHVCQUF1QixLQUFLO0FBQUEsWUFDL0QsZ0JBQWdCO0FBQUEsY0FDZDtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFlBQ0EsZ0JBQWdCLENBQUMsdUJBQXVCO0FBQUEsVUFDMUM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsdUJBQXVCO0FBQUEsSUFDekI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCIsICJwYXRoIiwgIl9fZGlybmFtZSIsICJwYXRoIiwgImZzIiwgInBhdGgiLCAicGF0aCIsICJmcyIsICJwYXRoIl0KfQo=
