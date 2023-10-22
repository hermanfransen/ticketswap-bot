const puppeteer = require('puppeteer');

(async () => {
  // Start een nieuwe browser-instantie
  const browser = await puppeteer.launch({
    executablePath: '/path/to/chrome-executable'
  });

  // Maak een nieuw pagina-object
  const page = await browser.newPage();

  // Navigeer naar een URL
  await page.goto('https://www.example.com');

  // Voer hier je automatische acties uit
  // Bijvoorbeeld, klik op een knop:
  // await page.click('#myButton');

  // Maak een screenshot van de pagina
  await page.screenshot({ path: 'screenshot.png' });

  // Sluit de browser
  await browser.close();
})();
