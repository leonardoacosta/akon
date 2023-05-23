import Layout from 'components/Layout';
import GuestInfo from 'components/screens/Guests/Info';

export const Guest = () => (
	<Layout>
		<div className='grid grid-cols-2 gap-4'>
			<GuestInfo />
			<div>
				{/* <CreateAvailability />
				<AvailabilityList /> */}
			</div>
		</div>
	</Layout>
);

export default Guest;
