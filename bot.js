

const puppeteer = require("puppeteer");
const fs = require('fs');

(async () => {
  try {
    // Start een nieuwe browser-instantie
    const browser = await puppeteer.launch({
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    });

    // Maak een nieuw pagina-object
    const page = await browser.newPage();

    // Navigeer naar een URL
    await page.goto("https://www.ticketswap.nl/");

    //SECURITY BUTTON
    let button = true;
    debugger;
    while(button) {
      button = await page.$('#b');
      if (button) {
        await button.click();
        console.log('button was clicked!')
        await page.waitForTimeout(3000);
      } else {
        console.log('Button with id "b" not found.');
      }
      await page.screenshot({ path: "screenshot.png" });
    };  
   

    //INLOGGEN 
    const button1 = await page.$('.e13muesf0'); // Vervang '.your-button-class' door de gewenste class
    if (button1) {
      await button1.click();
    } else {
      console.log('Button1 with the specified class not found.');
    }

    // Voer hier je automatische acties uit
    // Bijvoorbeeld, klik op een knop:
    // await page.click('#myButton'); 
    const pageSource = await page.content();
    fs.writeFileSync('pagina.html', pageSource);
    // Maak een screenshot van de pagina
   

    // Sluit de browser
    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
