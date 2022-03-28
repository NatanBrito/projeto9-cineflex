import "./style.css";
import { Link , useParams, useNavigate} from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";

import Footer from "../footer/Footer";
export default function Tela3(){
    const [guardaAssento,setGuardaAssento]=useState([]);
    const [assentoApi,setAssentoApi]=useState([]);
    const [valorNome,setValorNome]=useState('');
    const [valorCpf,setValorCpf]=useState('');
    const navigate=useNavigate();
    const {idSessao}=useParams();
    const [assentos,setAssentos]= useState([])
    const [infoFooter,setInfoFooter]=useState([])
    const link=`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    useEffect(()=>{
        const promise= axios.get(link)
        promise.then(response =>{
            const {data}= response
            // console.log(data.movie.title)
          setAssentos(data.seats)
          setInfoFooter(data)
      })
    },[])
    function infoApi(e){
        e.preventDefault();
        console.log(assentoApi.length)
        if(assentoApi.length>=1 && valorCpf.length>9 && valorNome.length>2){
            const promise=axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",{
                ids: assentoApi,
                name: valorNome,
                cpf: valorCpf
            })
            promise.then(navigate("/sucesso"))
        } 
        if(assentoApi.length<1){
        alert("selecione algum assento")
        }
        if(valorCpf.length<9){
            alert('preencha corretamente seu cpf...')
        }
        if(valorNome.length<2){
            alert ('escreva o seu nome...')
        }
       
    }
    return(
        <>
        <div className="tituloSelecao ">Selecione o horário</div>
        <div className="assentos">
           { assentos.map((assento, index) =>{               return(
               <EscolhendoAssento  key={index}
                 disponibilidade={assento.isAvailable}
                 assento={assento}
                 callbackAssento={ valor=>{ setGuardaAssento([...guardaAssento,valor])}}
                 callbackAssentoApi={ valor=>{ setAssentoApi([...assentoApi,valor])}}
                 
               />
               )
            })}

        </div>
        <div className="disposicao">
        <div className="assento selecionado"></div>
        <div className="assento disponivel"></div>
        <div className="assento indisponivel"></div>
        </div>
        <div className="estadosAssento">
        <span className="estadoAssento">Selecionado</span>
        <span className="estadoAssento">Disponivel</span>
        <span className="estadoAssento">Indisponivel</span>
        </div>
        <form onSubmit={infoApi}>
        <div className="inputs">
        <span className="titulo">Nome do comprador:</span>
        <input type="text" className="input" value={valorNome}
         onChange={(e=>{ setValorNome(e.target.value)})} placeholder="   Digite seu nome..." required></input>
        </div>
        <div className="inputs cpf">
        <span className="titulo">CPF do comprador:</span>
        <input type="number" className="input" value={valorCpf}
         onChange={(e=>{ setValorCpf(e.target.value)})} 
         placeholder="   Digite seu CPF sem separaçoes   EX:14474525978" required></input>
        </div>
        <button type="submit" className="botaoReservar">Reservar assento(s)</button>
        </form>
        <Footer secaoEscolhida=""  />
        </>
    )

}
function EscolhendoAssento({disponibilidade,assento,callbackAssento,callbackAssentoApi}){
    const [selecionado,setSelecionado]=useState(false);
    if(disponibilidade){
    
        return(
               <div key={assento} 
               onClick={()=>{ setSelecionado(!selecionado)
                callbackAssento(assento.name)
                callbackAssentoApi(assento.id)
               }} 
               className={`assento   ${selecionado ? "selecionado" : ""}`}>
                   {assento.name}</div>
           )
       } else {
        return(
            <div key={assento}  
            className={`assento  indisponivel`}>
                {assento.name}</div>
        )
       }
}
