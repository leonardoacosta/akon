import { useUser } from '@clerk/nextjs';
import Layout from '../../components/Layout';
import { trpc } from '../../utils/trpc';
import CreateEvent from '../../components/screens/Events/Create';
import CreateHotel from '../../components/screens/Hotels/Create';
import HotelList from 'components/screens/Hotels/List';

export const Home = () => {
	const { data } = trpc.events.getCurrent.useQuery();
	const { user } = useUser();
	const isAdmin = user?.publicMetadata['isAdmin'];

	return (
		<Layout>
			{isAdmin && data ? (
				<div className='relative block w-full rounded-lg border-2 border-gray-300 bg-gradient-to-r from-slate-900/90 to-slate-900/20 p-6 text-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
					<h3 className='font-bold leading-3 text-gray-300'>{data.name}</h3>
					<p className='mt-2 text-sm font-extralight text-gray-200'>{data.description}</p>
					<CreateHotel />
					<HotelList />
				</div>
			) : isAdmin && !data ? (
				<div className='relative block w-full rounded-lg border-2 border-gray-300 bg-gradient-to-r from-slate-900/90 to-slate-900/20 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
					<CreateEvent />
				</div>
			) : !isAdmin && data ? (
				<div className='relative block w-full rounded-lg border-2 border-gray-300 bg-gradient-to-r from-slate-900/90 to-slate-900/20 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
					<>Welcome to {data.name}</>
				</div>
			) : (
				<div className='relative block w-full rounded-lg border-2 border-gray-300 bg-gradient-to-r from-slate-900/90 to-slate-900/20 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
					<h2 className='title-font mb-3 text-sm font-medium tracking-wider text-white'>Sorry, you might be lost</h2>
					<p className='font-medium tracking-wider text-white'>Theres nothing to see here... yet.</p>
				</div>
			)}
		</Layout>
	);
};

export default Home;
