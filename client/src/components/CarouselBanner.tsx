import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import images
import restaurante from '../assets/images/restaurante2.jpg';
import combo1 from '../assets/images/img1.jpeg';
import combo2 from '../assets/images/img2.jpeg';

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