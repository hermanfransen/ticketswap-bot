

const puppeteer = require("puppeteer");
const fs = require('fs');


async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  try {
     // Start een nieuwe browser-instantie
    const browser = await puppeteer.launch({
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
      // Set a real user agent string (replace with an actual user agent string)
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    });

    // Maak een nieuw pagina-object
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1200, height: 800 });

    // Navigeer naar een UR
    await page.goto("https://www.loogman.nl/wasrad");

    //Screenshot en PageSource
    await page.screenshot({ path: "screenshot.png" });
    const pageSource = await page.content();
    fs.writeFileSync('pagina.html', pageSource);
    console.log('Screenshot and source code retrieved!')
    // cookies
    const button0 = await page.$('#js-cookie-consent .c-button.small');
    if (button0) {
      await button0.click();
      console.log('Button0 (Accepteren) was clicked!');
      await page.waitForTimeout(2000 + Math.random() * 2000); // Wacht willekeurige tijd tussen 2 en 4 seconden.
    } else {
      console.log('Button0 (Accepteren) not found.');
    }
    //Sreenshot
    await page.screenshot({ path: "screenshot.png" });
    console.log('Screenshot was made!')

    //email invoeren                                          
    const inputField1 = await page.$('#participation-email');
    if (inputField1) {
      await inputField1.type('lorenzovannassauw@999gmail.com');
      await delay(2500 + Math.random() * 1500);
    }
    //Sreenshot
    await page.screenshot({ path: "screenshot.png" });
    console.log('Screenshot was made!')

    //DOE MEE
    const button1 = await page.$('.c-button.c-search-form-button.js-wheel-of-fortune-button');
    if (button1) {
      await button1.click();
      console.log('Button1 was clicked!');
      await page.waitForTimeout(1000 + Math.random() * 1000);
    } else {
      console.log('Button1 not found.');
    }
   //Screenshot
   await page.screenshot({ path: "screenshot.png" });
   console.log('Screenshot was made!')

   debugger;
//////////////////////////////////////////////////////////
    //TYPE E-MAIL ADRESS
    const button2 = await page.$('#recaptcha-anchor');
    if (button2) {
      await button2.click();
      console.log('Button2 was clicked!');
      await page.waitForTimeout(1000 + Math.random() * 1000);
    } else {
      console.log('Button1 not found.');
    }
   //Screenshot
   await page.screenshot({ path: "screenshot.png" });
   console.log('Screenshot was made!')

    //TYPE WACHTWOORD
    const inputField2 = await page.$('#user_password');
    if (inputField2) {
      await inputField2.type('@@ww1154kD');
      await delay(2500 + Math.random() * 1500);
    }
    //Screenshot
      await page.screenshot({ path: "screenshot.png" });
      console.log('Screenshot was made!')

    //GET STARTED
    await page.waitForSelector('input.button-primary[value="Get started"]');
    const button4 = await page.$('input.button-primary[value="Get started"]');
    if (button4) {
      await button4.click();
      console.log('Button was clicked!');
      await delay(1000 + Math.random() * 1000);
    } else {
      console.log('Button not found.');
    }
    
    await page.screenshot({ path: "screenshot.png" });
    console.log('Screenshot was made!');
    
   await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
