import { faqData } from '@/constants';
import { NextPage } from 'next';
import React, { useState } from 'react';

const Faq: NextPage = () => {
  const [visibleFaqs, setVisibleFaqs] = useState(6);

  const showMoreFaqs = () => {
    setVisibleFaqs(visibleFaqs + 3); // Show 3 more FAQs
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className='main'>
      <div className='Hero-faq'>
        <h1 className='h1-text'>
          Frequently <br /> Asked <br /> Questions
        </h1>
      </div >
      {faqData.slice(0, visibleFaqs).map((faq, index) => (
        <div key={index} >
          <hr className='width-hr-faq' />
          <div className='faq-open-close'
            onClick={() => toggleAnswer(index)}
          >
            <div className='plus-minus-faq'>{openIndex === index ? '-' : '+'}</div>
            <div className='faq-question'>{faq.question}</div>
          </div>
          {openIndex === index && <div className='faq-answer'>{faq.answer}</div>}
          <hr className='width-hr-faq' />
        </div>
      ))}
      {visibleFaqs < faqData.length && (
        <span onClick={showMoreFaqs} className='faq-show-more'>
          <span className='show-more-faq'>
            +</span>
          <span className='show-more-faq-text'> Show More</span>
        </span>
      )}
      <div className='last-section-faq'>
        <h2 className='h2-faq'>Didn’t find the answer you were looking for?</h2>
        <button className='ask-us-faq'>Ask Us Directly</button>
      </div>
    </main>
  );
};

export default Faq;
