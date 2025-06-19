import React, { useState, useCallback } from 'react';
import { HiPlus, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Tecvinson Academy?",
      answer: "Tecvinson Academy is a non-profit organization based in Sweden offering free, high-quality IT training to learners across the globe. We equip individuals with job-ready digital skills to thrive in today's tech-driven world.",
      hasLearnMore: true
    },
    {
      question: "What makes Tecvinson Academy different from other training platforms?",
      answer: "• 💯 Completely Free – No tuition or hidden fees.\n• 🛠 Hands-On Learning – Real-world projects, live mentorship, and teamwork.\n• 📈 Up-to-Date Curriculum – Constantly aligned with industry trends.\n• 🚀 Career Support – CV writing, interview prep, and LinkedIn optimization.\n• 📅 Structured & Disciplined – Strong commitment and attendance required.\n• 🌍 Fully Online – Accessible globally with the right tools."
    },
    {
      question: "Who can apply?",
      answer: "Our programs are open to everyone:\n• ✅ Beginners with no prior experience\n• ✅ Intermediate learners looking to upskill\n• ✅ Professionals aiming to specialize or transition into tech"
    },
    {
      question: "How is the training structured?",
      answer: "Our program runs in four progressive stages:\n• Stage 1: IT Foundations & Assignments\n• Stage 2: Programming Fundamentals + Mini Projects\n• Stage 3: Specialized Learning Track (Team-based)\n• Stage 4: Internship & Mentorship + Career Coaching"
    },
    {
      question: "What are the prerequisites for applying?",
      answer: "• Basic computer literacy (using a computer, internet browsing)\n• Strong motivation and commitment to complete the program\n• Ability to attend live sessions and complete assignments on time"
    }    
    
  ];

  const toggleAccordion = useCallback((index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const formatAnswer = (answer) => {
    // Split by newlines and process each line
    const lines = answer.split('\n');
    
    return lines.map((line, lineIndex) => {
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) {
        return <div key={lineIndex} className="mb-2"></div>;
      }
      
      // Check if line starts with bullet point
      if (trimmedLine.startsWith('•')) {
        return (
          <div key={lineIndex} className="flex items-start mb-2">
            <span className="text-[#3B9790] mr-2 mt-1 flex-shrink-0">•</span>
            <span>{trimmedLine.replace('•', '').trim()}</span>
          </div>
        );
      } 
      // Check if line is a section header (starts with emoji and contains text)
      else if (/^[🧭🎨💻💼🍏💡✅📌]/u.test(trimmedLine)) {
        return (
          <div key={lineIndex} className="font-semibold text-gray-800 mt-4 mb-2">
            {trimmedLine}
          </div>
        );
      }
      // Regular text line
      else {
        return (
          <div key={lineIndex} className="mb-2">
            {trimmedLine}
          </div>
        );
      }
    }).filter(Boolean);
  };

  return (
    <div className="max-w-full sm:max-w-7xl mx-auto p-4 sm:p-6 mb-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">Frequently Asked Questions</h1>
      
      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className={`flex justify-between items-center p-4 sm:py-2 sm:px-4 cursor-pointer ${activeIndex === index ? 'bg-[#EDF8F7]' : 'bg-white'}`}
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-content-${index}`}
            >
              <span className="text-gray-800 font-medium text-sm sm:text-base pr-4">
                {index + 1}. {faq.question}
              </span>
              <button 
                className="flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 rounded-lg border border-gray-300 text-gray-500 flex-shrink-0"
                aria-label={activeIndex === index ? `Collapse ${faq.question}` : `Expand ${faq.question}`}
              >
                {activeIndex === index ? (
                  <HiX className="w-4 h-4 sm:w-4 sm:h-4 text-[#3B9790]" />
                ) : (
                  <HiPlus className="w-4 h-4 sm:w-4 sm:h-4 text-[#3B9790]" />
                )}
              </button>
            </div>
            
            {activeIndex === index && (
              <div 
                id={`faq-content-${index}`}
                className="p-2 sm:py-0 sm:px-4 bg-[#EDF8F7] text-gray-600 text-sm sm:text-base leading-relaxed overflow-x-auto"
              >
                {formatAnswer(faq.answer)}
                {faq.hasLearnMore && (
                  <div className="mt-1 pt-1 border-t border-gray-300">
                    <a 
                      href="/what_difference" 
                      className="inline-flex items-center text-[#3B9790] hover:text-[#2d7066] font-medium text-sm transition-colors duration-200"
                    >
                      Learn more about Tecvinson Academy
                      <svg 
                        className="ml-1 w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          to="/frequently-asked-questions" 
          className="inline-block px-6 py-[1rem] bg-[#FAFAFA] text-[#3B9790] rounded-xl border hover:shadow-lg transition-all duration-300 font-semibold"
        >
          Go to FAQ Page
        </Link>
      </div>
    </div>
  );
};

export default Faq; 