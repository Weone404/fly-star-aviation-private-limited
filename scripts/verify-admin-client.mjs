import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientSources = [
    "src/pages/admin/login/page.tsx",
    "src/pages/AdminBlog.tsx",
    "src/App.tsx",
    "src/lib/adminApi.ts",
].map((relativePath) => path.join(root, relativePath));
const authConstantPattern = /const\s+ADMIN_(?:USERNAME|PASSWORD)\s*=/;

for (const sourcePath of clientSources) {
    const source = fs.readFileSync(sourcePath, "utf8");
    if (authConstantPattern.test(source)) {
        throw new Error(`Hard-coded admin credential declaration found in ${path.relative(root, sourcePath)}.`);
    }
}

const assetsDirectory = path.join(root, "dist", "assets");
const clientBundles = fs.readdirSync(assetsDirectory)
    .filter((file) => file.endsWith(".js"))
    .map((file) => ({ file, source: fs.readFileSync(path.join(assetsDirectory, file), "utf8") }));

if (clientBundles.length === 0) {
    throw new Error("No generated client JavaScript bundles were found.");
}

const forbiddenAuthMarkers = /\bADMIN_(?:USERNAME|PASSWORD|SESSION_SECRET)\b|weone_admin/;
const exposedBundles = clientBundles
    .filter(({ source }) => forbiddenAuthMarkers.test(source))
    .map(({ file }) => file);

if (exposedBundles.length > 0) {
    throw new Error(`Admin authentication markers found in client bundles: ${exposedBundles.join(", ")}.`);
}

const adminHtmlPath = path.join(root, "dist", "admin", "blog", "index.html");
if (fs.existsSync(adminHtmlPath)) {
    const adminHtml = fs.readFileSync(adminHtmlPath, "utf8");
    const body = adminHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];
    if (!body) throw new Error("Could not inspect the prerendered admin page body.");

    const renderedBody = body
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "");
    if (/\bBlog Manager\b|Write New Blog|Blog published!|Blog updated!/i.test(renderedBody)) {
        throw new Error("Prerendered admin dashboard content was exposed before session verification.");
    }
}

console.log(`Admin client check passed across ${clientBundles.length} JavaScript bundles.`);
