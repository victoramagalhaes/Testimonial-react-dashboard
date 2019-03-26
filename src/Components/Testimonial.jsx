import React, {Component} from 'react';
import TestimonialPending from './TestimonialPending'
import TestimonialApproved from './TestimonialApproved'
import Breadcumb from './Breadcumb';

class Depoimentos extends Component {
    render(){
        return(
            <div>
            <Breadcumb Title="Testimonial Pending/Approved"/>
            <div className="container-fluid">
                <div className="row justify-content-around">
                <TestimonialPending/>
                <TestimonialApproved/>
                </div>
            </div>
            </div>
        );
    }
}
export default Depoimentos