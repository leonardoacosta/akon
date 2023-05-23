import Layout from 'components/Layout';
import { Departments } from 'components/screens/Departments';
import CreateHotel from 'components/screens/Hotels/Create';
import HotelList from 'components/screens/Hotels/List';
import CreateTag from 'components/screens/Tags/Create';
import TagList from 'components/screens/Tags/List';
import { Card } from 'components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/Tabs';

export const Settings = () => {
	return (
		<Layout>
			<Card>
				<Tabs defaultValue='departments' className=''>
					<TabsList>
						<TabsTrigger value='departments'>Departments</TabsTrigger>
						<TabsTrigger value='hotel'>Hotel</TabsTrigger>
						<TabsTrigger value='tags'>Tags</TabsTrigger>
					</TabsList>
					<TabsContent value='tags'>
						<CreateTag />
						<TagList />
					</TabsContent>
					<TabsContent value='hotel'>
						<CreateHotel />
						<HotelList />
					</TabsContent>
					<TabsContent value='departments'>
						<Departments />
					</TabsContent>
				</Tabs>
			</Card>
		</Layout>
	);
};

export default Settings;
