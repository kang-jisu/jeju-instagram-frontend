import React, { useEffect } from 'react';

import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView } from
"mdbreact";

import "./board.css";
const Carousel = function(props){
    return (
        <MDBCarousel
        activeItem={1}
        length={props.length}
        showControls={true}
        showIndicators={true}
        className="card-img-top"
    >
        <MDBCarouselInner>
        {
            props.map((url,index)=>{
                return(
                    <MDBCarouselItem itemId={index+1} key={index+1}>
                    <MDBView>
                    <img
                        className="img"
                        src={url}
                        alt="board"
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