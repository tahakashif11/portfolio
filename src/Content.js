// import images
import Hero_person from "./assets/images/Hero/new crop person.png";

import html from "./assets/images/Skills/HTML5.png";
import redux from "./assets/images/Skills/redux.png";
import js from "./assets/images/Skills/jslogo.png";
import reactjs from "./assets/images/Skills/react.png";
import nodejs from "./assets/images/Skills/node.png";
import tailwind from "./assets/images/Skills/tailwind.png";
import next from "./assets/images/Skills/next.png";
import bi from "./assets/images/Skills/bi.png";

import services_logo1 from "./assets/images/Services/mobile.svg";
import services_logo2 from "./assets/images/Services/webapp.png";
import services_logo3 from "./assets/images/Services/medtech.png";

import project1 from "./assets/images/Projects/caresync.png";
import project2 from "./assets/images/Projects/bookly.png";
import project3 from "./assets/images/Projects/pharmytics.png";
import project4 from "./assets/images/Projects/careflow.png";
import project5 from "./assets/images/Projects/copilot.png";

import avatar1 from "./assets/images/Testimonials/avatar1.png";
import avatar2 from "./assets/images/Testimonials/avatar2.png";
import avatar3 from "./assets/images/Testimonials/avatar3.png";
import avatar4 from "./assets/images/Testimonials/avatar4.png";

import Hireme_person from "./assets/images/Hireme/person.png";
import Hireme_person2 from "./assets/images/Hireme/person2.png";

// import icons from react-icons
import { GrMail } from "react-icons/gr";
import { MdArrowForward, MdCall } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { TbSmartHome } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { RiServiceLine, RiProjectorLine } from "react-icons/ri";
import { MdOutlinePermContactCalendar } from "react-icons/md";

