import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const button = cva("flex items-center", {
	variants: {
		variant: {
			primary: [
				"text-white",
				"bg-blue-700",
				"hover:bg-blue-800",
				"focus:ring-4",
				"focus:ring-blue-300",
				"font-medium",
				"rounded-lg",
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
				"bg-yellow-400",
				"hover:bg-yellow-500",
				"focus:ring-4",
				"focus:ring-yellow-300",
				"font-medium",
				"rounded-lg",
				"dark:focus:ring-yellow-900"
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
			medium: ["text-base", "py-2.5", "px-5"],
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