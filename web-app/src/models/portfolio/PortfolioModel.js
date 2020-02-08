import ConfigClass from "../../ConfigClass";

const caminho = `${ConfigClass.getUrlApi().toString()}/portfolio`;

export default class PortfolioModel{
    constructor(){

    }
    static getTodos(){
       return fetch(caminho).then(response =>{
            if(response.status >= 400){
                throw new Error('erro server');
            }

            return response.json();
        })
    }

    static adicionar(objportfolioClass){
        return fetch(caminho),{
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            method: "POST",
            body: JSON.stringify(objportfolioClass)
        }
        .then(response =>{
             if(response.status >= 400){
                 throw new Error('erro server');
             }
 
             return response.json();
         })
     }
}