import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/Tabs';
import Volunteers from './Volunteers/List';
import Programming from './Programming/List';
import AddProgramming from './Programming/Create';
import Vendors from './Vendors/List';
import AddToVolunteers from './Volunteers/Create';
import AddToVendors from './Vendors/Create';
import AddToGuests from './Guests/Create';
import GuestsList from './Guests/List';

export const Departments = () => {
	return (
		<Tabs defaultValue='volunteers' className=''>
			<TabsList>
				<TabsTrigger value='guests'>Guests</TabsTrigger>
				<TabsTrigger value='programming'>Programming</TabsTrigger>
				<TabsTrigger value='volunteers'>Volunteers</TabsTrigger>
				<TabsTrigger value='vendors'>Vendors</TabsTrigger>
			</TabsList>
			<TabsContent value='guests'>
				<AddToGuests />
				<GuestsList />
			</TabsContent>
			<TabsContent value='programming'>
				<AddProgramming />
				<Programming />
			</TabsContent>
			<TabsContent value='volunteers'>
				<AddToVolunteers />
				<Volunteers />
			</TabsContent>
			<TabsContent value='vendors'>
				<AddToVendors />
				<Vendors />
			</TabsContent>
		</Tabs>
	);
};
