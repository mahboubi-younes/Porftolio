import { readFile, stat } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const catalog = JSON.parse(await readFile(new URL('projects/catalog.json', root), 'utf8'));
const html = await readFile(new URL('index.html', root), 'utf8');
const expected = ['RH Manager Pro', 'GEMA Entreprise', 'Sillage — PerfumierPro'];
const projects = catalog.projects.filter((item) => item.featured).sort((a, b) => a.snapshotOrder - b.snapshotOrder);
if (JSON.stringify(projects.map((item) => item.name)) !== JSON.stringify(expected)) throw new Error('Catalog flagship order mismatch');
const featuredOrder = [...html.matchAll(/<article class="project-card">[\s\S]*?<h3>([^<]+)<\/h3>/g)].map((match) => match[1]);
const snapshotOrder = [...html.matchAll(/<article class="snapshot-card">[\s\S]*?<strong>([^<]+)<\/strong>/g)].map((match) => match[1]);
if (JSON.stringify(featuredOrder.slice(0, 3)) !== JSON.stringify(expected)) throw new Error('Featured order mismatch: ' + featuredOrder.join(', '));
if (JSON.stringify(snapshotOrder) !== JSON.stringify(expected)) throw new Error('Snapshot order mismatch: ' + snapshotOrder.join(', '));
for (const project of projects) {
  for (const field of ['name', 'description', 'demo', 'repository', 'category', 'limitations']) {
    if (!project[field] || (Array.isArray(project[field]) && project[field].length === 0)) throw new Error('Catalog field missing: ' + project.name + '.' + field);
  }
  if (!Array.isArray(project.screenshots) || project.screenshots.length === 0) throw new Error('Catalog screenshots missing: ' + project.name);
  if (!html.includes(project.name) || !html.includes(project.demo) || !html.includes(project.repository)) throw new Error('Missing project surface: ' + project.name);
  for (const screenshot of project.screenshots) {
    await stat(new URL(screenshot.replace(/^\//, ''), root)).catch(() => { throw new Error('Catalog screenshot missing: ' + screenshot); });
    if (!html.includes(screenshot)) throw new Error('Screenshot not referenced by HTML: ' + screenshot);
  }
}
if (!html.includes('data-lab-src="https://mahboubi-younes.github.io/rh-manager-demo/"')) throw new Error('RH Project Lab missing');
if (!html.includes('data-lab-src="https://mahboubi-younes.github.io/gema-entreprise/"')) throw new Error('GEMA Project Lab missing');
if ((html.match(/class="lab-architecture"/g) || []).length < 2) throw new Error('Architecture handoff missing for RH/GEMA labs');
if (!/activation-gated/i.test(html) || html.includes('data-lab-src="https://mahboubi-younes.github.io/sillage-perfumierpro-demo/')) throw new Error('Sillage must remain honestly activation-gated');
if (!html.includes('rel="canonical"') || !html.includes('og:title') || !html.includes('twitter:card')) throw new Error('Portfolio SEO metadata incomplete');
const profileReadme = process.env.PROFILE_README_PATH;
if (profileReadme) {
  const profile = await readFile(profileReadme, 'utf8');
  if (!profile.includes('GENERATED:ENGINEERING_PROFILE:START') || !profile.includes('GENERATED:ENGINEERING_PROFILE:END')) throw new Error('Profile generation markers missing');
}
console.log('Showcase verified: ' + expected.join(' → '));
