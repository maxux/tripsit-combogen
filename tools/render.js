const puppeteer = require('puppeteer');
const path = require('path');

// Parse arguments...
const currentDir = path.dirname(process.argv[1]);
const target = process.argv[2];
const width = parseInt(process.argv[3]) || 3800;
const height = parseInt(process.argv[4]) || 1600;

const baseName = path.basename(target, '.html');
const outFilePathPNG = path.join(currentDir, '..', 'output', 'png', `${baseName}.png`);
const outFilePathPDF = path.join(currentDir, '..', 'output', 'pdf', `${baseName}.pdf`);

console.log('Rendering...');
console.log('HTML:', target);
//console.log('argv:', process.argv);
console.log('PNG:', outFilePathPNG);
console.log('PDF:', outFilePathPDF);

// Render assets...
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${target}`);
  await page.setViewport({
    width: width,
    height: height,
  });

  // Create/output PNG
  await page.screenshot({
    path: outFilePathPNG
  });

  // Create/output PDF
  await page.pdf({
    path: outFilePathPDF,
    printBackground: true,
    preferCSSPageSize: true,
    width: width,
    height: height,
    scale: 1
  })
  
  await browser.close();
})();