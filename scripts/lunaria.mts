import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from "node:path";
import { createLunaria, generateDashboard } from "@lunariajs/core";
import { SvgSummary, svgToPng } from "../lunaria/summary";

const lunaria = await createLunaria();
const status = await lunaria.getFullStatus();

const { outDir } = lunaria.config;
const svg = SvgSummary(lunaria.config, status);
const png = svgToPng(svg);

mkdirSync(outDir, { recursive: true });
writeFileSync(
  join(outDir, "index.html"),
  generateDashboard(lunaria.config, status),
);
writeFileSync(join(outDir, "summary.svg"), svg);
writeFileSync(join(outDir, "summary.png"), png);
