import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';

const URLTESTIMONIAL = '/testimonies';

class Cadastro extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            testimonial:'',
            city:'',
            image_url:'',
            rating:0,
            status: 1,
            message: "Carregando a avaliação. Por favor, aguarde um pouco e não recarregue a página."
        }
        this.onChange = this.onChange.bind(this);
        this.sendTestimonial = this.sendTestimonial.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }    
    sendTestimonial(e){
        if(this.state.name === "" || this.state.city === ""){
            return window.alert("Inputs to fill: NAME AND CITY")
        }
        else{
        axios
        .post(URLTESTIMONIAL,({ 'name': this.state.name , 'city': this.state.city, 'testimony': this.state.testimonial, 'rating': this.state.rating, 'status': this.state.status, 'image_url': this.state.image_url}))
        .then(res => {
            window.location.reload()
        })
        .catch(error => {
            console.log(error);
        });
        }
    } 
    render(){
        return(
        <div className="container-fluid">
            <div className="fullsizedep">
            <div className="row justify-content-center space__depo">
            <div className="col-md-6 text-center">
                <div className="input-group-lg">
                <h2>New Testimonial</h2>
                </div>
            </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-md-6">
            <p className="cadastro__p">Rating</p>
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
            <p className="cadastro__p">Name</p>
                <div className="input-group-lg">
                    <input 
                    type="text" 
                    name="name" 
                    value={this.state.name}
                    onChange={e => this.onChange(e)}
                    className="form-control" 
                    aria-describedby="basic-addon1">
                    </input>
                </div>
            </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-md-6">
            <p className="cadastro__p">Testimonial</p>
                <div className="input-group-lg">
                    <textarea 
                    name="testimonial" 
                    className="form-control" 
                    id="exampleFormControlTextarea1" 
                    value={this.state.testimonial} 
                    onChange={e => this.onChange(e)}
                    rows="3">
                    </textarea>
                </div>
            </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-md-6">
            <p className="cadastro__p">City</p>
                <div className="input-group-lg">
                    <input 
                    type="text" 
                    name="city" 
                    value={this.state.city}
                    onChange={e => this.onChange(e)}
                    className="form-control" 
                    aria-describedby="basic-addon1">
                    </input>
                </div>
            </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-md-6">
            <p className="cadastro__p">Image URL</p>
                <div className="input-group-lg">
                    <input 
                    type="text" 
                    name="image_url" 
                    value={this.state.image_url}
                    onChange={e => this.onChange(e)}
                    className="form-control" 
                    aria-describedby="basic-addon1">
                    </input>
                </div>
            </div>
            </div>
            <div className="row justify-content-center space">
            <div className="col-md-6">
                <div className="input-group-lg">
                <button type="submit" onClick={this.sendTestimonial} className="btn btn-dark btn-lg btn-block">Send</button>
                </div>
            </div>
            </div>
            </div>
        </div>
        
        );
    }
}
export default Cadastro;