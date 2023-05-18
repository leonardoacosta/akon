import { trpc } from 'utils/trpc';
import { DataTable } from 'components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Availability } from '@acme/db';
import Button from 'components/ui/Button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { formatDayOfWeek, formatTime } from 'lib/utils';

export const AvailabilityList = () => {
	const { query, pathname } = useRouter();
	const id = query.props ? query.props[0] : null;
	const { data } = trpc.availability.all.useQuery(
		{
			roomId: pathname.includes('room') ? (id as string) : undefined,
			vendorHallId: pathname.includes('vendor-hall') ? (id as string) : undefined
		},
		{ enabled: !!id }
	);

	const columns: ColumnDef<Availability>[] = [
		{
			accessorKey: 'startTime',
			header: 'Day',
			cell: ({ getValue }) => formatDayOfWeek(getValue() as string)
		},
		{
			accessorKey: 'startTime',
			header: 'Start',
			cell: ({ getValue }) => formatTime(getValue() as string)
		},
		{
			accessorKey: 'endTime',
			header: 'End',
			cell: ({ getValue }) => formatTime(getValue() as string)
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const room = row.original;
				return (
					<Link href={`/availability/${room.id}`}>
						<Button secondary>
							<Pencil className='h-4 w-4' />
						</Button>
					</Link>
				);
			}
		}
	];
	// return null;
	return <DataTable columns={columns} data={data ?? []} noneMessage='No Availability yet' />;
};

export default AvailabilityList;
