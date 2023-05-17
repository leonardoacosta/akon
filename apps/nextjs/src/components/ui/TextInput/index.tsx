import clsx from 'clsx';
import { Field, useFormikContext } from 'formik';
import { formatDate, formatInputTime } from 'lib/utils';

export const TextInput = ({ name, label, placeholder, type }: TextInputProps) => {
	const { values, errors, touched, setFieldValue } = useFormikContext<any>();
	const error = !!touched[name] && !values[name] ? (errors[name] as string) ?? 'Required' : '';

	if (type === 'time') console.log(name, values[name]);

	// const value = type === 'date' ? formatDate(values[name]) : values[name];
	const className = clsx(
		error && 'bg-rose-50  shadow-rose-400',
		`inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px]
		px-[10px] text-[15px] leading-none 
		text-gray-600 shadow-[0_0_0_1px] 
		outline-none focus:shadow-[0_0_0_2px] focus:shadow-gray-600`
	);
	return (
		<fieldset className='mb-[15px] flex items-center gap-5'>
			<label className='w-[90px] text-right text-[15px] text-gray-300' htmlFor={name}>
				{label}
			</label>
			<Field className={className} id={name} value={values[name]} name={name} placeholder={placeholder} type={type} />
		</fieldset>
	);
};

export interface TextInputProps {
	name: string;
	label: string;
	placeholder?: string;
	type?: 'text' | 'number' | 'date' | 'time' | 'datetime-local' | 'email' | 'password' | 'search' | 'tel' | 'url';
}
