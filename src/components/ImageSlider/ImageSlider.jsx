import React from 'react'
import Slider from "react-slick";


export default function ImageSlider({images}) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {images?.map((img) => {
                return <img src={img} alt="Product"
                    class="w-full object-contain rounded-lg shadow-md mb-4" id="mainImage" />
            })}
        </Slider>
    )
}
