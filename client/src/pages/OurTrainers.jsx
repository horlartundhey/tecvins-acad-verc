"use client"

// import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { MdLibraryBooks } from "react-icons/md"
import { FaLocationDot } from "react-icons/fa6"
import { FaLinkedin } from "react-icons/fa"
import { RiBriefcase4Fill } from "react-icons/ri"

import { Link } from "react-router-dom"

import cindy from "../assets/images/trainers/cindyE.png"
import godswill from "../assets/images/trainers/godswill.png"
import damilare from "../assets/images/trainers/damilare.png"
import oluwatosin from "../assets/images/trainers/oluwatosin.png"
import doris from "../assets/images/trainers/dorris.png"
import austin from "../assets/images/trainers/austin.png"
import arnold from "../assets/images/trainers/arnold.png"
import lukeman from "../assets/images/trainers/lukeman.png"
import adekunle from "../assets/images/trainers/adekunle.png"
import sijibomi from "../assets/images/trainers/sijibomi.png"
import rilwan from "../assets/images/trainers/rilwan.png"
import ufoma from "../assets/images/trainers/ufoma.png"
import samuel from "../assets/images/trainers/samuelO.png"
import joshua from "../assets/images/trainers/joshua.png"
import stanley from "../assets/images/trainers/stanley.png"
import thomas from "../assets/images/trainers/thomas.png"
import victor from "../assets/images/trainers/victorO.png"
import julius from "../assets/images/trainers/julius.png"
import mrinmay from "../assets/images/trainers/mrinmay.png"
import ese from "../assets/images/trainers/ese.png"
import dinesh from "../assets/images/trainers/dinesh.png"
import jubril from "../assets/images/trainers/jubril.png"
import chibuike from "../assets/images/trainers/chibuike.png"
import oladejo from "../assets/images/trainers/adesola.png"
import olufunso from "../assets/images/trainers/olufunso.png"
import vincent from "../assets/images/trainers/vincent.png"
import { HiOutlineRocketLaunch } from "react-icons/hi2"
import { useEffect } from "react"

