// import { Button } from "@/components/ui/button"
import { MapPin, Linkedin, ArrowUpRight, Briefcase, Award, LinkedinIcon } from "lucide-react"
import { MdLibraryBooks } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { RiBriefcase4Fill } from "react-icons/ri";

import { Link } from 'react-router-dom';

import cindy from "../assets/images/trainers/cindyE.png";
import godswill from "../assets/images/trainers/godswill.png";
import damilare from "../assets/images/trainers/damilare.png";
import oluwatosin from "../assets/images/trainers/oluwatosin.png";
import doris from "../assets/images/trainers/dorris.png";
import austin from "../assets/images/trainers/austin.png";
import arnold from "../assets/images/trainers/arnold.png";
import lukeman from "../assets/images/trainers/lukeman.png";
import adekunle from "../assets/images/trainers/adekunle.png";
import sijibomi from "../assets/images/trainers/sijibomi.png";
import rilwan from "../assets/images/trainers/rilwan.png";
import ufoma from "../assets/images/trainers/ufoma.png";
import samuel from "../assets/images/trainers/samuelO.png";
import joshua from "../assets/images/trainers/joshua.png";
import stanley from "../assets/images/trainers/stanley.png";
import thomas from "../assets/images/trainers/thomas.png";
import victor from "../assets/images/trainers/victorO.png";
import julius from "../assets/images/trainers/julius.png";
import mrinmay from "../assets/images/trainers/mrinmay.png";
import ese from "../assets/images/trainers/ese.png";
import dinesh from "../assets/images/trainers/dinesh.png";
import jubril from "../assets/images/trainers/jubril.png";
import chibuike from "../assets/images/trainers/chibuike.png";
import oladejo from "../assets/images/trainers/adesola.png";
import olufunso from "../assets/images/trainers/olufunso.png";
import vincent from "../assets/images/trainers/vincent.png";
import { HiOutlineRocketLaunch } from "react-icons/hi2";


