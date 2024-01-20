import React from "react";

const HeroComponent: React.FC = () => {
	return (
		<div className="hero-container">
			<div className="text-container">
				<div className="original-text">
					<h2>Original Text</h2>
					<p>
						Onec upon a tim in a colourfull forrest, there lived a small rabit. He was a chearful
						littel creature, with a flufy white tale and big, brigth eyes. Everry morning, he wood
						hop out of his burrow to the sparkling brook to drink some freash water. The sun was
						shinning brite in the sky, and the birds were chirpping melodiously. The rabit loved to
						munch on the cruncy carotts and tender grean leaves that greew in abundence around his
						home. Despite his poor spellin, the rabbit was admired by all the other animals in the
						forrest for his kind hart and joly nature. His adventurs were meny and his laught was
						hearthfelt.
					</p>
					{/* The rest of the original text with errors */}
				</div>
				<div className="corrected-text">
					<h2>Corrected Text</h2>
					<p>
						Once upon a time in a colorful forest, there lived a small rabbit. He was a cheerful
						little creature, with a fluffy white tail and big, bright eyes. Every morning, he would
						hop out of his burrow to the sparkling brook to drink some fresh water. The sun was
						shining bright in the sky, and the birds were chirping melodiously. The rabbit loved to
						munch on the crunchy carrots and tender green leaves that grew in abundance around his
						home. Despite his poor spelling, the rabbit was admired by all the other animals in the
						forest for his kind heart and jolly nature. His adventures were many and his laugh was
						heartfelt.
					</p>
					{/* The rest of the corrected text */}
				</div>
			</div>
		</div>
	);
};

export default HeroComponent;
