import { useEffect, useState } from "react";

const ScrollTopBtn: React.FC = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 1600) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {showButton &&
                <div className="scroll-btn">
                    <button onClick={scrollToTop}><img src="/images/home_page/shevron-up-icon.png" alt="arrow pointing up" /></button>
                </div>
            }
        </>
    )

}

export default ScrollTopBtn