const trainers = [
 {
      id: "21",
      name: "Cindy Emeh",
      email: "cindy.ajayi@tecvinsonacademy.com",
      location: "Nigerian living in Sweden",
      specialization: "UI/UX Design",
      skills: ["UI/UX Design"],
      experience: [
        "2 years experience in Customer Service Representative",
        "2 years in Product Designer"
      ],
      linkedinUrl: "#",
      imageUrl: cindy
    },
    {
      id: "22",
      name: "Godswill David",
      email: "godswill.david@tecvinsonacademy.com",
      location: "Nigerian Living in Nigeria",
      specialization: "Business Analysis",
      skills: ["BA Analyst"],
      experience: [
        "8 years experience in Banking & FinTech Sector"
      ],
      linkedinUrl: "#",
      imageUrl: godswill
    },
    {
      id: "23",
      name: "Damilare Akinboboye",
      email: "damilare.akinboboye@tecvinsonacademy.com",
      location: "Sweden",
      specialization: "Test Automation",
      skills: ["Test Automation"],
      experience: [
        "3 years experience in the AEC industry",
        "2 years experience as Test Engineer"
      ],
      linkedinUrl: "#",
      imageUrl: damilare
    },
    // Row 2
    {
      id: "24",
      name: "Oluwatosin Oresanwo",
      email: "oresanwo.oluwatosin@tecvinsonacademy.com",
      location: "Nigerian Living in Nigeria",
      specialization: "UI/UX Design",
      skills: ["UI/UX Design"],
      experience: [
        "4 years experience in Product (UI/UX) Design"
      ],
      linkedinUrl: "#",
      imageUrl: oluwatosin
    },
    {
      id: "25",
      name: "Doris Ejiodu",
      email: "doris.ejiodu@tecvinsonacademy.com",
      location: "Nigerian living in Sweden",
      specialization: [
        "Software Testing",
        "Business Analysis", 
    ],
      skills: ["Manual Software Testing", "Business Analysis"],
      experience: [
        "7 years experience in finance sector",
        "3 years experience as Software Test Engineer",
        "3 year experience as a Business & System Analyst",
        "1 year experience as a Product Owner"
      ],
      linkedinUrl: "#",
      imageUrl: doris
    },
    {
      id: "26",
      name: "Austin Tochukwu Asoluka",
      email: "austin.asoluka@tecvinsonacademy.com",
      location: "Nigerian Living in Nigeria",
      specialization: "MERN Stack Development",
      skills: ["Javascript MERN stack"],
      experience: [
        "8 years, Software Development"
      ],
      linkedinUrl: "#",
      imageUrl: austin
    },
    // Row 3 (from second image)
    {
      id: "15",
      name: "Arnold Popoola",
      email: "arnold.popoola@tecvinsonacademy.com",
      location: "Nigerian living in Sweden",
      specialization: "Test Automation",
      skills: ["Test Automation", "Python Programming"],
      experience: [
        "9 years+ experience in programming",
        "3 years experience in Software Testing",
        "2 years experience in IT Support",
        "5 years+ Graphic Design & Video Editing"
      ],
      linkedinUrl: "#",
      imageUrl: arnold
    },
    {
      id: "16",
      name: "Lukeman Frimpong",
      email: "lukeman.frimpong@tecvinsonacademy.com",
      location: "Ghanaian living in Sweden",
      specialization: "Data Science",
      skills: ["Data Analytics", "Data Science", "Machine Learning", "Artificial Intelligence"],
      experience: [
        "4 years experience as Data Scientist and Data Analyst",
        "3 years Experience in Machine Learning and Artificial Intelligence"
      ],
      linkedinUrl: "#",
      imageUrl: lukeman
    },
    {
      id: "17",
      name: "Adekunle Lawal",
      email: "adekunle.lawal@tecvinsonacademy.com",
      location: "Nigerian living in Sweden",
      specialization: "Cloud Computing",
      skills: ["DevOps", "Cloud Computing"],
      experience: [
        "15 years experience in the IT sector",
        "12 years experience in Linux Systems administration",
        "Years experience in Cloud Computing",
        "9 Years experience in Cloud Computing 7 Years experience in DevOps"
      ],
      linkedinUrl: "#",
      imageUrl: adekunle
    },
    // Row 4
    {
      id: "18",
      name: "Sijibomi Ajayi",
      email: "sijibomi.ajayi@tecvinsonacademy.com",
      location: "Nigerian living in Sweden",
      specialization: "Cloud Engineering",
      skills: ["DevOps", "Cloud Engineering"],
      experience: [
        "7 years experience as DevOps, Cloud, and Site Reliability Engineer",
        "3 years experience in software engineering"
      ],
      linkedinUrl: "#",
      imageUrl: sijibomi
    },
    {
      id: "19",
      name: "Rilwan Bello",
      email: "rilwan.bello@tecvinsonacademy.com",
      location: "Nigerian living in Sweden",
      specialization: "Kubernetes",
      skills: ["DevOps", "Cloud", "Linux", "Kubernetes"],
      experience: [
        "3 years experience as DevOps, Cloud, Linux and Kubernetes Engineer",
        "Certified Kubernetes Administrator"
      ],
      linkedinUrl: "#",
      imageUrl: rilwan
    },
    {
      id: "20",
      name: "Ufoma Genesis",
      email: "ufoma.genesis@tecvinsonacademy.com",
      location: "Nigerian living in Sweden",
      specialization: "Cybersecurity",
      skills: ["Offensive Cybersecurity"],
      experience: [
        "8 years experience as Offensive Cybersecurity Engineer in the Banking Sector/Fintech"
      ],
      linkedinUrl: "#",
      imageUrl: ufoma
    },
    // Row 5 (from third image)
    {
      id: "1",
      name: "Samuel Osinloye",
      email: "samuel.osinloye@tecvinsonacademy.com",
      location: "Nigerian living in Nigeria",
      specialization: "Backend Engineering",
      skills: ["Backend Engineering (.NET Core)"],
      experience: [
        "4 years experience in full stack Software Development with Microsoft Technologies such as Blazor, .NET Core, WPF etc.",
        "Databases (SQL and NoSQL), ",
        "Message brokers (Kafka)",
        "Version control (Git/Git, Azure)"
      ],
      linkedinUrl: "#",
      imageUrl: samuel
    },
    {
      id: "2",
      name: "Joshua Edigbe",
      email: "joshua.edigbe@tecvinsonacademy.com",
      location: "Nigerian living in Nigeria",
      specialization: "Frontend Engineering",
      skills: ["Frontend Engineering"],
      experience: [
        "8 Years Experience in Frontend Engineering"
      ],
      linkedinUrl: "#",
      imageUrl: joshua
    },
    {
      id: "3",
      name: "Stanley Umeh",
      email: "stanley.umeh@tecvinsonacademy.com",
      location: "Nigerian living in Nigeria",
      specialization: "Software Engineering",
      skills: ["Software Engineering (.NET)"],
      experience: [
        "4 years experience in finance sector",
        "4 years experience as .NET developer"
      ],
      linkedinUrl: "#",
      imageUrl: stanley
    },
    // Row 6
    {
      id: "4",
      name: "Thomas Fregene",
      email: "thomas.fregene@tecvinsonacademy.com",
      location: "Nigerian living in Nigeria",
      specialization: "Backend Development",
      skills: ["Software Development (Backend)"],
      experience: [
        "3 years experience in Software Development",
        "3 years experience Backend Development"
      ],
      linkedinUrl: "#",
      imageUrl: thomas
    },
    {
      id: "5",
      name: "Victor Okosodo",
      email: "victor.okosodo@tecvinsonacademy.com",
      location: "Nigerian living in Berlin, Germany",
      specialization: "Backend Engineering",
      skills: ["Backend Engineering C#/.Net"],
      experience: [
        "10 years experience in software engineering and Azure cloud Architect"
      ],
      linkedinUrl: "#",
      imageUrl: victor
    },
    {
      id: "6",
      name: "Julius Oladayo Olasupo",
      email: "julius.oladayo@tecvinsonacademy.com",
      location: "Nigerian living in United Kingdom",
      specialization: "Mobile App Development",
      skills: ["Mobile App Development"],
      experience: [
        "8 years experience in finance sector",
        "7 years experience as Mobile Developer"
      ],
      linkedinUrl: "#",
      imageUrl: julius
    },
    // Row 7 (from fourth image)
    {
      id: "9",
      name: "Mrinmay Biswas",
      email: "mrinmay.biswas@tecvinsonacademy.com",
      location: "Indian living in Kolkata, India",
      specialization: "DevOps",
      skills: ["DevOps","Cloud", "Java", "Python", "Scripting"],
      experience: [
        "Java",
        "Python",
        "Scripting",
        "10 years experience in Microsoft Technology, VC++, MFC",
        "6 years experience in Devops tools and technology"
      ],
      linkedinUrl: "#",
      imageUrl: mrinmay
    },
    {
      id: "10",
      name: "Ese Kelvin Uvbiekpahor",
      email: "ese.kelvin@tecvinsonacademy.com",
      location: "Nigerian living in Nigeria",
      specialization: "Java Development",
      skills: ["Java"],
      experience: [
        "6 years experience in Oil & Gas sector",
        "3 years experience as Fintech Applications"
      ],
      linkedinUrl: "#",
      imageUrl: ese 
    },
    {
      id: "11",
      name: "Dinesh Pandy",
      email: "dinesh.pandy@tecvinsonacademy.com",
      location: "Indian living in Kolkata, India",
      specialization: "DevOps",
      skills: ["DevOps", "Cloud", "Java", "Python", "Scripting"],
      experience: [        
        "18 Years of Total Experience in which 6 Years of experience as Tech Lead",
        "3 years of experience as Front-End Developer and Full Stack Developer",
        "2 Years of experience as DevOps Engineer and.​ServiceNow Developer.",
        "Certified  Java Developer, ServiceNow Application Developer"
      ],
      linkedinUrl: "#",
      imageUrl: dinesh
    },
    // Row 8
    {
      id: "12",
      name: "Jubril Otunbade",
      email: "jubril.otunbade@tecvinsonacademy.com",
      location: "Nigerian living in Nigeria",
      specialization: "Data Science & ML",
      skills: ["Data Science & ML", "Python"],
      experience: [
        "6+ years Data Science & Machine Learning",
        "2+ years AI Engineering"
      ],
      linkedinUrl: "#",
      imageUrl: jubril
    },
    {
      id: "13",
      name: "Chibuike Mba",
      email: "chibuike.mba@tecvinsonacademy.com",
      location: "Nigerian living in Nigeria",
      specialization: "AI Engineering",
      skills: ["Agentic AI", "Gen AI"],
      experience: [
        "6+ years Data Science & Machine Learning",
        "2+ years AI Engineering"
      ],
      linkedinUrl: "#",
      imageUrl: chibuike
    },
    {
      id: "14",
      name: "Oladejo Adesola S.",
      email: "adesola.oladejo@tecvinsonacademy.com",
      location: "Nigerian living in Sweden",
      specialization: "Software Architecture",
      skills: ["Programming/Software Development"],
      experience: [
        "18+ Software Development",
        "5+ Software & Solution Architecture"
      ],
      linkedinUrl: "#",
      imageUrl: oladejo
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
        "8 years experience in Electronics Channels Payments",
        "3 years experience in Product Management",
        "8+ years experience in Project Management",
        "5 years+ Agile Project Management"
      ],
      linkedinUrl: "#",
      imageUrl: olufunso
    },
    {
      id: "8",
      name: "Vincent Oke",
      email: "vincent.oke@tecvinsonacademy.com",
      location: "Nigerian living in Sweden",
      specialization: "Business Analysis",
      skills: ["Business Analysis", "Scrum Master & Product Owner", "Product Management", "Software Quality", "python", "CV | Cover Letter | Interviewing Techniques"],
      experience: [
        "6 years experience as IT Project Lead and Systems Engineer within Oil & Gas and Defense",
        "11 years experience as Test Engineer, Test Lead, Test Manager within telecommunications and retail",
        "5 years+ experience as CICD Automation Lead and Developer Experience Lead within retail",
        "Certified Test Manager, Systems Engineer, Scrum Master and Business Analyst"
      ],
      linkedinUrl: "#",
      imageUrl: vincent
    }
  ];

