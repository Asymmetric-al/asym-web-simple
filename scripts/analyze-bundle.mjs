import { spawn } from "node:child_process";

const bunExecutable = "bun";

const child = spawn(bunExecutable, ["run", "build", "--", "--webpack"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: {
    ...process.env,
    ANALYZE: "true",
  },
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
