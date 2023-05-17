import Layout from 'components/Layout';
import CreateAvailability from 'components/screens/Availability/Create';
import AvailabilityList from 'components/screens/Availability/List';
import RoomInfo from 'components/screens/Rooms/Info';

export const Room = () => (
	<Layout>
		<div className='grid grid-cols-2 gap-4'>
			<RoomInfo />
			<div>
				<CreateAvailability />
				<AvailabilityList />
			</div>
		</div>
	</Layout>
);

export default Room;
