import Layout from 'components/Layout';
import PanelList from 'components/screens/Programming/List';

export const Programming = () => {
	return (
		<Layout>
			<h1 className='text-2xl font-bold text-gray-300'>Programming</h1>
			<PanelList />
		</Layout>
	);
};

export default Programming;