const trainers = [
  {
    id: "21",
    name: "Cindy Emeh",
    email: "cindy.ajayi@tecvinsonacademy.com",
    location: "Nigerian living in Sweden",
    specialization: "UI/UX Design",
    skills: ["UI/UX Design"],
    experience: [
      "<span style='font-weight: bold;'>2</span> years experience in Customer Service Representative",
      "<span style='font-weight: bold;'>2</span> years in Product Designer",
    ],
    linkedinUrl: "https://www.linkedin.com/in/cindy-emeh/",
    imageUrl: cindy,
  },
  {
    id: "22",
    name: "Godswill David",
    email: "godswill.david@tecvinsonacademy.com",
    location: "Nigerian Living in Nigeria",
    specialization: "Business Analysis",
    skills: ["BA Analyst"],
    experience: ["<span style='font-weight: bold;'>8</span> years experience in Banking & FinTech Sector"],
    linkedinUrl: "https://www.linkedin.com/in/godswill-david/",
    imageUrl: godswill,
  },
  {
    id: "23",
    name: "Damilare Akinboboye",
    email: "damilare.akinboboye@tecvinsonacademy.com",
    location: "Sweden",
    specialization: "Test Automation",
    skills: ["Test Automation"],
    experience: [
      "<span style='font-weight: bold;'>3</span> years experience in the AEC industry",
      "<span style='font-weight: bold;'>2</span> years experience as Test Engineer",
    ],
    linkedinUrl: "https://www.linkedin.com/in/damilare-akinboboye-8300663a/",
    imageUrl: damilare,
  },
  // Row 2
  {
    id: "24",
    name: "Oluwatosin Oresanwo",
    email: "oresanwo.oluwatosin@tecvinsonacademy.com",
    location: "Nigerian Living in Nigeria",
    specialization: "UI/UX Design",
    skills: ["UI/UX Design"],
    experience: ["<span style='font-weight: bold;'>4</span> years experience in Product (UI/UX) Design"],
    linkedinUrl: "https://www.linkedin.com/in/tosin-ux/",
    imageUrl: oluwatosin,
  },
  {
    id: "25",
    name: "Doris Ejiodu",
    email: "doris.ejiodu@tecvinsonacademy.com",
    location: "Nigerian living in Sweden",
    specialization: ["Software Testing", "Business Analysis"],
    skills: ["Manual Software Testing", "Business Analysis"],
    experience: [
      "<span style='font-weight: bold;'>7</span> years experience in finance sector",
      "<span style='font-weight: bold;'>3</span> years experience as Software Test Engineer",
      "<span style='font-weight: bold;'>3</span> year experience as a Business & System Analyst",
      "<span style='font-weight: bold;'>1</span> year experience as a Product Owner",
    ],
    linkedinUrl: "https://www.linkedin.com/in/doris-ejiodu/",
    imageUrl: doris,
  },
  {
    id: "26",
    name: "Austin Tochukwu Asoluka",
    email: "austin.asoluka@tecvinsonacademy.com",
    location: "Nigerian Living in Nigeria",
    specialization: "MERN Stack Development",
    skills: ["Javascript MERN stack"],
    experience: ["<span className='font-bold'>8</span> years, Software Development"],
    linkedinUrl: "https://www.linkedin.com/in/asoluka/",
    imageUrl: austin,
  },
  // Row 3 (from second image)
  {
    id: "15",
    name: "Arnold Popoola",
    email: "arnold.popoola@tecvinsonacademy.com",
    location: "Nigerian living in Sweden",
    specialization: ["Test Automation", "Python Programming"],
    skills: ["Test Automation", "Python Programming"],
    experience: [
      "<span style='font-weight: bold;'>9</span> years+ experience in programming",
      "<span style='font-weight: bold;'>3</span> years experience in Software Testing",
      "<span style='font-weight: bold;'>2</span> years experience in IT Support",
      "<span style='font-weight: bold;'>5</span> years+ Graphic Design & Video Editing",
    ],
    linkedinUrl: "https://www.linkedin.com/in/arnold-e-popo-ola/",
    imageUrl: arnold,
  },
  {
    id: "16",
    name: "Lukeman Frimpong",
    email: "lukeman.frimpong@tecvinsonacademy.com",
    location: "Ghanaian living in Sweden",
    specialization: ["Data Analytics", "Data Science", "Machine Learning", "Artificial Intelligence"],
    skills: ["Data Analytics", "Data Science", "Machine Learning", "Artificial Intelligence"],
    experience: [
      "<span style='font-weight: bold;'>3</span> years Experience in Machine Learning and Artificial Intelligence",
      "<span style='font-weight: bold;'>4</span> years experience as Data Scientist and Data Analyst",
    ],
    linkedinUrl: "https://www.linkedin.com/in/lukeman-frimpong-306bb3212/",
    imageUrl: lukeman,
  },
  {
    id: "17",
    name: "Adekunle Lawal",
    email: "adekunle.lawal@tecvinsonacademy.com",
    location: "Nigerian living in Sweden",
    specialization: ["DevOps", "Cloud Computing"],
    skills: ["DevOps", "Cloud Computing"],
    experience: [
      "<span style='font-weight: bold;'>15</span> years experience in the IT sector",
      "<span style='font-weight: bold;'>12</span> years experience in Linux Systems administration",      
      "<span style='font-weight: bold;'>9</span> Years experience in Cloud Computing",
      "<span style='font-weight: bold;'>7</span> Years experience in DevOps",
    ],
    linkedinUrl: "https://www.linkedin.com/in/adekunlelawal/",
    imageUrl: adekunle,
  },
  // Row 4
  {
    id: "18",
    name: "Sijibomi Ajayi",
    email: "sijibomi.ajayi@tecvinsonacademy.com",
    location: "Nigerian living in Sweden",
    specialization: ["DevOps", "Cloud Computing"],
    skills: ["DevOps", "Cloud Engineering"],
    experience: [
      "<span style='font-weight: bold;'>7</span> years experience as DevOps, Cloud, and Site Reliability Engineer",
      "<span style='font-weight: bold;'>3</span> years experience in software engineering",
    ],
    linkedinUrl: "https://www.linkedin.com/in/sijibomiajayi/",
    imageUrl: sijibomi,
  },
  {
    id: "19",
    name: "Rilwan Bello",
    email: "rilwan.bello@tecvinsonacademy.com",
    location: "Nigerian living in Sweden",
    specialization: ["DevOps", "Cloud", "Linux", "Kubernetes"],
    skills: ["DevOps", "Cloud", "Linux", "Kubernetes"],
    experience: [
      "<span style='font-weight: bold;'>3</span> years experience as DevOps, Cloud, Linux and Kubernetes Engineer",
      "Certified Kubernetes Administrator",
    ],
    linkedinUrl: "https://www.linkedin.com/in/rilwan-bello/",
    imageUrl: rilwan,
  },
  {
    id: "20",
    name: "Ufoma Genesis",
    email: "ufoma.genesis@tecvinsonacademy.com",
    location: "Nigerian living in Sweden",
    specialization: ["Offensive Cybersecurity"],
    skills: ["Offensive Cybersecurity"],
    experience: [
      "<span style='font-weight: bold;'>8</span> years experience as Offensive Cybersecurity Engineer in the Banking Sector/Fintech",
    ],
    linkedinUrl: "https://www.linkedin.com/in/ufoma-genesis-ceh-istqb%C2%AE-9a9b62a7/",
    imageUrl: ufoma,
  },
  // Row 5 (from third image)
  {
    id: "1",
    name: "Samuel Osinloye",
    email: "samuel.osinloye@tecvinsonacademy.com",
    location: "Nigerian living in Nigeria",
    specialization: ["Backend Engineering (.NET Core)"],
    skills: ["Backend Engineering (.NET Core)"],
    experience: [
      "<span style='font-weight: bold;'>4</span> years experience in full stack Software Development with Microsoft Technologies such as Blazor, .NET Core, WPF etc.",
      "Databases (SQL and NoSQL), ",
      "Message brokers (Kafka)",
      "Version control (Git/Git, Azure)",
    ],
    linkedinUrl: "https://www.linkedin.com/in/samuelosinloye/",
    imageUrl: samuel,
  },
  {
    id: "2",
    name: "Joshua Edigbe",
    email: "joshua.edigbe@tecvinsonacademy.com",
    location: "Nigerian living in Nigeria",
    specialization: "Frontend Engineering",
    skills: ["Frontend Engineering"],
    experience: ["<span className='font-bold'>8</span> Years Experience in Frontend Engineering"],
    linkedinUrl: "https://www.linkedin.com/in/joshua-edigbe-a5b506109/",
    imageUrl: joshua,
  },
  {
    id: "3",
    name: "Stanley Umeh",
    email: "stanley.umeh@tecvinsonacademy.com",
    location: "Nigerian living in Nigeria",
    specialization: ["Software Engineering (.NET)"],
    skills: ["Software Engineering (.NET)"],
    experience: [
      "<span style='font-weight: bold;'>4</span> years experience in finance sector",
      "<span style='font-weight: bold;'>4</span> years experience as .NET developer",
    ],
    linkedinUrl: "https://www.linkedin.com/in/stanley-umeh-ugo/",
    imageUrl: stanley,
  },
  // Row 6
  {
    id: "4",
    name: "Thomas Fregene",
    email: "thomas.fregene@tecvinsonacademy.com",
    location: "Nigerian living in Nigeria",
    specialization: ["Software Development (Backend)"],
    skills: ["Software Development (Backend)"],
    experience: [
      "<span style='font-weight: bold;'>3</span> years experience in Software Development",
      "<span style='font-weight: bold;'>3</span> years experience Backend Development",
    ],
    linkedinUrl: "https://www.linkedin.com/in/fregene-thomas-ab86791a4/",
    imageUrl: thomas,
  },
  {
    id: "5",
    name: "Victor Okosodo",
    email: "victor.okosodo@tecvinsonacademy.com",
    location: "Nigerian living in Berlin, Germany",
    specialization: ["Backend Engineering C#/.Net"],
    skills: ["Backend Engineering C#/.Net"],
    experience: [
      "<span style='font-weight: bold;'>10</span> years experience in software engineering and Azure cloud Architect",
    ],
    linkedinUrl: "https://www.linkedin.com/in/okosodo-victor-1a42917a/",
    imageUrl: victor,
  },
  {
    id: "6",
    name: "Julius Oladayo Olasupo",
    email: "julius.oladayo@tecvinsonacademy.com",
    location: "Nigerian living in United Kingdom",
    specialization: "Mobile App Development",
    skills: ["Mobile App Development"],
    experience: [
      "<span style='font-weight: bold;'>8</span> years experience in finance sector",
      "<span style='font-weight: bold;'>7</span> years experience as Mobile Developer",
    ],
    linkedinUrl: "https://www.linkedin.com/in/juliusolasupo/",
    imageUrl: julius,
  },
  // Row 7 (from fourth image)
  {
    id: "9",
    name: "Mrinmay Biswas",
    email: "mrinmay.biswas@tecvinsonacademy.com",
    location: "Indian living in Kolkata, India",
    specialization: ["DevOps", "Cloud", "Java", "Python", "Scripting"],
    skills: ["DevOps", "Cloud", "Java", "Python", "Scripting"],
    experience: [      
      "<span style='font-weight: bold;'>10</span> years experience in Microsoft Technology, VC++, MFC",
      "<span style='font-weight: bold;'>6</span> years experience in Devops tools and technology",
    ],
    linkedinUrl: "https://www.linkedin.com/in/mrinmay-biswas-b8156a18a/",
    imageUrl: mrinmay,
  },
  {
    id: "10",
    name: "Ese Kelvin Uvbiekpahor",
    email: "ese.kelvin@tecvinsonacademy.com",
    location: "Nigerian living in Nigeria",
    specialization: "Java Development",
    skills: ["Java"],
    experience: [
      "<span style='font-weight: bold;'>6</span> years experience in Oil & Gas sector",
      "<span style='font-weight: bold;'>3</span> years experience as Fintech Applications",
    ],
    linkedinUrl: "https://www.linkedin.com/in/ese-kelvin-uvbiekpahor-61214438/",
    imageUrl: ese,
  },
  {
    id: "11",
    name: "Dinesh Pandy",
    email: "dinesh.pandy@tecvinsonacademy.com",
    location: "Indian living in Kolkata, India",
    specialization:  ["DevOps", "Cloud", "Java", "Python", "Scripting"],
    skills: ["DevOps", "Cloud", "Java", "Python", "Scripting"],
    experience: [
      "<span style='font-weight: bold;'>18</span> Years of Total Experience in which <span style='font-weight: bold;'>6</span> Years of experience as Tech Lead",
      "<span style='font-weight: bold;'>3</span> years of experience as Front-End Developer and Full Stack Developer",
      "<span style='font-weight: bold;'>2</span> Years of experience as DevOps Engineer and.​ServiceNow Developer.",
      "Certified Java Developer, ServiceNow Application Developer",
    ],
    linkedinUrl: "https://www.linkedin.com/in/dinesh-pandy-64982737/",
    imageUrl: dinesh,
  },
  // Row 8
  {
    id: "12",
    name: "Jubril Otunbade",
    email: "jubril.otunbade@tecvinsonacademy.com",
    location: "Nigerian living in Nigeria",
    specialization: ["Data Science & ML", "Python"],
    skills: ["Data Science & ML", "Python"],
    experience: [
      "<span style='font-weight: bold;'>6+</span> years Data Science & Machine Learning",
      "<span style='font-weight: bold;'>2+</span> years AI Engineering",
    ],
    linkedinUrl: "https://www.linkedin.com/in/jubriel/",
    imageUrl: jubril,
  },
  {
    id: "13",
    name: "Chibuike Mba",
    email: "chibuike.mba@tecvinsonacademy.com",
    location: "Nigerian living in Nigeria",
    specialization: ["Agentic AI", "Gen AI"],
    skills: ["Agentic AI", "Gen AI"],
    experience: [
      "<span style='font-weight: bold;'>6+</span> years Data Science & Machine Learning",
      "<span style='font-weight: bold;'>2+</span> years AI Engineering",
    ],
    linkedinUrl: "https://www.linkedin.com/in/chibex/",
    imageUrl: chibuike,
  },
  {
    id: "14",
    name: "Oladejo Adesola S.",
    email: "adesola.oladejo@tecvinsonacademy.com",
    location: "Nigerian living in Sweden",
    specialization: ["Programming/Software Development"],
    skills: ["Programming/Software Development"],
    experience: [
      "<span style='font-weight: bold;'>18+</span> Software Development",
      "<span style='font-weight: bold;'>5+</span> Software & Solution Architecture",
    ],
    linkedinUrl: "https://www.linkedin.com/in/adesola-oladejo-78a9a27/",
    imageUrl: oladejo,
  },
  // Row 9 (from fifth image)
  {
    id: "7",
    name: "Olufunso Okeijmi",
    email: "funso@tecvinsonacademy.com",
    location: "Nigerian living in Sweden",
    specialization: "Scrum Master",
    skills: ["Scrum Master"],
    experience: [
      "<span style='font-weight: bold;'>8</span> years experience in Electronics Channels Payments",
      "<span style='font-weight: bold;'>3</span> years experience in Product Management",
      "<span style='font-weight: bold;'>8+</span> years experience in Project Management",
      "<span style='font-weight: bold;'>5</span> years+ Agile Project Management",
    ],
    linkedinUrl: "https://www.linkedin.com/in/funso-okejimi/",
    imageUrl: olufunso,
  },
  {
    id: "8",
    name: "Vincent Oke",
    email: "vincent.oke@tecvinsonacademy.com",
    location: "Nigerian living in Sweden",
    specialization: [
      "Business Analysis",
      "Scrum Master & Product Owner",
      "Product Management",
      "Software Quality",
      "python",
      "CV | Cover Letter | Interviewing Techniques",
    ],
    skills: [
      "Business Analysis",
      "Scrum Master & Product Owner",
      "Product Management",
      "Software Quality",
      "python",
      "CV | Cover Letter | Interviewing Techniques",
    ],
    experience: [
      "<span style='font-weight: bold;'>6</span> years experience as IT Project Lead and Systems Engineer within Oil & Gas and Defense",
      "<span style='font-weight: bold;'>11</span> years experience as Test Engineer, Test Lead, Test Manager within telecommunications and retail",
      "<span style='font-weight: bold;'>5</span> years+ experience as CICD Automation Lead and Developer Experience Lead within retail",
      "Certified Test Manager, Systems Engineer, Scrum Master and Business Analyst",
    ],
    linkedinUrl: "https://www.linkedin.com/in/vincentoo/",
    imageUrl: vincent,
  },
]

