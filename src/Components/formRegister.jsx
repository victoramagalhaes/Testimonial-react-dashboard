import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import qs from 'qs';
import LoadingOverlay from 'react-loading-overlay';

import {getJwt} from './jwt';

const URLDEPOIMENTOS = 'https://gostosobeach-api.herokuapp.com/depoimentos';
const URLUPLOAD = 'https://gostosobeach-api.herokuapp.com/upload';

class FormCadastro extends Component {
    constructor(props){
        super(props)
        this.state = {
            nome: '',
            comentario:'',
            cidade:'',
            imagem:null,
            rating:1,
            status: 1,
            isActive: false
        }
        this.onChange = this.onChange.bind(this);
        this.CadastroDepoimento = this.CadastroDepoimento.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }    
    CadastroDepoimento(e){
        if(this.state.nome === "" || this.state.comentario === "" || this.state.cidade === "" || this.state.imagem === null){
            return window.alert("Por favor preencha todos os campos")
        }
        else{
        const jwt = getJwt();
        axios
        .post(URLDEPOIMENTOS,({ 'nome_hospede': this.state.nome , 'local_hospede': this.state.cidade, 'depoimento': this.state.comentario, 'avaliacao': this.state.rating, 'status': this.state.status}), {
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then(res => {
            this.UploadImage(res.data.id)
            this.setState({
                isActive:true
            })
        })
        .catch(error => {
            console.log(error);
        });
        }
    }
    UploadImage(data){
        const jwt = getJwt();
        let file = this.state.imagem
        let formdata = new FormData()
        formdata.append('files', file)
        formdata.append('refId', data)
        formdata.append('ref', 'depoimentos')
        formdata.append('field', 'avatar')
        formdata.append('patch', 'depoimentos/avatar')
        axios({
            url: 'https://gostosobeach-api.herokuapp.com/upload',
            method: 'POST',
            headers: {
                authorization: `Bearer ${jwt}`
            },
            data: formdata
        })
        .then(res => {
            this.CadastroSucesso(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
    CadastroSucesso(res){
        res.status === 200 ? window.alert("Cadastro realizado com sucesso!") : window.alert("Houve algum erro, por favor tente novamente.")
        window.location.reload()
    }
    fileSelected(e){
        this.setState({
            imagem: e.target.files[0]
        })     
    } 
    render(){
        return(
        <div> 
            <LoadingOverlay
            active={this.state.isActive}
            spinner
            text='Carregando a imagem do usuário. Por favor, não recarregue a página.'
            >
            <div className="row justify-content-center space__depo">
            <div className="col-md-6 text-center">
                <div className="input-group-lg">
                <h2>Cadastrar depoimento</h2>
                </div>
            </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-md-6">
            <p className="cadastro__p">Classificação</p>
                <div className="input-group-lg rating-stars">
                {/* <h2>Rating from state: {this.state.rating}</h2> */}
                <StarRatingComponent 
                name="rate1" 
                starCount={5}
                value={this.state.rating}
                onStarClick={this.onStarClick.bind(this)}
                />
                </div>
            </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-md-6">
            <p className="cadastro__p">Nome</p>
                <div className="input-group-lg">
                    <input 
                    type="text" 
                    name="nome" 
                    value={this.state.nome}
                    onChange={e => this.onChange(e)}
                    className="form-control" 
                    aria-describedby="basic-addon1">
                    </input>
                </div>
            </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-md-6">
            <p className="cadastro__p">Comentário</p>
                <div className="input-group-lg">
                    <textarea 
                    name="comentario" 
                    className="form-control" 
                    id="exampleFormControlTextarea1" 
                    value={this.state.comentario} 
                    onChange={e => this.onChange(e)}
                    rows="3">
                    </textarea>
                </div>
            </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-md-6">
            <p className="cadastro__p">Origem</p>
                <div className="input-group-lg">
                    <input 
                    type="text" 
                    name="cidade" 
                    value={this.state.cidade}
                    onChange={e => this.onChange(e)}
                    className="form-control" 
                    aria-describedby="basic-addon1">
                    </input>
                </div>
            </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-md-6">
            <p className="cadastro__p">Selecionar Imagem</p>
                <div className="input-group-lg">
                <input name="imagem" type="file" onChange={this.fileSelected.bind(this)}></input>
                </div>
            </div>
            </div>
            <div className="row justify-content-center space">
            <div className="col-md-6">
                <div className="input-group-lg">
                <button type="submit" onClick={this.CadastroDepoimento} className="btn btn-dark btn-lg btn-block">Enviar Avaliação</button>
                </div>
            </div>
            </div>
            </LoadingOverlay>
        </div>
        
        );
    }
}
export default FormCadastro;