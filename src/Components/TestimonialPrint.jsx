import React, {Component} from 'react';

import Slider from "react-slick";
import StarRatingComponent from 'react-star-rating-component';

import axios from 'axios';

const URLTESTIMONIAL = 'https://depoimentos-react.herokuapp.com/testimonials';

class Print extends Component {
    constructor(props){
        super(props)
        this.state = {
            testimonial: []
        }
        this.getTestimonial = this.getTestimonial.bind(this)
    }
    idealStatus(data){
        return data.status === 2
    }
    getTestimonial(){
        axios
        .get(URLTESTIMONIAL)
        .then(res => {
            const testimonialApproved = res.data.filter(this.idealStatus)
            this.setState({testimonial:testimonialApproved})
        })
        .catch(error => {
            console.log(error)
        })
    }
    componentDidMount(){
        this.getTestimonial()
    }
    render(){
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 4000,
          };
        return(
        <div className="container text-center">
        <div className="col-md-4">
        <Slider {...settings}>
        {this.state.testimonial.reverse().map((testimonial, index) => {
            return (
            <div key={testimonial.id} className="space visualizador__foto">
                <div className="rating-stars">
                <StarRatingComponent 
                name="rate2" 
                editing={false}
                starCount={5}
                value={testimonial.rating}
                />
                </div>
                {testimonial.image_url === '' ? (
                    <object data="https://res.cloudinary.com/dpw1qe5ha/image/upload/v1548972489/hzti6h596hvsr1gug4et.png" className="rounded-circle" width="110px" height="120px"></object>
                ) : (
                    <object data={testimonial.image_url} className="rounded-circle" width="110px" height="120px"></object>
                )}
                <p className="visualizador__h"><strong>{testimonial.name}</strong></p>
                <p className="depoimento__p"><i>{testimonial.city}</i></p>
                <p className="depoimento__p"></p><p className="depoimento__small visualizador__small">{testimonial.testimony}</p>
            </div>
            )
        })}
        </Slider>
      </div>
      </div>
        );
    }
}

export default Print;