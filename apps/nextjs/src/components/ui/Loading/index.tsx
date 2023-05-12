import { PieChartIcon } from '@radix-ui/react-icons';
export const Loading = () => {
	return (
		<div className='flex h-full items-center justify-center'>
			<PieChartIcon className=' h-[50px] w-[50px] animate-spin text-white' />
		</div>
	);
};
