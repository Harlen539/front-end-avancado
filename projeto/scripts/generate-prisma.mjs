import { spawnSync } from "node:child_process";

const isVercel = process.env.VERCEL === "1";
const isPostgres = isVercel || Boolean(process.env.DATABASE_URL);

if (isVercel && !process.env.DATABASE_URL) {
  console.error("Configure DATABASE_URL para usar a persistência PostgreSQL na Vercel.");
  process.exit(1);
}

const command = process.platform === "win32" ? "prisma.cmd" : "prisma";
const args = ["generate"];
if (isPostgres) args.push("--schema", "prisma/postgres/schema.prisma");

const result = spawnSync(command, args, { stdio: "inherit", shell: process.platform === "win32" });
process.exit(result.status ?? 1);
