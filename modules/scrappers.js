
const puppeteer = require('puppeteer');

const dsc_falabella = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://www.bancofalabella.cl/descuentos/todos-los-descuentos');
  await new Promise(resolve => setTimeout(resolve, 5 * 1000)); // esperamos 5 segundos para que la pagina cargue.

  const elementos = await page.$$('a.card');

  let dsc = [];
  
  for (let i = 0; i < elementos.length; i++) {
    let href = await elementos[i].evaluate(elemento => elemento.getAttribute('href'));
    let title = await elementos[i].$eval('h5', h5 => h5.innerText);
    let text = await elementos[i].$eval('p', h5 => h5.innerText);

    let info = {"url": "https://www.bancofalabella.cl/"+href, "title": title, "text": text};
    dsc.push(info)
  }

  await browser.close();
  return dsc;

};

const dsc_mach = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://www.somosmach.com/beneficios');
  await new Promise(resolve => setTimeout(resolve, 5 * 1000)); // esperamos 5 segundos para que la pagina cargue.

  const elementos = await page.$$('.beneficios-box');

  let dsc = [];
  
  for (const elem of elementos) {
    const href = await elem.evaluate(el => el.querySelector('a').href);
	const text = await elem.$eval('p', p => p.innerText);
	const title = await elem.$eval('h3', p => p.innerText);

    let info = {"url": href, "text": text, "title": title};
    dsc.push(info)
  }

  await browser.close();
  return dsc;

};

module.exports = {
  dsc_falabella,
  dsc_mach
}
