import Layout from 'components/Layout';
import GuestInfo from 'components/screens/Guests/Info';
import CreatePanel from 'components/screens/Panels/Create';
import PanelList from 'components/screens/Panels/List';

export const Guest = () => (
	<Layout>
		<div className='grid grid-cols-2 gap-4'>
			<GuestInfo />
			<div>
				<CreatePanel />
				<PanelList />
			</div>
		</div>
	</Layout>
);

export default Guest;