export const content = {
	nav: [
		{
			link: "#home",
			icon: TbSmartHome
		},
		{
			link: "#skills",
			icon: BiUser
		},
		{
			link: "#services",
			icon: RiServiceLine
		},
		{
			link: "#projects",
			icon: RiProjectorLine
		},
		{
			link: "#contact",
			icon: MdOutlinePermContactCalendar
		}
	],
	hero: {
		title: "Software engineer",
		firstName: "Muhammad",
		LastName: "Taha",
		btnText: "Hire Me",
		image: Hero_person,
		hero_content: [
			{
				count: "3+",
				text: "Years of Experience in Web and mobile development"
			},
			{
				count: "20+",
				text: "Projects Worked in my career"
			}
		]
	},
	skills: {
		title: "Skills",
		subtitle: "MY TOP SKILLS",
		skills_content: [
			{
				name: "React js",
				logo: reactjs
			},
			{
				name: "HTML",
				logo: html
			},
			// {
			// 	name: "Node js",
			// 	logo: nodejs
			// },
			{
				name: "Javascript",
				logo: js
			},
			{
				name: "Redux",
				logo: redux
			},
			{
				name: "Tailwind CSS",
				logo: tailwind
			},
			{
				name: "Next js",
				logo: next
			},
			{
				name: "Power BI",
				logo: bi
			}
		],
		icon: MdArrowForward
	},
	services: {
		title: "Services",
		subtitle: "WHAT I OFFER",
		service_content: [
			{
				title: "Hybrid Mobile Development",
				para: "Building cross-platform mobile applications using React Native and modern frameworks. Delivering native-like performance, beautiful UI/UX, and seamless functionality across iOS and Android platforms.",
				logo: services_logo1
			},
			{
				title: "Web Application Development",
				para: "Building interactive and scalable web applications with advanced functionalities. Ensures seamless user interactions, robust backend services, and efficient data management for various industries.",
				logo: services_logo2
			},
			{
				title: "Medtech Web Application",
				para: "Developing healthcare-focused web applications that streamline medical workflows, enhance patient care, and ensure compliance with industry standards. Integrates features like medical data visualization, secure report storage, and interoperability with healthcare systems.",
				logo: services_logo3
			}
		]
	},
	Projects: {
		title: "Projects",
		subtitle: "SOME OF MY CREATIONS",
		project_content: [
			{
				title: "CareSync",
				image: project1,
				link: "https://dev-caresync.31g.co.uk/",
				descriptions:
					"A healthcare application integrated with the UK's NHS systems for efficient medical data exchange. Focused on user accessibility and intuitive navigation tailored to diverse NHS user needs."
			},
			{
				title: "Bookly",
				image: project2,
				link: "https://dev-bookly.31g.co.uk/",
				descriptions:
					"A FinTech application designed to read, analyze, and store financial records from scanned documents. Extracted data from official documents like licenses and displayed it in structured, tabular form. Focused on accuracy and ease of access to critical financial data."
			},
			{
				title: "Pharmlytics",
				image: project3,
				link: "https://pharmlytics.co.uk/",
				descriptions:
					"A Pharmacy Management System built for a UK-based chain, developed using React.js and Power BI. Led frontend development and implemented role-based access control. Integrated dynamic Power BI dashboards for actionable insights and data-driven decision-making."
			},
			{
				title: "Careflow",
				image: project4,
				link: "https://dev-formbuilder.31g.co.uk/auth/login",
				descriptions:
					"A workflow builder application where the workflows, forms, layouts and themes can be made without coding. Extremely usefull for organizational level architecture design or for creating forms."
			},
			{
				title: "CareCopilot",
				image: project5,
				link: "https://dev-carecopilot.31g.co.uk/auth/login",
				descriptions:
					"A SaaS application that acts as a service to access three different application using SSO. Allows creating and editing roles and their access controls dynamically. "
			},
			
		]
	},
	Testimonials: {
		title: "Testimonials",
		subtitle: "MY CLIENT REVIEWS",
		testimonials_content: [
			{
				review:
					"Working with Muhammad Taha and his team was a game-changer for our business. They built our web app using Next.js, making it super fast and SEO-friendly. The user experience is smooth, and our customers love it!",
				img: avatar1,
				name: "Logan James"
			},
			{
				review:
					"Our online store was struggling with performance issues, but Muhammad Taha and his team optimized everything with React and Next.js. Now, our site loads instantly, and conversions have increased by 40%! Truly a top-tier developer",
				img: avatar2,
				name: "Salman Mehdi"
			},
			{
				review:
					"Our medtech platform required a complex web app, and Muhammad Taha and his team nailed it. They built a fast, secure, and user-friendly solution with Next.js. Their problem-solving skills and professionalism were impressive!",
				img: avatar3,
				name: "Pyramid Pharmacy"
			},
			{
				review:
					"We needed a scalable dashboard for our SaaS product, and Muhammad Taha and his team delivered beyond expectations. The React-based UI is sleek, responsive, and easy to use. Highly recommend their expertise!",
				img: avatar4,
				name: "Strategic Innovative Engineering"
			}
		]
	},
	Hireme: {
		title: "Hire Me",
		subtitle: "FOR YOUR PROJECTS",
		image1: Hireme_person,
		image2: Hireme_person2,
		para: "With expertise in React.js, Redux, and Power BI, I specialize in building scalable web applications and MedTech solutions. My experience includes developing healthcare platforms, BI tools, and FinTech applications, ensuring seamless user experiences and efficient data visualization. Having worked with 31Green Ltd. and Shifa International Hospital, I excel at creating user-centric, high-performance applications that integrate with complex systems like the UK's NHS. As a team leader and problem-solver, I bring technical proficiency, adaptability, and a results-driven approach, making me the ideal choice for businesses seeking innovative, high-quality web solutions.",
		btnText: "Hire Me"
	},
	Contact: {
		title: "Contact Me",
		subtitle: "GET IN TOUCH",
		social_media: [
			{
				text: "tahacodes1@gmail.com",
				icon: GrMail,
				link: "mailto:codeaprogram@gmail.com"
			},
			{
				text: "+92 3075945436",
				icon: MdCall,
				link: "https://wa.me/1234567890"
			},
			{
				text: "Muhammad Taha",
				icon: BsLinkedin,
				link: "https://www.linkedin.com/in/muhammad-taha-0487301a1/"
			}
		]
	},
	Footer: {
		text: "All © Copy Right Reserved 2025"
	}
};
