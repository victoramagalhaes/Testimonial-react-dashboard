import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <div className="vertical-center">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-2 col-md-offset-5">
                <ReactLoading type='spinningBubbles' 
                color='#000000'
                height={'80px'} 
                width={'80px'} />
            </div>
        </div>    
    </div>
</div>
    
);
 
export default Loading;