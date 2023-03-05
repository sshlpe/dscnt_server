
const puppeteer = require('puppeteer');

const dsc_falabella = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://www.bancofalabella.cl/descuentos/todos-los-descuentos', {waitUntil: 'domcontentloaded'});
  await new Promise(resolve => setTimeout(resolve, 10 * 1000)); // esperamos 10 segundos para que la pagina cargue.

  const elementos = await page.$$('a.card');

  let dsc = [];
  
  for (let i = 0; i < elementos.length; i++) {
    let enlace = await elementos[i].evaluate(elemento => elemento.getAttribute('href'));
    let texto = await elementos[i].$eval('h5', h5 => h5.innerText);

    let info = {"url": "https://www.bancofalabella.cl/"+enlace, "text": texto};
    dsc.push(info)
  }

  await browser.close();
  return dsc;

};


module.exports = {
  dsc_falabella
}