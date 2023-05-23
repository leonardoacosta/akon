import Layout from 'components/Layout';
import { CreateGroup } from 'components/screens/Guests/Create';
import GroupList from 'components/screens/Guests/List';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export const Guests = () => {
	const { back } = useRouter();
	return (
		<Layout>
			<h2 className='pb-2 text-2xl font-bold text-white' onClick={back}>
				<ArrowLeft className='inline-block' /> Go Back
			</h2>
			<CreateGroup />
			<GroupList />
		</Layout>
	);
};

export default Guests;
