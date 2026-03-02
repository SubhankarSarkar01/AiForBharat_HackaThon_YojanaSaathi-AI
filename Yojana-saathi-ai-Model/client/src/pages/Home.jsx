import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import About from '../components/About';
import Resources from '../components/Resources';
import Contact from '../components/Contact';

const Home = () => {
    const location = useLocation();

    // Handle hash scrolling on load if navigating from another page
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div className="flex flex-col items-center w-full min-h-screen">
            <Hero />
            <Carousel />
            <About />
            <Resources />
            <Contact />
        </div>
    );
};

export default Home;
