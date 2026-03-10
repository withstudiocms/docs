import { mkdirSync, writeFileSync } from 'node:fs';
import { createLunaria } from '@lunariajs/core';
import { Page, SvgSummary, svgToPng } from '../lunaria/components.ts';

const lunaria = await createLunaria();
const status = await lunaria.getFullStatus();

const html = Page(lunaria.config, status, lunaria);
const svg = SvgSummary(lunaria.config, status);
const png = svgToPng(svg);

mkdirSync('dist/lunaria', { recursive: true });
writeFileSync('dist/lunaria/index.html', html);
writeFileSync('dist/lunaria/summary.svg', svg);
writeFileSync('dist/lunaria/summary.png', png);
