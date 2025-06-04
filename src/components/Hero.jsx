// import content
import { useEffect, useState, useRef } from "react";
import { content } from "../Content";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import HireModal from "./HireModal";

gsap.registerPlugin(TextPlugin);

const Hero = () => {
	const { hero } = content;
	const [imageLoaded, setImageLoaded] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const titleRef = useRef(null);
	const typingRef = useRef(null);

	// Preload image
	useEffect(() => {
		const img = new Image();
		img.src = hero.image;
		img.onload = () => setImageLoaded(true);
	}, [hero.image]);

	// Typing animation
	useEffect(() => {
		const phrases = [
			"Full Stack Developer",
			"UI/UX Designer",
			"Problem Solver",
			"Tech Enthusiast"
		];

		let currentIndex = 0;
		const animateText = () => {
			gsap.to(typingRef.current, {
				duration: 1,
				text: phrases[currentIndex],
				ease: "none",
				onComplete: () => {
					setTimeout(() => {
						gsap.to(typingRef.current, {
							duration: 0.5,
							text: "",
							ease: "none",
							onComplete: () => {
								currentIndex = (currentIndex + 1) % phrases.length;
								animateText();
							}
						});
					}, 2000);
				}
			});
		};

		animateText();
	}, []);

	return (
		<section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]" />
			</div>

			<div className="relative flex flex-col-reverse md:flex-row items-center h-full">
				{/* Content Column */}
				<div className="w-full md:w-1/2 px-4 md:px-8 pt-16 md:pt-0 pb-8 md:pb-0">
					<div className="max-w-xl mx-auto md:mx-0">
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.8 }}
							className="space-y-4"
						>
							<h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center md:text-left leading-tight" ref={titleRef}>
								{hero.title}
							</h2>
							<div className="h-8">
								<span ref={typingRef} className="text-lg md:text-xl lg:text-2xl text-blue-600 font-semibold"></span>
								<span className="animate-blink">|</span>
							</div>
						</motion.div>
						
						<motion.div
							className="flex justify-center md:justify-start my-6"
							initial={{ y: 30, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.4, duration: 0.8 }}
						>
							<motion.button
								className="btn bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 px-6 py-3 text-sm md:text-base"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setIsModalOpen(true)}
							>
								{hero.btnText}
							</motion.button>
						</motion.div>

						<div className="flex flex-col gap-4 md:gap-6">
							{hero.hero_content.map((content, i) => (
								<motion.div
									key={i}
									initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.2 * (i + 1), duration: 0.8 }}
									className={`flex items-center gap-3 md:gap-4 ${
										i === 1 ? "md:flex-row-reverse md:text-right justify-end" : ""
									}`}
								>
									<motion.h3 
										className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-500"
										whileHover={{ scale: 1.1, color: "#2563EB" }}
									>
										{content.count}
									</motion.h3>
									<p className="text-sm md:text-base max-w-[180px] md:max-w-[250px]">
										{content.text}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</div>

				{/* Image Column */}
				<div className="w-full md:w-1/2 h-[40vh] md:h-screen relative">
					<motion.div 
						className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-[2px]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}
					/>
					
					{/* Loading skeleton */}
					<div 
						className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-300 ${
							imageLoaded ? 'opacity-0' : 'opacity-100'
						}`} 
					/>

					<motion.div
						className="relative h-full overflow-hidden"
						initial={{ clipPath: "inset(0 100% 0 0)" }}
						animate={{ clipPath: "inset(0 0% 0 0)" }}
						transition={{ duration: 1, delay: 0.5 }}
					>
						<motion.img
							src={hero.image}
							alt="hero"
							className={`h-full w-full object-contain md:object-cover object-top md:object-center transition-opacity duration-700 ${
								imageLoaded ? 'opacity-100' : 'opacity-0'
							}`}
							style={{
								objectPosition: 'center 20%'
							}}
							initial={{ scale: 1.2 }}
							animate={{ scale: 1 }}
							transition={{ duration: 1 }}
						/>

						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent dark:from-gray-900/20" />
					</motion.div>
				</div>
			</div>

			{/* Floating elements */}
			<div className="hidden md:block">
				{[...Array(3)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute"
						style={{
							top: `${15 + i * 25}%`,
							left: `${8 + i * 25}%`,
							width: "6px",
							height: "6px",
							borderRadius: "50%",
							backgroundColor: "#3B82F6",
						}}
						animate={{
							y: [0, 15, 0],
							opacity: [0.5, 1, 0.5],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							delay: i * 0.4,
						}}
					/>
				))}
			</div>

			<HireModal 
				isOpen={isModalOpen} 
				onClose={() => setIsModalOpen(false)} 
			/>
		</section>
	);
};

export default Hero;
