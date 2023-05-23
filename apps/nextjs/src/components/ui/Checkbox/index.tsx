import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from 'lib/utils';
import { useFormikContext } from 'formik';

const Checkbox = ({ name, value, label }: ICheckbox) => {
	const { values, errors, touched, setFieldValue } = useFormikContext<any>();
	const error =
		!!touched[name as string] && !values[name as string] ? (errors[name as string] as string) ?? 'Required' : '';
	const checked = values[name as string] === value;

	const switchClassName = cn(
		error && 'bg-rose-50  shadow-rose-400',
		`border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer h-4 w-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`
	);

	return (
		<fieldset className='mb-[15px] flex items-center gap-5'>
			<label className='w-[90px] text-right text-[15px] text-gray-500' htmlFor={name}>
				{label}
			</label>
			<CheckboxPrimitive.Root
				className={switchClassName}
				checked={checked}
				onCheckedChange={() => {
					setFieldValue(name as string, value);
				}}
				name={name}
				id={name}
			>
				<CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
					{checked && <Check className='h-4 w-4 bg-slate-400' />}
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
		</fieldset>
	);
};

export interface ICheckbox {
	name: string;
	label: string;
	value: string;
}

export default Checkbox;
