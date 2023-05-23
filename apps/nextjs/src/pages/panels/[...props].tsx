import Layout from 'components/Layout';
import CreateAvailability from 'components/screens/Availability/Create';
import AvailabilityList from 'components/screens/Availability/List';
import PanelInfo from 'components/screens/Panels/Info';
import RoomInfo from 'components/screens/Rooms/Info';

export const Panel = () => (
	<Layout>
		<div className='grid grid-cols-2 gap-4'>
			<PanelInfo />
		</div>
	</Layout>
);

export default Panel;
