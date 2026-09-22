# Younes Mahboubi — developer portfolio

> Portfolio site for a business systems developer who builds custom desktop and web software for administrative workflows.

[![Live site](https://img.shields.io/badge/Live%20site-GitHub%20Pages-2ea44f?logo=github)](https://mahboubi-younes.github.io/Porftolio/)
[![HTML5](https://img.shields.io/badge/HTML5-structure-e34f26?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-styles-1572b6?logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-interactions-f7df1e?logo=javascript&logoColor=111)](https://developer.mozilla.org/docs/Web/JavaScript)

![Portfolio website preview](docs/preview.png)

## The problem it solves

Potential clients and recruiters need a quick, credible way to see the type of workflow software and business-facing websites I can deliver.

## Who it is for

Businesses that need bespoke software for HR, procurement, inventory, point of sale, document processing, and other administrative operations.

## Key features

- Three flagship projects presented as an engineering showcase
- Real Project Labs that lazy-load the deployed RH Manager Pro and GEMA applications
- Ordered Project snapshots for RH Manager Pro, GEMA Entreprise and Sillage — PerfumierPro
- Shared project catalog used to keep links, capabilities and limitations consistent
- Responsive editorial layout with reduced-motion-friendly interaction
- Static deployment with no backend or paid AI-service dependency

## Live site

Visit **[mahboubi-younes.github.io/Porftolio](https://mahboubi-younes.github.io/Porftolio/)**.

## Run locally

```bash
git clone https://github.com/mahboubi-younes/Porftolio.git
cd Porftolio
```

Open `index.html` in a modern browser, or serve the directory with any static-file server.


## Engineering showcase architecture

The portfolio is intentionally evidence-led. The source of truth for the three flagship projects lives in [projects/catalog.json](projects/catalog.json). The Project Labs load the real deployed RH Manager Pro and GEMA applications only after interaction; Sillage is labelled activation-gated because its public artifact requires an owner-issued activation.

The GitHub profile consumes this public catalog through its scheduled [profile generator](https://github.com/mahboubi-younes/mahboubi-younes/blob/main/scripts/generate-profile.mjs), so project order, descriptions, demo links and stated limitations do not drift between the two sites.

## License

All rights reserved. See [LICENSE](LICENSE).
