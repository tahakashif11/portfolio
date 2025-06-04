import { content } from "../Content";

const Services = () => {
	const { services } = content;
	return (
		<section id="services" className="py-10 md:py-14">
			<div className="md:container px-4 md:px-8">
				<div className="text-center mb-8">
					<h2 className="title text-2xl md:text-4xl mb-2" data-aos="fade-down">
						{services.title}
					</h2>
					<h4 className="subtitle text-lg md:text-xl" data-aos="fade-down">
						{services.subtitle}
					</h4>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{services.service_content.map((content, i) => (
						<div
							key={i}
							data-aos="fade-up"
							data-aos-delay={i * 300}
							className="bg-bg_light_primary border border-slate-200 
							rounded-xl p-4 md:p-6
							hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300
							backdrop-blur-sm"
						>
							<img src={content.logo} alt={content.title} className="w-12 md:w-14 h-auto mx-auto mb-4" />
							<h6 className="text-lg md:text-xl font-semibold mb-3 text-center">{content.title}</h6>
							<p className="text-sm md:text-base leading-relaxed text-center">
								{content.para}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