const OurTrainers = () => {
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
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
            >
              {/* Top Section - Light Blue Background */}
              <div className="bg-[#EDF8F7] px-6 py-8 rounded-xl m-2 text-center">
                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                  <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center">
                    <img
                      src={trainer.imageUrl}
                      alt={trainer.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-[#0F2624] mb-2">{trainer.name}</h3>

                {/* Email */}
                <div className="text-sm text-[#0F2624] break-all">{trainer.email}</div>
              </div>

              {/* Bottom Section - White Background */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Specialization/Course with Icon */}
                <div className="flex items-start mb-4 flex-1">
                    <MdLibraryBooks className="w-6 h-6 text-[#1E4C48] mt-1 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-2">Specialization</div>
                    {Array.isArray(trainer.specialization) ? (
                        <ul className="text-sm text-gray-600 space-y-1">
                        {trainer.specialization.slice(0, 3).map((spec, index) => (
                            <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-[#0F2624] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span className="line-clamp-2">{spec}</span>
                            </li>
                        ))}
                        {trainer.specialization.length > 3 && (
                            <li className="text-blue-600 text-sm">+{trainer.specialization.length - 3} more...</li>
                        )}
                        </ul>
                    ) : (
                        <div className="text-sm text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 bg-[#0F2624] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span>{trainer.specialization}</span>
                        </div>
                    )}
                    </div>
                </div>

                {/* Experience with Icon - This section will grow to fill space */}
                <div className="flex items-start mb-4 flex-1">
                  <RiBriefcase4Fill className="w-6 h-6 text-[#1E4C48] mt-1 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-2">Experience</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {trainer.experience.slice(0, 5).map((exp, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-[#0F2624] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span className="line-clamp-2">{exp}</span>
                        </li>
                      ))}
                      {trainer.experience.length > 5 && (
                        <li className="text-blue-600 text-sm">+{trainer.experience.length - 5} more...</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Location with Icon */}
                <div className="flex items-center mb-6">
                  <FaLocationDot className="w-6 h-6 text-[#1E4C48] mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-1">Location</div>
                    <div className="text-sm text-gray-600">{trainer.location}</div>
                  </div>
                </div>

                {/* LinkedIn Connect Button - This will stay at the bottom */}
                <div className="mt-auto">
                  <Link to={trainer.linkedinUrl} target="_blank" rel="noopener noreferrer" className="block mb-4">                  
                    <button className="flex items-center justify-center w-full border text-[#3B9790] hover:bg-blue-50 text-sm font-medium py-3 px-4 rounded-xl transition-colors duration-200 group">
                      <FaLinkedin className="w-6 h-6 mr-2 text-[#0076B2]" />
                      <span>Connect on LinkedIn</span>
                      <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
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