const OurTrainers = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#0F2624] mb-4">Meet Our Trainers</h1>
          <p className="text-lg text-[#5E5E5E] mx-auto">
            At Tecvrinon Academy, you'll learn from industry professionals who are passionate about helping you succeed.
            <br />
            Get to know the experienced minds shaping your journey.
          </p>
        </div>

        {/* Trainers Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col max-w-sm mx-auto"
            >
              {/* Top Section - Light Blue Background */}
              <div className="bg-[#EDF8F7] px-8 py-10 rounded-xl m-3 text-center">
                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                  <div className="w-48 h-48 bg-gray-300 rounded-full flex items-center justify-center">
                    <img
                      src={trainer.imageUrl || "/placeholder.svg"}
                      alt={trainer.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-[#0F2624] mb-2">{trainer.name}</h3>

                {/* Email */}
                <div className="text-sm text-[#0F2624] break-all px-2">{trainer.email}</div>
              </div>

              {/* Bottom Section - White Background */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Content sections grouped together */}
                <div className="space-y-4">
                  {/* Specialization/Course with Icon */}
                  <div className="flex items-start">
                    <MdLibraryBooks className="w-5 h-5 text-[#1E4C48] mt-0.5 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900 mb-2">Specialization</div>
                      {Array.isArray(trainer.specialization) ? (
                        <ul className="text-sm text-gray-600 space-y-1">
                          {trainer.specialization.slice(0, 6).map((spec, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-[#0F2624] rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-sm text-gray-600 flex items-start">
                          <span className="w-1.5 h-1.5 bg-[#0F2624] rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          <span>{trainer.specialization}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Experience with Icon */}
                  <div className="flex items-start">
                    <RiBriefcase4Fill className="w-5 h-5 text-[#1E4C48] mt-0.5 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900 mb-2">Experience</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {trainer.experience.slice(0, 5).map((exp, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-[#0F2624] rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            <span dangerouslySetInnerHTML={{ __html: exp }}></span>
                          </li>
                        ))}
                        {trainer.experience.length > 4 && (
                          <li className="text-blue-600 text-sm">+{trainer.experience.length - 4} more...</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Location with Icon */}
                  <div className="flex items-start">
                    <FaLocationDot className="w-5 h-5 text-[#1E4C48] mt-0.5 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900 mb-1">Location</div>
                      <div className="text-sm text-gray-600">{trainer.location}</div>
                    </div>
                  </div>
                </div>

                {/* Spacer to push button to bottom */}
                <div className="flex-1"></div>

                {/* LinkedIn Connect Button - Fixed position at bottom */}
                <div className="mt-6">
                  <Link to={trainer.linkedinUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <button className="flex items-center justify-center w-full border border-gray-300 text-[#3B9790] hover:bg-blue-50 text-sm font-medium py-3 px-4 rounded-full transition-colors duration-200 group">
                      <FaLinkedin className="w-5 h-5 mr-2 text-[#0076B2]" />
                      <span>Connect on LinkedIn</span>
                      <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {/* Call to Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col md:flex-row justify-center items-center gap-3 sm:gap-4">
          <Link to="/support" className="w-full md:w-auto order-2 md:order-none">
            <button className="w-full px-4 sm:px-6 py-[1.3rem] rounded-xl border border-gray-300 text-[#3B9790] font-semibold hover:bg-gray-50 transition-colors">
              Support Us
            </button>
          </Link>

          <Link to="/courses" className="w-full md:w-auto order-3 md:order-none">
            <button className="w-full px-4 sm:px-6 py-[1.3rem] rounded-xl bg-[#3B9790] text-white hover:bg-teal-700 transition-colors flex items-center justify-center font-semibold">
              Begin your learning journey
              <HiOutlineRocketLaunch className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OurTrainers
