import React from 'react';

export default props => (
    <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
        <li className="breadcrumb-item"><p>Testimonial Dashboard</p></li>
        <li className="breadcrumb-item"><strong>{props.Title}</strong></li>
    </ol>
</nav>
)