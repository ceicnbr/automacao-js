const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')({sigint:true});


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo:10,
    });
    const page = await browser.newPage();
    await page.goto('http://10.56.160.77/acesso/index2.php');
// fazer login na pagina
    usuario = prompt("digite o seu usuário: ");
    senha = prompt("Digite sua senha: ")
    await page.type('#txUsuario',usuario)
    await page.type('#txSenha',senha)
    await page.click('#entrar');
//pular alert
    page.on('dialog', async dialog => {
        await dialog.accept();
     });
    //aguardar a pagina carregar para ir direto pra pagina de arranchamento 
    await page.waitForNavigation();
    await page.goto('http://10.56.160.77/acesso/usuario_arranchar_novo.php')
    
    
    // Seletor da classe CSS .arranchar para clicar 
    const classeCSS = '.arranchar';
    let elementos = await page.$$(classeCSS);
    let index = 0;
  
    while (index < elementos.length) {
      const elemento = elementos[index];
      await elemento.click();
      
      // Aguarde um pequeno intervalo 
      await page.waitForNavigation();
  
      // Atualize a lista de elementos, pois a página pode ter mudado
      elementos = await page.$$(classeCSS);

      //caso o de cima não funcionar descomenta essa linha abaixo
      /* await page.waitForSelector(classeCSS); */

      // Avance para o próximo elemento
      index += 0;
    }
    // se a contagem de classes .arranchar for igual a zero fechar o navegador
    if (index == 0){
        await browser.close();
    }
})();