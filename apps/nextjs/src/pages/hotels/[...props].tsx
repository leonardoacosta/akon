import Layout from 'components/Layout';
import CreateRoom from 'components/screens/Rooms/Create';
import RoomList from 'components/screens/Rooms/List';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export const Hotel = () => {
	const { back } = useRouter();
	return (
		<Layout>
			<h2 className='pb-2 text-2xl font-bold text-white' onClick={back}>
				<ArrowLeft className='inline-block' /> Go Back
			</h2>
			<CreateRoom />
			<RoomList />
		</Layout>
	);
};

export default Hotel;
