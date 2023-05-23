import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/Tabs';
import Volunteers from './Volunteers';
import Programming from './Programming';
import Vendors from './Vendors';

export const Departments = () => {
	return (
		<Tabs defaultValue='volunteers' className=''>
			<TabsList>
				<TabsTrigger value='volunteers'>Volunteers</TabsTrigger>
				<TabsTrigger value='programming'>Programming</TabsTrigger>
				<TabsTrigger value='vendors'>Vendors</TabsTrigger>
			</TabsList>
			<TabsContent value='volunteers'>
				<Volunteers />
			</TabsContent>
			<TabsContent value='programming'>
				<Programming />
			</TabsContent>
			<TabsContent value='vendors'>
				<Vendors />
			</TabsContent>
		</Tabs>
	);
};
