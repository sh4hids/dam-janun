/* eslint-disable import/no-extraneous-dependencies */
const chromium = require('chrome-aws-lambda');

async function getBrowserInstance() {
  const executablePath = await chromium.executablePath;

  if (!executablePath) {
    // running locally
    // eslint-disable-next-line global-require
    const puppeteer = require('puppeteer');
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  }

  return chromium.puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

module.exports = { getBrowserInstance };
