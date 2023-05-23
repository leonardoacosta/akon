import { trpc } from 'utils/trpc';
import { DataTable } from 'components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Panel } from '@acme/db';
import Button from 'components/ui/Button';
import { ArrowBigRightDash } from 'lucide-react';
import Link from 'next/link';

export const PanelList = () => {
	const { data: currentEvent } = trpc.events.getCurrent.useQuery();
	const { data: allPanels } = trpc.panels.all.useQuery(undefined, {
		enabled: !!currentEvent
	});
	const columns: ColumnDef<Panel>[] = [
		{
			accessorKey: 'name',
			header: 'Name'
		},
		{
			accessorKey: 'rooms',
			header: 'Rooms',
			cell: ({ getValue }) => <span>{(getValue() as any).length}</span>
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const hotel = row.original;
				return (
					<Link href={`/hotels/${hotel.id}`}>
						<Button secondary>
							<span className='sr-only'>Open menu</span>
							<ArrowBigRightDash className='h-4 w-4' />
						</Button>
					</Link>
				);
			}
		}
	];
	return <DataTable columns={columns} data={allPanels ?? []} noneMessage='No panels to review' />;
};

export default PanelList;
