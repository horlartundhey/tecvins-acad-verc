import { useEffect, useState } from "react"
import { HiX } from "react-icons/hi"
import { HiPlus } from "react-icons/hi2"

const faqCategories = [
  { id: "about", name: "About Tecvinson Academy", active: true },
  { id: "courses", name: "Courses & Curriculum", active: false },
  { id: "training", name: "Training, Tools & Requirements", active: false },
  { id: "internships", name: "Internships & Career Growth", active: false },
  { id: "trainers", name: "Trainers & Volunteering", active: false },
  { id: "support", name: "Support & Giving Back", active: false },
  { id: "community", name: "Community & Collaboration", active: false },
]

const faqData = {
  about: [
    {
      question: "What is Tecvinson Academy?",
      answer:
        "Tecvinson Academy is a non-profit organization based in Sweden offering free, high-quality IT training to learners across the globe. We equip individuals with job-ready digital skills to thrive in today's tech-driven world.",
    },
    {
      question: "What makes Tecvinson Academy different from other training platforms?",
      answer:
        "• 💯 Completely Free – No tuition or hidden fees.\n• 🛠 Hands-On Learning – Real-world projects, live mentorship, and teamwork.\n• 📈 Up-to-Date Curriculum – Constantly aligned with industry trends.\n• 🚀 Career Support – CV writing, interview prep, and LinkedIn optimization.\n• 📅 Structured & Disciplined – Strong commitment and attendance required.\n• 🌍 Fully Online – Accessible globally with the right tools.",
    },
    {
      question: "How is the training structured?",
      answer:
        "Our program runs in four progressive stages:\n• Stage 1: IT Foundations & Assignments\n• Stage 2: Programming Fundamentals + Mini Projects\n• Stage 3: Specialized Learning Track (Team-based)\n• Stage 4: Internship & Mentorship + Career Coaching",
    },
    {
      question: "What level of experience do I need to enroll in Tecvinson Academy courses?",
      answer:
        "Tecvinson Academy welcomes learners at all levels! Whether you're a beginner with no prior experience or looking to advance your existing skills, our courses are designed to cater to your needs. Each course includes foundational lessons for newcomers and advanced modules for those seeking deeper expertise.",
    },
    {
      question: "How long are the courses at Tecvinson Academy?",
      answer:
        "Course duration varies depending on the program. Our bootcamp-style courses typically run 12-24 weeks, while specialized workshops can be completed in 2-6 weeks. Self-paced online courses allow you to learn at your own speed.",
    },
  ],
  courses: [
    {
      question: "What courses are available?",
      answer:
        "We offer 15+ job-focused courses across four key areas:\n\n🧭 Product Management\n• Product Management\n• Product Owner\n• Business Analysis\n\n🎨 Product Design\n• UI/UX Design\n\n💻 Product Development\n• Frontend Development\n• Backend Development\n• Mobile Development\n• Data Science & Machine Learning\n\n💼 Career Readiness & Freelancing\n• Career Coaching & Interview Prep",
    },
    {
      question: "What programming languages do you teach?",
      answer:
        "We offer comprehensive courses in JavaScript, Python, React, Node.js, TypeScript, and many other modern technologies. Our curriculum covers both frontend and backend development, as well as mobile app development.",
    },
    {
      question: "Are the courses project-based?",
      answer:
        "Yes! All our courses include hands-on projects that simulate real-world scenarios. You'll build a portfolio of projects that demonstrate your skills to potential employers, including web applications, APIs, and mobile apps.",
    },
    {
      question: "Can I get a certificate upon completion?",
      answer:
        "Upon successful completion of any course, you'll receive a verified certificate that you can add to your LinkedIn profile and resume. Our certificates are recognized by many employers in the tech industry.",
    },
  ],
  training: [
    {
      question: "What tools and software will I need?",
      answer:
        "We provide a comprehensive list of required tools before each course begins. Most software we use is free and open-source, including VS Code, Git, and various development frameworks. We also provide access to premium tools during your learning period.",
    },
    {
      question: "Do I need a powerful computer to participate?",
      answer:
        "Not necessarily! Most of our courses can be completed on a standard laptop or desktop computer. For more intensive courses like mobile development, we provide cloud-based development environments.",
    },
  ],
  internships: [
    {
      question: "Do you help with job placement?",
      answer:
        "Yes! We have partnerships with numerous tech companies and provide career counseling, resume reviews, interview preparation, and job placement assistance. Our career success rate is over 85% within 6 months of graduation.",
    },
    {
      question: "Are there internship opportunities available?",
      answer:
        "We offer both virtual and in-person internship opportunities with our partner companies. These internships provide real-world experience and often lead to full-time job offers.",
    },
  ],
  trainers: [
    {
      question: "Who are the instructors?",
      answer:
        "Our instructors are industry professionals with years of experience at top tech companies like Google, Microsoft, and Amazon. They bring real-world expertise and current industry practices to the classroom.",
    },
    {
      question: "Can I become an instructor at Tecvinson Academy?",
      answer:
        "We're always looking for experienced professionals to join our teaching team. If you have industry experience and a passion for teaching, we'd love to hear from you. Please check our careers page for current openings.",
    },
  ],
  support: [
    {
      question: "What kind of support is available during the course?",
      answer:
        "We provide 24/7 access to our learning platform, weekly one-on-one mentoring sessions, peer study groups, technical support for any platform-related issues, and access to our community forums.",
    },
    {
      question: "What if I fall behind in the course?",
      answer:
        "Don't worry! We offer flexible pacing options and additional support sessions. Our mentors will work with you to create a personalized catch-up plan, and you'll have access to recorded sessions and additional resources.",
    },
  ],
  community: [
    {
      question: "Is there a community of learners I can connect with?",
      answer:
        "We have an active online community with over 10,000 students and alumni where you can connect, share projects, collaborate on ideas, and support each other's learning journey. We also host regular virtual meetups and networking events.",
    },
    {
      question: "Are there local meetups or events?",
      answer:
        "Yes! We organize local meetups in major cities, hackathons, and tech talks. These events are great opportunities to network with fellow students, alumni, and industry professionals.",
    },
  ],
}

