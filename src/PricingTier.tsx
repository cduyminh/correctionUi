import React from "react";

type PricingTier = {
	name: string;
	price: string;
	features: string[];
};

const tiers: PricingTier[] = [
	{
		name: "Free",
		price: "$0/month",
		features: ["1MB file limit", "Up to 500 words", "1 day cache", "$200 free tokens"],
	},
	{
		name: "Standard",
		price: "comming soon",
		features: [
			"5MB file limit",
			"Up to 2,000 words",
			"7 days cache",
			"$500 free tokens",
			"Priority processing",
			"Email support",
		],
	},
	{
		name: "Premium",
		price: "comming soon",
		features: [
			"10MB file limit",
			"Unlimited words",
			"30 days cache",
			"$1000 free tokens",
			"Priority processing",
			"Dedicated support",
			"API access",
		],
	},
];

const PricingTable: React.FC = () => {
	return (
		<div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
			{tiers.map((tier) => (
				<div
					key={tier.name}
					style={{
						border: "1px solid gray",
						borderRadius: "5px",
						padding: "20px",
						margin: "10px",
						width: "300px",
					}}
				>
					<h2>{tier.name}</h2>
					<p>{tier.price}</p>
					<ul>
						{tier.features.map((feature) => (
							<li key={feature}>{feature}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default PricingTable;
