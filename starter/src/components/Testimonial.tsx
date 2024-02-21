interface TestimonialProps {
    quote: string;
    cite: string;
    country: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, cite, country }) => {

    return (
        <div className="testimonial">
            <div className='testimonial-content'>
                <div className="img-container open-position">
                    <img src="/images/home_page/quotation_open.svg" alt="open quotation" />
                </div>
                <p>&rdquo;{quote}&rdquo;</p>
                <div className="img-container closed-position">
                    <img src="/images/home_page/quotation_close.svg" alt="closed quotation" />
                </div>
            </div>
            <div className="testimonial-cite">
                <p>- {cite}, <span>{country}</span></p>
            </div>
        </div>
    )
}

export default Testimonial;