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
      question: "What courses are available?",
      answer: "We offer 15+ job-focused courses across four key areas:\n\n🧭 Product Management\n• Product Management\n• Product Owner\n• Business Analysis\n• Agile & Scrum\n\n🎨 Product Design\n• UI/UX Design\n\n💻 Product Development\n• Frontend Development (HTML, CSS, JavaScript + Frameworks)\n• Backend Development (Java, Python, C#)\n• Mobile Development\n• DevOps\n• Cybersecurity\n• Software Quality\n• Data Engineering\n• Data Analysis\n• Data Science & Machine Learning\n• Generative AI\n\n💼 Career Readiness & Freelancing\n• CV & Cover Letter Writing\n• Technical Writing\n• Interview Coaching\n• LinkedIn Profile Optimization\n• Freelancing & Remote Work Best Practices\n\n📌 Note: Course offerings are updated based on market demand."
    },
    {
      question: "Can I take more than one course at once?",
      answer: "No. To ensure depth and quality learning, you can only pursue one course per cohort."
    },
    {
      question: "Will I receive a certificate after completing the course?",
      answer: "Yes! All graduates receive a Certificate of Completion, which can be added to your LinkedIn and resume."
    },
    {
      question: "How are classes conducted?",
      answer: "All training sessions are online via Microsoft Teams. You'll collaborate using:\n• SharePoint, Miro, Jira, and Confluence\n• GitHub, Figma, and relevant dev/design tools"
    },
    {
      question: "What is your attendance policy?",
      answer: "Attendance is mandatory. Students must:\n• Attend scheduled sessions\n• Engage actively in assignments and teamwork\n• Avoid unexcused absences (which may lead to warnings or removal)"
    },
    {
      question: "What laptop do I need for training?",
      answer: "💻 Windows (Recommended):\n• OS: Windows 11 or 10 (not older than 5 years)\n• CPU: Intel i5 10th Gen+ or AMD Ryzen 5 4000+\n• RAM: 16GB (8GB minimum)\n• SSD: 512GB (256GB minimum)\n\n🍏 MacBook (Recommended):\n• OS: macOS 12.0+ (Monterey or newer)\n• CPU: Apple M1/M2 or Intel i5 10th Gen+\n• RAM: 16GB+\n• SSD: 512GB+\n\n💡 Laptops with 8GB RAM may underperform for some development tasks."
    },
    {
      question: "What internet speed do I need?",
      answer: "A stable internet connection is essential.\n\n✅ Minimum Speeds:\n• Download: 10 Mbps (25+ Mbps recommended)\n• Upload: 5 Mbps (10+ Mbps recommended)"
    },
    {
      question: "Do you offer job placement support?",
      answer: "Yes. In Stage 4, students:\n• Work on real-world projects\n• Receive career mentorship\n• Get connected with job and internship opportunities"
    },
    {
      question: "What happens if I don't meet graduation criteria?",
      answer: "You may not receive a certificate but could be invited to retake the assessment or join a future cohort."
    },
    {
      question: "What industries do your graduates work in?",
      answer: "Our alumni work in:\n• Tech Startups\n• Software Development\n• Data & Cloud Platforms\n• Cybersecurity\n• Business & Product Teams\n• Consulting & Freelancing"
    },
    {
      question: "Who teaches at Tecvinson Academy?",
      answer: "Our 25+ trainers are experienced IT professionals who volunteer their time to support student growth."
    },
    {
      question: "Can I become a volunteer trainer?",
      answer: "Yes! We welcome IT experts passionate about mentorship, teaching, and giving back."
    },
    {
      question: "How is the academy funded?",
      answer: "We operate through donations, sponsorships, and strategic partnerships."
    },
    {
      question: "How can I support your mission?",
      answer: "You can help by:\n• ✅ Donating or sponsoring students\n• ✅ Volunteering as a trainer\n• ✅ Donating licenses or tools\n• ✅ Becoming a hiring partner\n• ✅ Providing laptops or internet support to students in need"
    },
    {
      question: "Do you provide laptops or internet access?",
      answer: "Not at the moment. But we're actively working to raise funds to support students who lack essential resources."
    },
    {
      question: "How do students stay connected?",
      answer: "Students collaborate using:\n• Microsoft Teams (training & team channels)\n• SharePoint and WhatsApp groups for peer communication"
    },
    {
      question: "Can I network with alumni and other students?",
      answer: "Yes! We encourage community-building through:\n• Alumni groups\n• Tech events & workshops\n• Peer-led discussions and networking sessions"
    },
    {
      question: "How can I stay informed about new updates?",
      answer: "Follow us on our:\n• Official Website\n• LinkedIn | Instagram | Twitter @TecvinsonAcademy\n• Newsletter (coming soon)"
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
              className={`flex justify-between items-center p-4 sm:p-6 cursor-pointer ${activeIndex === index ? 'bg-[#EDF8F7]' : 'bg-white'}`}
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
                className="p-4 sm:p-4 bg-[#EDF8F7] text-gray-600 text-sm sm:text-base leading-relaxed overflow-x-auto"
              >
                {formatAnswer(faq.answer)}
                {faq.hasLearnMore && (
                  <div className="mt-4 pt-3 border-t border-gray-300">
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
          className="inline-block px-6 py-[1.3rem] bg-[#FAFAFA] text-[#3B9790] rounded-xl border shadow-md hover:shadow-lg transition-all duration-300 font-medium"
        >
          Go to FAQ Page
        </Link>
      </div>
    </div>
  );
};

export default Faq; 