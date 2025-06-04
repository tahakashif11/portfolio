import { useState } from "react";
import { content } from "../Content";
import HireModal from "./HireModal";

const Hireme = () => {
	const { Hireme } = content;
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<section className="bg-bg_light_primary py-10">
			<div className="md:container px-4 md:px-8">
				<div className="text-center mb-8">
					<h2 className="title text-2xl md:text-4xl mb-2" data-aos="fade-down">
						{Hireme.title}
					</h2>
					<h4 className="subtitle text-lg md:text-xl" data-aos="fade-down">
						{Hireme.subtitle}
					</h4>
				</div>
				<div className="flex items-center justify-center">
					<div
						data-aos="fade-up"
						className="border-2 border-dark_primary 
						max-w-3xl w-full
						p-4 md:p-6 
						rounded-xl shadow-md
						bg-white/50 backdrop-blur-sm"
					>
						<p className="leading-relaxed text-sm md:text-base text-center md:text-left">
							{Hireme.para}
						</p>
						<div className="flex justify-center md:justify-start mt-6">
							<button 
								className="btn bg-dark_primary text-white px-6 py-2 md:py-3 text-sm md:text-base
								hover:bg-dark_primary/90 transition-colors duration-300"
								onClick={() => setIsModalOpen(true)}
							>
								{Hireme.btnText}
							</button>
						</div>
					</div>
				</div>
			</div>
			<HireModal 
				isOpen={isModalOpen} 
				onClose={() => setIsModalOpen(false)} 
			/>
		</section>
	);
};

export default Hireme;
