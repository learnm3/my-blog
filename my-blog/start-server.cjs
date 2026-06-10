const { spawn } = require("child_process");
const path = require("path");
const cp = spawn("node", [
  path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next"),
  "start", "--port", "3002"
], {
  cwd: process.cwd(),
  stdio: ["ignore", "ignore", "ignore"],
  detached: true,
  windowsHide: true
});
cp.unref();
process.exit(0);
