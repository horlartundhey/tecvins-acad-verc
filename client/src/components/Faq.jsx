import React, { useState } from 'react';
import { HiPlus, HiX } from 'react-icons/hi';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0); // First item expanded by default

  const faqs = [
    {
      question: "What level of experience do I need to enroll in Tecvinson Academy courses?",
      answer: "Tecvinson Academy welcomes learners at all levels! Whether you're a beginner with no prior experience or looking to advance your existing skills, our courses are designed to cater to your needs. Each course includes foundational lessons for newcomers and advanced modules for those seeking deeper expertise."
    },
    {
      question: "How long do I have access to the course materials?",
      answer: "You'll have lifetime access to all course materials, including any future updates. We believe in continuous learning and want you to be able to revisit the content whenever you need."
    },
    {
      question: "What kind of support can I expect during my learning journey?",
      answer: "Our support includes dedicated instructor feedback, peer discussion forums, and weekly Q&A sessions. You'll also have access to our student success team for any technical or administrative questions."
    },
    {
      question: "Do you offer certificates upon completion?",
      answer: "Yes! All our courses come with a verifiable certificate of completion that you can add to your LinkedIn profile or resume. Some programs also include portfolio-ready projects to showcase your skills."
    },
    {
      question: "What if I'm not satisfied with the course?",
      answer: "We offer a 30-day money-back guarantee with no questions asked. If the course doesn't meet your expectations, simply contact our support team for a full refund."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mb-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className={`flex justify-between items-center p-6 cursor-pointer ${activeIndex === index ? 'bg-[#EDF8F7]' : 'bg-white'}`}
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-content-${index}`}
            >
              <span className="text-gray-800 font-medium">
                {index + 1}. {faq.question}
              </span>
              <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-500">
                {activeIndex === index ? (
                  <HiX className="w-4 h-4 text-[#3B9790]" />
                ) : (
                  <HiPlus className="w-4 h-4 text-[#3B9790]" />
                )}
              </button>
            </div>
            
            {activeIndex === index && (
              <div 
                id={`faq-content-${index}`}
                className="p-4 bg-[#EDF8F7] text-gray-600"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Faq;