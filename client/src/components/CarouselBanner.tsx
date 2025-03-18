import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Importe suas imagens
import restaurante from '../assets/images/restaurante (2).JPG';
import combo1 from '../assets/images/restaurante (3).JPG';
import combo2 from '../assets/images/restaurante (2)_.jpeg';


const CarouselBanner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="relative overflow-hidden">
            <Slider {...settings}>
                <div>
                    <img src={restaurante} alt="Prato principal" className="w-full h-full object-cover" />
                </div>
                <div>
                    <img src={combo1} alt="Combo 1" className="w-full h-full object-cover" />
                </div>
                <div>
                    <img src={combo2} alt="Combo 2" className="w-full h-full object-cover" />
                </div>
            
            </Slider>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30">
                {/* Conteúdo do banner */}
                <div className="flex items-center justify-center h-full">
                </div>
            </div>
        </div>
    );
};

export default CarouselBanner;