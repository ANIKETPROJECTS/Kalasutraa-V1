/**
 * PM2 Ecosystem — Kalasutraa VPS Deployment
 *
 * Setup (run once from the project root):
 *   npm install -g pnpm      # if pnpm is not already installed
 *   pnpm install             # install all workspace dependencies
 *   npm run build            # builds frontend + API server for production
 *   pm2 start ecosystem.config.cjs
 *
 * The Express server serves both the React frontend (static files)
 * and the /api/* routes on a single port (3003).
 *
 * Fill in DATABASE_URL and SESSION_SECRET before starting.
 */

module.exports = {
  apps: [
    {
      name: "kalasutraa",
      script: "./artifacts/api-server/dist/index.mjs",

      // Must be the project root so that static-file paths resolve correctly
      cwd: __dirname,

      instances: 1,
      exec_mode: "fork",

      env: {
        NODE_ENV: "production",
        PORT: "3003",

        // ── Required — replace with your actual value ───────────────────────
        SESSION_SECRET: "replace-with-a-long-random-secret",
        // ────────────────────────────────────────────────────────────────────
        // DATABASE_URL: "postgresql://USER:PASSWORD@localhost:5432/kalasutraa",
        // Uncomment and set the above when you add a database.
      },

      // Log files (auto-created; rotate with: pm2 install pm2-logrotate)
      error_file: "./logs/pm2-err.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,

      // Restart policy
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: "10s",
    },
  ],
};
