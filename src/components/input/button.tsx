import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const button = cva("flex items-center justify-center", {
	variants: {
		variant: {
			primary: [
			"text-white",
			"hover:bg-blue-600",
			"bg-blue-500",
			"focus:ring-4",
			"focus:ring-blue-200",
			"font-medium",
			"rounded-lg",
			"transition-colors",
			"duration-200",
			"shadow-sm",
			"hover:shadow-md",
			"dark:bg-blue-600",
			"dark:hover:bg-blue-700",
			"focus:outline-none",
			"dark:focus:ring-blue-800"
		],
			success: [
				"focus:outline-none",
				"text-white",
				"bg-green-700",
				"hover:bg-green-800",
				"focus:ring-4",
				"focus:ring-green-300",
				"font-medium",
				"rounded-lg",
				"dark:bg-green-600",
				"dark:hover:bg-green-700",
				"dark:focus:ring-green-800"
			],
			error: [
				"focus:outline-none",
				"text-white",
				"bg-red-700",
				"hover:bg-red-800",
				"focus:ring-4",
				"focus:ring-red-300",
				"font-medium",
				"rounded-lg",
				"dark:bg-red-600",
				"dark:hover:bg-red-700",
				"dark:focus:ring-red-900"
			],
			warning: [
				"focus:outline-none",
				"text-white",
				"bg-orange-700",
				"hover:bg-orange-700",
				"focus:ring-4",
				"focus:ring-orange-500",
				"font-medium",
				"rounded-lg",
				"dark:focus:ring-orange-900"
			],
			alternative: [
				"font-medium",
				"text-gray-900",
				"focus:outline-none",
				"bg-white",
				"rounded-lg",
				"border",
				"border-gray-200",
				"hover:bg-gray-100",
				"hover:text-blue-700",
				"focus:z-10",
				"focus:ring-4",
				"focus:ring-gray-200",
				"dark:focus:ring-gray-700",
				"dark:bg-gray-800",
				"dark:text-gray-400","dark:border-gray-600",
				"dark:hover:text-white",
				"dark:hover:bg-gray-700"
			]
		},
		size: {
			small: ["text-sm", "py-1", "px-2"],
			medium: ["text-base", "py-1 px-2 md:py-2", "py-2 md:px-5", "md:h-10"],
		},
	},
	compoundVariants: [{ variant: "primary", size: "medium"}],
	defaultVariants: {
		variant: "primary",
		size: "medium",
	},
});


export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> ,
		VariantProps<typeof button> {
		}

const Button: React.FC<ButtonProps> = ({
	className,
	variant,
	size,
	...props
}) => <button className={button({ variant, size, className })} {...props}>{props.children}</button>;

export default Button