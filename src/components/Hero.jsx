// import content
import { useEffect, useState, useRef } from "react";
import { content } from "../Content";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const Hero = () => {
	const { hero } = content;
	const [imageLoaded, setImageLoaded] = useState(false);
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
		<section id="home" className="overflow-hidden">
			<div className="min-h-screen relative flex md:flex-row flex-col-reverse items-center">
				{/* Background animation */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8 }}
					className="absolute h-full md:w-4/12 w-8/12 top-0 right-0 bg-gradient-to-br from-blue-500 to-indigo-600 bottom-0 -z-10"
				>
					<motion.h1 
						className="hidden md:block rotate-90 absolute top-[40%] right-[-15%] text-[#EAF2FA] text-4xl whitespace-nowrap"
						initial={{ x: 100, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.8 }}
					>
						{hero.firstName}{" "}
						<span className="text-dark_primary">{hero.LastName}</span>
					</motion.h1>
					<motion.h1 
						className="md:hidden text-center text-[#EAF2FA] absolute bottom-0 w-full py-4 text-2xl bg-blue-600/50 backdrop-blur-sm"
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.8 }}
					>
						{hero.firstName}{" "}
						<span className="text-dark_primary">{hero.LastName}</span>
					</motion.h1>
				</motion.div>

				{/* Content Column */}
				<div className="w-full md:w-1/2 px-6 md:px-12 pt-20 md:pt-0 pb-10 md:pb-16">
					<div className="max-w-xl mx-auto md:mx-0">
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.8 }}
						>
							<h2 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left leading-tight" ref={titleRef}>
								{hero.title}
							</h2>
							<div className="h-8 mb-6">
								<span ref={typingRef} className="text-xl md:text-2xl text-blue-600 font-semibold"></span>
								<span className="animate-blink">|</span>
							</div>
						</motion.div>
						
						<motion.div
							className="flex justify-center md:justify-start mb-10"
							initial={{ y: 30, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.4, duration: 0.8 }}
						>
							<motion.button
								className="btn bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<a
									href={hero.btnLink}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm md:text-base px-6 py-3 inline-block"
								>
									{hero.btnText}
								</a>
							</motion.button>
						</motion.div>

						<div className="flex flex-col gap-6 md:gap-10">
							{hero.hero_content.map((content, i) => (
								<motion.div
									key={i}
									initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.2 * (i + 1), duration: 0.8 }}
									className={`flex items-center gap-4 md:gap-6 ${
										i === 1 ? "md:flex-row-reverse md:text-right justify-end" : ""
									}`}
								>
									<motion.h3 
										className="text-3xl md:text-4xl font-bold text-blue-500"
										whileHover={{ scale: 1.1, color: "#2563EB" }}
									>
										{content.count}
									</motion.h3>
									<p className="text-sm md:text-base max-w-[200px] md:max-w-[300px]">
										{content.text}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</div>

				{/* Image Column */}
				<motion.div 
					className="w-full md:w-1/2 md:h-screen h-[60vh] relative overflow-hidden bg-gray-100"
					initial={{ clipPath: "inset(0 100% 0 0)" }}
					animate={{ clipPath: "inset(0 0% 0 0)" }}
					transition={{ duration: 1, delay: 0.5 }}
				>
					{/* Loading skeleton */}
					<div 
						className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-300 ${
							imageLoaded ? 'opacity-0' : 'opacity-100'
						}`} 
					/>
					
					{/* Image container with proper positioning */}
					<div className="relative h-full">
						{/* Background blur effect */}
						<motion.div 
							className="absolute inset-0 bg-no-repeat bg-cover bg-center filter blur-xl opacity-50 scale-110"
							style={{
								backgroundImage: `url(${hero.image})`,
								backgroundPosition: 'center 10%'
							}}
							initial={{ scale: 1.2 }}
							animate={{ scale: 1.1 }}
							transition={{ duration: 1 }}
						/>
						
						{/* Main image */}
						<div className="relative h-full z-10">
							<motion.img
								src={hero.image}
								alt="hero"
								className={`h-full w-full object-cover transition-all duration-700 ${
									imageLoaded ? 'opacity-100' : 'opacity-0'
								}`}
								style={{
									objectPosition: 'center 10%',
									willChange: 'transform'
								}}
								initial={{ scale: 1.2 }}
								animate={{ scale: 1 }}
								transition={{ duration: 1 }}
							/>
						</div>

						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/10 z-20" />
					</div>
				</motion.div>
			</div>

			{/* Floating elements animation */}
			<div className="hidden md:block">
				{[...Array(3)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute"
						style={{
							top: `${20 + i * 30}%`,
							left: `${10 + i * 30}%`,
							width: "8px",
							height: "8px",
							borderRadius: "50%",
							backgroundColor: "#3B82F6",
						}}
						animate={{
							y: [0, 20, 0],
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
		</section>
	);
};

export default Hero;
