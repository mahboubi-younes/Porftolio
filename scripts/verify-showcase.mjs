import { readFile } from 'node:fs/promises';

const catalog = JSON.parse(await readFile(new URL('../projects/catalog.json', import.meta.url), 'utf8'));
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const expected = ['RH Manager Pro', 'GEMA Entreprise', 'Sillage — PerfumierPro'];
const featuredOrder = [...html.matchAll(/<article class="project-card">[\s\S]*?<h3>([^<]+)<\/h3>/g)].map((match) => match[1]);
const snapshotOrder = [...html.matchAll(/<article class="snapshot-card">[\s\S]*?<strong>([^<]+)<\/strong>/g)].map((match) => match[1]);
if (JSON.stringify(featuredOrder.slice(0, 3)) !== JSON.stringify(expected)) throw new Error(`Featured order mismatch: ${featuredOrder.join(', ')}`);
if (JSON.stringify(snapshotOrder) !== JSON.stringify(expected)) throw new Error(`Snapshot order mismatch: ${snapshotOrder.join(', ')}`);
for (const project of catalog.projects.filter((item) => item.featured)) {
  if (!html.includes(project.demo) || !html.includes(project.repository)) throw new Error(`Missing project link: ${project.name}`);
}
for (const asset of ['docs/rh-manager-pro.png', 'docs/gema-dashboard.png', 'docs/sillage-perfumierpro.png']) {
  if (!html.includes(asset)) throw new Error(`Missing snapshot asset: ${asset}`);
}
if (!html.includes('data-lab-src="https://mahboubi-younes.github.io/rh-manager-demo/"')) throw new Error('RH Project Lab missing');
if (!html.includes('data-lab-src="https://mahboubi-younes.github.io/gema-entreprise/"')) throw new Error('GEMA Project Lab missing');
console.log(`Showcase verified: ${expected.join(' → ')}`);
