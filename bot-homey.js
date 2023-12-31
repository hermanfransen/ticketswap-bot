

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

    // Navigeer naar een UR
    await page.goto("https://homey.app/nl-nl/");

    //Screenshot en PageSource
    await page.screenshot({ path: "screenshot.png" });
    const pageSource = await page.content();
    fs.writeFileSync('pagina.html', pageSource);
    console.log('Screenshot and source code retrieved!')
debugger;
    //INLOGGEN
    const button = await page.$('.main-nav-user-login');
    if (button) {
      await button.click();
      console.log('Button was clicked!');
      await delay(2000 + Math.random() * 2000);
    } else {
      console.log('Log in Button not found.');
    }
    
    //Sreenshot
    await page.screenshot({ path: "screenshot.png" });
    console.log('Screenshot was made!')
    //SIGN UP
    const button3 = await page.$x("//a[contains(., 'sign up')]");
    if (button3.length > 0) {
      await button3[0].click();
      console.log('Button3 was clicked!');
      await delay(2000 + Math.random() * 2000);
    } else {
      console.log('Button3 not found.');
    }
      //Screenshot
      await page.screenshot({ path: "screenshot.png" });
      console.log('Screenshot was made!')

    //TYPE E-MAIL ADRESS
    const inputField = await page.$('#user_email');
    if (inputField) {
      await inputField.type('lorenzovannassauw1@gmail.com');
      await delay(2500 + Math.random() * 1500);
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

    debugger;

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
