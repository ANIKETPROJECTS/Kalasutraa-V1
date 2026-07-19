#!/usr/bin/env bash
# Production build script for VPS deployment.
# Run from the project root after: pnpm install
set -euo pipefail

echo ""
echo "==> [1/2] Building frontend (Vite)..."
pnpm --filter @workspace/kalasutraa run build

echo ""
echo "==> [2/2] Building API server (esbuild)..."
cd artifacts/api-server
node build.mjs
cd ../..

echo ""
echo "Build complete."
echo "  Frontend : artifacts/kalasutraa/dist/public/"
echo "  API server: artifacts/api-server/dist/index.mjs"
echo ""
echo "Start with: pm2 start ecosystem.config.cjs"
