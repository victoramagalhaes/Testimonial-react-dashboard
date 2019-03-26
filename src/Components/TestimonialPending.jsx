import React,{Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import {getJwt} from './jwt';
import StarRatingComponent from 'react-star-rating-component';

const URLTESTIMONIAL = '/api/testimonies';

class DepoimentosApr extends Component {
    constructor(props){
        super(props)
        this.state = {
            testimonial: []
        }
        this.getTestimonialPending = this.getTestimonialPending.bind(this)
    }
    idealStatus(data){
        return data.status === 1
    }
    getTestimonialPending(){
        const token = getJwt();
        axios
        .get(URLTESTIMONIAL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
            const testimonialPending = res.data.filter(this.idealStatus)
            this.setState({
                testimonial:testimonialPending
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    componentDidMount(){
        this.getTestimonialPending()
    }
    Disagree(testimonial){
        if(window.confirm("Are you sure you want to delete it?")){
            const token = getJwt();
            axios.delete(`${URLTESTIMONIAL}/${testimonial.id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            }) 
            .then(res => window.location.reload())
        }
    }
    Agree(testimonial,index){
        if(window.confirm("Are you sure you want to accept it?")){
        const token = getJwt();
        axios
        .put(`${URLTESTIMONIAL}/${testimonial.id}`, qs.stringify({ 
            'status': 2 , 
        }), {
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        .then(res => {
            // console.log(res.data)
            window.location.reload()
        })
        .catch(error => {
            console.log(error);
        });
    }}

    render(){
        return(
            <div className="col-md-4 text-center">
            <h2 className="text-center depoimento__space">Pending</h2>
            {this.state.testimonial.reverse().map((testimonial, index) => {
            return (
            <div key={testimonial.id} className="depoimento_table space visualizador__foto">
                {testimonial.image_url === '' ? (
                    <object data="https://res.cloudinary.com/dpw1qe5ha/image/upload/v1548972489/hzti6h596hvsr1gug4et.png" className="rounded-circle" width="110px" height="120px"></object>
                ) : (
                    <object data={testimonial.image_url} className="rounded-circle" width="110px" height="120px"></object>
                )}
                <div className="rating-stars">
                <StarRatingComponent 
                name="rate2" 
                editing={false}
                starCount={5}
                value={testimonial.rating}
                />
                </div>
                <p className="visualizador__h"><strong>{testimonial.name}</strong></p>
                <p className="depoimento__p"><i>{testimonial.city}</i></p>
                <p className="depoimento__small">{testimonial.testimony}</p>
                <button onClick={this.Agree.bind(this,testimonial)} className="btn btn-success depoimento__botao-sucesso"><i className="fas fa-check"></i></button>
                <button onClick={this.Disagree.bind(this,testimonial)} className="btn btn-danger depoimento__botao-falha"><i className="fas fa-trash"></i></button>
            </div>
            )
        })}
            </div>
        );
    }   
}
export default DepoimentosApr;