import clsx from 'clsx';
import React from 'react';

export const Button = ({ children, onClick, disabled, secondary }: ButtonProps) => {
	const className = clsx(
		secondary
			? 'focus:shadow-rose-400 text-white hover:bg-rose-600 border border-rose-600 hover:border-rose-700'
			: 'bg-rose-600 focus:shadow-rose-400 text-white hover:opacity-80',
		' inline-flex h-[35px] items-center justify-center rounded-[4px] px-4 font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none disabled:opacity-70'
	);

	return (
		<button className={className} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	secondary?: boolean;
}

export default Button;
