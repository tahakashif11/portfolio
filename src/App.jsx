import Hero from "./components/Hero";
import Navbar from "./Layouts/Navbar";
import Skills from "./components/Skills";
import Service from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Hireme from "./components/Hireme";
import Contact from "./components/Contact";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const App = () => {
	useEffect(() => {
		Aos.init({
			duration: 700,
			offset: 20,
			disable: "mobile"
		});
	}, []);
	return (
		<div className="">
			<Navbar />
			<Hero />
			<Skills />
			<Service />
			<Projects />
			<Testimonials />
			<Hireme />
			<Contact />
			<footer className="p-3 text-center">
				<h6 className="mb-3">Muhammad Taha</h6>
				<p>Drdragon313 © All CopyRights Reserved 2025</p>
			</footer>
		</div>
	);
};

export default App;
