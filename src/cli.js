import pegaArquivo from "./index.js";
import chalk from "chalk";
import fs from 'fs';
import listaValidade from "./http-validacao.js";

const caminhoAqv = process.argv;

async function imprimeLista(valida,result,id = ''){
    if(valida){
        console.log(chalk.blue(
            'Lista validada'),
            chalk.black.bgGreen(id),
            await listaValidade(result));
    }else{
        console.log(chalk.blue(
            'Lista de links'),
            chalk.black.bgGreen(id),
            result);
    }
}

async function processaTexto(argumneto){
    const caminho = argumneto[2];
    const valida = argumneto[3] === '--valida';
    
    try{
        fs.lstatSync(caminho);
    }catch(err){
        if(err.code === 'ENOENT'){         
            console.log(chalk.red('Arquivo ou diretório não existe'))
            return;
        }
    }
    if(fs.lstatSync(caminho).isFile()){
        const result = await pegaArquivo(argumneto[2]) 
        imprimeLista(valida,result)
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivo = await fs.promises.readdir(caminho);
        arquivo.forEach(async (nomeDoAqv)=>{
            const lista = await pegaArquivo(`${caminho}/${nomeDoAqv}`);
            imprimeLista(valida,lista,nomeDoAqv)
        }) 
        
    }

}

processaTexto(caminhoAqv);
