

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
    console.log('Screenshot and source code retrieved!')

    //INLOGGEN
    const button = await page.$x("//a[contains(., 'Log in')]");
    if (button.length > 0) {
      await button[0].click();
      console.log('Button was clicked!');
      await page.waitForTimeout(3000);
    } else {
      console.log('Log in Button not found.');
    }
      await page.screenshot({ path: "screenshot.png" });
      console.log('Screenshot was made!')
   
      //CONTINUE WITH GOOGLE
      const button2 = await page.$x("//a[contains(., 'Apple, Google, or Facebook')]");
      if (button2.length > 0) {
        await button2[0].click();
        console.log('Button was clicked!');
        await page.waitForTimeout(3000);
      } else {
        console.log('Button not found.');
      }
        await page.screenshot({ path: "screenshot.png" });
        console.log('Screenshot was made!')
    
    // //VOLGENDE BUTTON 
    // const button1 = await page.$('.e13muesf0'); // Vervang '.your-button-class' door de gewenste class
    // if (button1) {
    //   await button1.click();
    // } else {
    //   console.log('Button1 with the specified class not found.');
    // }
    // //Screenshot
    // await page.screenshot({ path: "screenshot.png" });
  
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
