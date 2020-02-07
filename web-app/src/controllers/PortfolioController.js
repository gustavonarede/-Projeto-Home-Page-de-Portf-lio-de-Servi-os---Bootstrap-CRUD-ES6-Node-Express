import PortfolioModel from "../models/portfolio/PortfolioModel"
import PortfolioClass from "../models/portfolio/PortfolioClass"

let divMsg = window.document.getElementById("msg");
let divPortfolios = window.document.getElementById("listagem");
let divFormulario = window.document.getElementById("formulario");

let objPortfolioController;

class PortfolioController{


    getTodosTable(divPortfolios){
        let promise = new Promise(function (resolve, reject){
            let promiseFetch = PortfolioModel.getTodos()
            
            promiseFetch.then(response =>{
                resolve(response);
            });

            
        })
        promise.then(response =>{
            let dados = "";


            if(response.erro){
                this.exibirMsgAlert(response.msg, 'erro');
            }else{
                dados += `<div class="table-responsive">
                <table class="table table-striped table-bordered table-hover table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th>Código</th>
                            <th>Descrição</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>`
                for(const servico of response.dados){
                   dados += `<tr>
                    <td>${servico.id_portfolio}</td>
                    <td>${servico.descricao}</td>
                    <td><button  type="button" class="btn btn-primary btn-editar" data-id="{servico.id_portfolio}">Editar</button></td>
                    <td><button  type="button" class="btn btn-primary btn-excluir" data-id="{servico.id_portfolio}">Excluir</button></td>
                   </tr>`

                        
                }
                dados +="</tbody></table></div>";
                divPortfolios.innerHTML = dados;
            }
            
            
        }).catch(response => console.log("erro catch: ",response));
    }
    ocultarElemento(elemento){
        document.getElementById(elemento).style.display = "none";
        console.log("teste");
    }
    exibirElemento(elemento){
        document.getElementById(elemento).style.display = "block";
    }
    limparCamposForm(form){

        form.id.value = "";
        form.descricao.value = "";
        form.detalhes.value = "";
    }

    exibirMsgAlert(msg, tipo){

        let dados = "";
        if(tipo = "sucesso"){
            dados = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${msg}</strong> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
        }else if(tipo = "erro"){
            dados = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>${msg}</strong> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
        }
        divMsg.innerHTML = dados;
    }

    registrarEvents(){

    }
}

function main(){

    objPortfolioController = new PortfolioController();
    objPortfolioController.ocultarElemento("formulario");
    objPortfolioController.getTodosTable(divPortfolios);
}

window.onload = main;