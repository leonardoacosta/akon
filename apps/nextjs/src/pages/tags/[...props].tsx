import Layout from 'components/Layout';
import TagInfo from 'components/screens/Tags/Info';

export const Room = () => (
	<Layout>
		<div className='grid grid-cols-2 gap-4'>
			<TagInfo />
		</div>
	</Layout>
);

export default Room;
