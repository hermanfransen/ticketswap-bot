/**
 * Dit is door ChatGPT vertaald van python / selenium script naar javascript / puppeteer
 * https://github.com/pablobiedma/TicketSwapMe/blob/master/Ticket.py
 */
const puppeteer = require('puppeteer');

const HOST = 'https://www.ticketswap.com';

class TicketSwapMe {
  constructor() {
    this.has_tickets = false;
  }

  async login() {
    const username = 'insert facebook email here';
    const password = 'insert facebook password here';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(HOST);

    const loginButton = await page.$x("/html/body/div[1]/div[1]/nav/div[1]/ul/li[3]/button");
    await loginButton[0].click();
    await page.waitForTimeout(3000);

    const facebookButton = await page.$$('[contains(text(), "Continue with Facebook")]');
    await facebookButton[1].click();
    await page.waitForTimeout(2000);

    const pages = await browser.pages();
    const popup = pages[pages.length - 1];
    await popup.waitForTimeout(4000);

    const userInput = await popup.$('#email');
    const passInput = await popup.$('#pass');
    await userInput.type(username);
    await passInput.type(password);
    await passInput.press('Enter');

    await popup.waitForTimeout(3000);
    await browser.close();

    this.cookies = await this.handleCookies(popup.cookies());
  }

  async handleCookies(cookieList) {
    const cookies = {};
    for (const cookie of cookieList) {
      cookies[cookie.name] = cookie.value;
    }
    return cookies;
  }

  async start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.waitForTimeout(7000);
    await page.goto('insert url here');

    while (true) {
      await page.waitForTimeout(3000);

      const letter = await page.$eval('div.css-1nxi1g2:nth-child(1) > h2:nth-child(1)', el => el.textContent);
      if (parseInt(letter) > 0) {
        console.log(letter + ' are available');
        try {
          await page.click('div.css-uirvwh:nth-child(2) > ul:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1)');
          await page.waitForTimeout(3000);
          await page.click('.css-1aros5x');
        } catch (error) {
          console.log('');
        }
        try {
          await page.click('/html/body/div/div[3]/div[3]/div/a[1]/div');
          await page.waitForTimeout(3000);
          await page.click('div.css-uirvwh:nth-child(2) > ul:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1)');
          await page.waitForTimeout(3000);
          await page.click('.css-1aros5x');
        } catch (error) {
          console.log('');
        }
        break;
      } else {
        console.log('No tickets are available. Keep trying');
      }
      await page.reload();
    }
    await browser.close();
  }

  async getTicket(eventUrl) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(eventUrl);
  }

  async explodeTicket(ticketLink) {
    const response = await fetch(HOST + ticketLink, {
      method: 'GET',
      headers: {
        'Cookie': this.cookies,
      },
    });

    const htmlContent = await response.text();
    const parsedHtml = new DOMParser().parseFromString(htmlContent, 'text/html');
    const tokenObject = parsedHtml.querySelector('input[name="reserve[_token]"]');
    if (!tokenObject) {
      console.log('Failed to get token');
      return false;
    }

    const tokenAttrs = tokenObject.attributes;
    const reserveTokenObject = parsedHtml.querySelector('input[name="reserve[_token]');

    if (!reserveTokenObject) {
      return false;
    }

    const reserveTokenAttrs = reserveTokenObject.attributes;
    const addData = {};
    const seats = parsedHtml.querySelector('input[name="tickets[]"]');
    if (seats) {
      addData['tickets[]'] = seats.value;
    } else {
      const items = parsedHtml.querySelector('select[name="amount"]');
      const count = items.children.length;
      addData['amount'] = count;
    }

    const token = tokenAttrs['value'].value;
    const reserveToken = reserveTokenAttrs['value'].value;
    const ticketLinkReserve = parsedHtml.querySelector('form[id="listing-reserve-form"]').attributes;
    const ticketReserveLink = ticketLinkReserve['data-endpoint'].value;

    return {
      token,
      reserveToken,
      ticketLink: ticketReserveLink,
      moreData: addData,
    };
  }

  async reserveTicket(content) {
    const token = content.token;
    const reserveToken = content.reserveToken;
    const form_data = {
      token,
      'reserve[_token]': reserveToken,
      ...content.moreData,
    };

    const response = await fetch(HOST + content.ticketLink, {
      method: 'POST',
      body: new URLSearchParams(form_data),
      headers: {
        'Cookie': this.cookies,
      },
    });

    const responseText = await response.text();
    const content = JSON.parse(responseText);
    console.log('Successfully added ticket to your account');
    return content.success;
  }
}

(async () => {
  const t = new TicketSwapMe();
  await t.login();
  await t.start();
})();
