import PortfolioModel from "../models/portfolio/PortfolioModel"
import PortfolioClass from "../models/portfolio/PortfolioClass"

let divMsg = window.document.getElementById("msg");
let divPortfolios = window.document.getElementById("portfolios");
let Formulario = window.document.getElementById("form");

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
                   </tr>`;

                        
                }
                dados +="</tbody></table></div>";
                divPortfolios.innerHTML = dados;

                let btnsEditar = document.querySelectorAll(".btn-editar");
                let btnsExcluir = document.querySelectorAll(".btn-excluir");

                btnsEditar.forEach(function(item){
                    item.addEventListener("click",event =>{
                        objPortfolioController.limparMsgAlert();
                        let id = event.target.getAttribute('data-id');
                        objPortfolioController.prepararEditar(id);
                    });
                });

                btnsExcluir.forEach(function(item){
                    item.addEventListener("click",event =>{
                        objPortfolioController.limparMsgAlert();
                        let id = event.target.getAttribute('data-id');
                        objPortfolioController.deletar(id);
                    });
                });
            }
            
            
        }).catch(response => console.log("erro catch: ",response));
    }

    prepararEditar(id){
        console.log("prepara editar",id);
    }

    editar(formulario){

    }
    adicionar(formulario){
        let descricao, detalhes;
        descricao = formulario.descricao.value;
        detalhes = formulario.detalhes.value;

        if(descricao && detalhes){
            let objPortfolioClass = new PortfolioClass(null, descricao, detalhes);

            let promise = new Promise(function (resolve, reject){
                let promiseFetch = PortfolioModel.adicionar(objPortfolioClass)
                
                promiseFetch.then(response =>{
                    resolve(response);
                });
    
                
            })
            promise.then(response =>{
                if(response.erro){
                    this.exibirMsgAlert(response.msg,"erro");
                }else{
                    objPortfolioController.getTodosTable(divPortfolios);
                    objPortfolioController.exibirMsgAlert(response.msg,"sucesso");
                    objPortfolioController.ocultarElemento("formulario");
                    objPortfolioController.exibirElemento("listagem");
                    objPortfolioController.limparCamposForm(formulario)
                }
                
            }).catch(response =>{ console.log("erro catch:", response)
            
        });
        }else{
            this.exibirMsgAlert("Por favor preencher todos campos.","erro")
        }
    }

    deletar(id){
        console.log("deletar",id);
    }

    ocultarElemento(elemento){
        document.getElementById(elemento).style.display = "none";
        console.log('teste');
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
        if(tipo == "sucesso"){
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

    limparMsgAlert(){
        divMsg.innerHTML = "";
    }
    registrarEvents(){

        document.getElementById('btn-exibir-formulario').addEventListener("click",function(){
            objPortfolioController.limparMsgAlert();
            objPortfolioController.ocultarElemento("listagem");
            objPortfolioController.exibirElemento("formulario");
        });
        document.getElementById('btn-cadastrar-portfolio').addEventListener("click",function(){
            event.preventDefault();
            objPortfolioController.limparMsgAlert();
            if(Formulario.id.value){
                objPortfolioController.editar(formulario)
            }else{
                objPortfolioController.adicionar(formulario);
            }
        });
        document.getElementById('btn-cancelar-operacao').addEventListener("click",function(){
            objPortfolioController.limparMsgAlert();
            objPortfolioController.limparCamposForm(formulario);
            objPortfolioController.ocultarElemento("formulario");
            objPortfolioController.exibirElemento("listagem");
        });
    }
    
}

function main(){

    objPortfolioController = new PortfolioController();
    objPortfolioController.ocultarElemento("formulario");
    objPortfolioController.getTodosTable(divPortfolios);
    objPortfolioController.registrarEvents();
}

window.onload = main;