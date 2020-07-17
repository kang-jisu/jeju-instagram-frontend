import React, { Component } from 'react';

import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";

const Carousel = function(props){
    return (
        <MDBCarousel
        activeItem={1}
        length={props.length}
        showControls={true}
        showIndicators={true}
    >
        <MDBCarouselInner>
        {
            props.map((url,index)=>{
                return(
                    <MDBCarouselItem itemId={index+1}>
                    <MDBView>
                    <img
                        className="img"
                        src={url}
                        alt="image"
                    />
                    </MDBView>
                    </MDBCarouselItem>
                )
            })
        }
        </MDBCarouselInner>
    </MDBCarousel>
    )
}

export default Carousel;