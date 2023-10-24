

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
    debugger;
    // Navigeer naar een URL
    await page.goto("https://ifttt.com/");


    //Screenshot
    await page.screenshot({ path: "screenshot.png" });
    const pageSource = await page.content();
    fs.writeFileSync('pagina.html', pageSource);

    //INLOGGEN
    let button = true;
    while(button) {
      button = await page.$('.sign-in button-tertiary');
      if (button) {
        await button.click();
        console.log('button was clicked!')
        await page.waitForTimeout(3000);
      } else {
        console.log('Log in Button not found.');
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
    //Screenshot
    await page.screenshot({ path: "screenshot.png" });

    // Voer hier je automatische acties uit
    // Bijvoorbeeld, klik op een knop:
    // await page.click('#myButton'); 

    // Maak een screenshot van de pagina
   

    // Sluit de browser
    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
