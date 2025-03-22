import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { usePromocao } from '../contexts/PromocaoContext';

// Import images
import restaurante from '../assets/images/restaurante2.jpg';
import combo1 from '../assets/images/img1.jpeg';
import combo2 from '../assets/images/img2.jpeg';

interface SlideDefault {
    id: number;
    imagem: string;
}

const CarouselBanner = () => {
    const { promocoes } = usePromocao();

    // Filtrar promoções ativas
    const activePromocoes = promocoes.filter(promocao => {
        const now = new Date();
        const start = new Date(promocao.dataInicio);
        const end = new Date(promocao.dataFim);
        return now >= start && now <= end;
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    };

    // Slides padrão quando não há promoções
    const defaultSlides: SlideDefault[] = [
        { id: 1, imagem: restaurante },
        { id: 2, imagem: combo1 },
        { id: 3, imagem: combo2 }
    ];

    const renderPromocao = (promocao: typeof promocoes[0]) => (
        <div key={promocao.id} className="relative">
            <img 
                src={promocao.imagem || ''} 
                alt="Promoção" 
                className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
    );

    const renderDefaultSlide = (slide: SlideDefault) => (
        <div key={slide.id} className="relative">
            <img 
                src={slide.imagem} 
                alt="Banner" 
                className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
    );

    return (
        <div className="relative">
            <Slider {...settings}>
                {activePromocoes.length > 0 
                    ? activePromocoes.map(renderPromocao)
                    : defaultSlides.map(renderDefaultSlide)
                }
            </Slider>
        </div>
    );
};

export default CarouselBanner;