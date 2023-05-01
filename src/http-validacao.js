import chalk from "chalk";

function exatraiLinks(arr){
    return arr.map((obj) =>
        Object.values(obj).join()
    )
}

async function checaStatus(listurl){
    const arrStatus = await Promise.all(
    
        listurl.map(async (url)=>{
            try{
                const reponse = await fetch(url)
                return reponse.status
            }catch(err){
                return manejaErro(err);
            }
    }))
    return arrStatus
}
function manejaErro(err){
    if(err.cause.code === 'ENOTFOUND'){
        return 'Link não encontrado'
    }else{
        return 'Ocorreu um erro inesperado'
    }
}

export default async function listaValidade(list){
    const links = exatraiLinks(list);
    const status = await checaStatus(links);
    return list.map((obj,index)=>({
        ...obj,
        status: status[index]
    }))


}
//