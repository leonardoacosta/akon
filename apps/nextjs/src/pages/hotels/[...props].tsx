import Layout from 'components/Layout';
import CreateRoom from 'components/screens/Rooms/Create';
import RoomList from 'components/screens/Rooms/List';

export const Hotel = () => {
	return (
		<Layout>
			<h1 className='text-2xl font-bold text-gray-300'>Rooms</h1>
			<CreateRoom />
			<RoomList />
		</Layout>
	);
};

export default Hotel;
