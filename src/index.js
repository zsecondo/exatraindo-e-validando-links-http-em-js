import chalk from 'chalk';
import fs from 'fs';


function trataErro(err){
    console.log(err)
    throw new Error(chalk.red(err.code ,'arquivo não encontrado'))
}

function exatraiLink(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const captura = [...texto.matchAll(regex)];
    const resultado = captura.map(captura=>({[captura[1]]:captura[2]}))
    return resultado.length !== 0 ? resultado : 'não a link a serem encontrados'
}


    //funação assincrona usando async/await
 async function pegaArquivo(caminho){
try{

    const encoding = 'utf-8';
    const result = await fs.promises.readFile(caminho,encoding);
    return exatraiLink(result);

}catch(err){
    trataErro(err)
}}

export default pegaArquivo;









    //função assincrona com .then e .cath
/*function pegaArquivo(caminho){
    const encoding = 'utf-8';
    fs.promises.readFile(caminho,encoding)
    .then((res) => {console.log(chalk.yellow(res))})
    .catch(trataErro);
}
   //função sincrona sem promise
/*function pegaArquivo(caminho){
    const encoding = 'utf-8';

    fs.readFile(caminho, encoding, (err, res)=>{
        if(err){
            trataErro(err);
        }
        console.log(chalk.green(res));
    })
}
*/