const Frequently_asked = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
            
  const [activeCategory, setActiveCategory] = useState("about")
  const [searchTerm, setSearchTerm] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  // Enhanced search functionality that searches across all categories
  const getFilteredFaqs = () => {
    if (!searchTerm.trim()) {
      // If no search term, return current category FAQs
      return {
        faqs: faqData[activeCategory] || [],
        isSearching: false
      }
    }

    // Search across all categories
    const searchResults = []
    const lowerSearchTerm = searchTerm.toLowerCase()

    Object.entries(faqData).forEach(([categoryId, faqs]) => {
      const categoryName = faqCategories.find(cat => cat.id === categoryId)?.name || categoryId
      
      faqs.forEach(faq => {
        if (
          faq.question.toLowerCase().includes(lowerSearchTerm) ||
          faq.answer.toLowerCase().includes(lowerSearchTerm)
        ) {
          searchResults.push({
            ...faq,
            category: categoryName,
            categoryId: categoryId
          })
        }
      })
    })

    return {
      faqs: searchResults,
      isSearching: true
    }
  }

  const { faqs: filteredFaqs, isSearching } = getFilteredFaqs()

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId)
    setIsMobileMenuOpen(false)
    setSearchTerm("") // Clear search when switching categories
    setOpenFaqIndex(null) // Close any open FAQ
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setOpenFaqIndex(null) // Close any open FAQ when searching
  }

  const CategorySidebar = ({ className = "" }) => (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-xl">FAQ Categories</h3>
      </div>
      <nav className="p-2">
        {faqCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`w-full text-left px-3 py-[1rem] rounded-md text-sm transition-colors ${
              activeCategory === category.id && !searchTerm
                ? "bg-[#DBF2F0] text-[#2C716C] font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>
    </div>
  )

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto bg-[#D58A00] rounded-3xl text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions (FAQs)</h1>
            <p className="text-lg sm:text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
              Explore everything you need to know about our programs, how to apply, what to expect, and how we support
              your career journey.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search across all FAQs..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 bg-white text-gray-900 border-0 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setOpenFaqIndex(null)
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <HiX className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {/* Search Results Count */}
            {searchTerm && (
              <p className="mt-4 text-amber-100">
                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} found for "{searchTerm}"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-start px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              FAQ Categories
            </button>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
                <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl">
                  <div className="p-4 border-b">
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="float-right text-gray-400 hover:text-gray-600"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <CategorySidebar />
                </div>
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-8">
              <CategorySidebar />
            </div>
          </div>

          {/* FAQ Content */}
          <div className="flex-1">
            <div className="rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isSearching ? "Search Results" : "FAQ Categories"}
                </h2>
                <p className="text-gray-600 mt-1">
                  {isSearching 
                    ? `Showing results for "${searchTerm}"`
                    : faqCategories.find((cat) => cat.id === activeCategory)?.name
                  }
                </p>
              </div>

              <div className="p-6">
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      {searchTerm
                        ? "No FAQs found matching your search. Try different keywords or browse categories."
                        : "No FAQs available in this category."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => {
                      const isOpen = openFaqIndex === index;
                      return (
                        <div
                          key={index}
                          className={`border rounded-lg ${
                            isOpen ? "bg-[#EDF8F7]" : "bg-white"
                          }`}
                        >
                          <button
                            onClick={() => toggleFaq(index)}
                            className="w-full text-left px-4 py-4 hover:bg-gray-50 focus:outline-none transition-colors"
                          >
                            <div className="flex justify-between items-center">
                              <div className="pr-4">
                                <span className="font-medium text-sm sm:text-base text-[#2C716C]">
                                  {index + 1}. {faq.question}
                                </span>
                                {isSearching && faq.category && (
                                  <div className="mt-1">
                                    <span className="inline-block px-2 py-1 text-xs bg-[#DBF2F0] text-[#2C716C] rounded-full">
                                      {faq.category}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <button
                                className="flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 rounded-lg flex-shrink-0"
                                aria-label={
                                  isOpen
                                    ? `Collapse ${faq.question}`
                                    : `Expand ${faq.question}`
                                }
                              >
                                {isOpen ? (
                                  <HiX className="w-4 h-4 sm:w-4 sm:h-4 text-[#3B9790]" />
                                ) : (
                                  <HiPlus className="w-4 h-4 sm:w-4 sm:h-4 text-[#3B9790]" />
                                )}
                              </button>
                            </div>
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-[#EDF8F7]">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Frequently_asked