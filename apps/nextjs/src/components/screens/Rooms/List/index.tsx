import { trpc } from 'utils/trpc';
import { DataTable } from 'components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Availability, Room } from '@acme/db';
import Button from 'components/ui/Button';
import { ArrowBigRightDash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { formatTime } from 'lib/utils';

export const RoomList = () => {
	const { query } = useRouter();
	const id = query.props ? query.props[0] : null;
	const { data } = trpc.hotels.byId.useQuery(id as string, { enabled: !!id });

	const columns: ColumnDef<Room>[] = [
		{
			accessorKey: 'name',
			header: 'Name'
		},
		{
			accessorKey: 'availability',
			header: 'Availability',
			cell: ({ row }) => {
				const availability: Availability[] = (row.original as any).availability;
				const thu = availability.filter((a) => format(new Date(a.startTime), 'EEEE') === 'Thursday');
				const fri = availability.filter((a) => format(new Date(a.startTime), 'EEEE') === 'Friday');
				const sat = availability.filter((a) => format(new Date(a.startTime), 'EEEE') === 'Saturday');
				const sun = availability.filter((a) => format(new Date(a.startTime), 'EEEE') === 'Sunday');
				const mon = availability.filter((a) => format(new Date(a.startTime), 'EEEE') === 'Monday');
				return (
					<label>
						{thu.length > 0 && `Thu: ${formatTime(thu[0]!.startTime)} - ${formatTime(thu[0]!.endTime)} | `}
						{fri.length > 0 && `Fri: ${formatTime(fri[0]!.startTime)} - ${formatTime(fri[0]!.endTime)} | `}
						{sat.length > 0 && `Sat: ${formatTime(sat[0]!.startTime)} - ${formatTime(sat[0]!.endTime)} | `}
						{sun.length > 0 && `Sun: ${formatTime(sun[0]!.startTime)} - ${formatTime(sun[0]!.endTime)} | `}
						{mon.length > 0 && `Mon: ${formatTime(mon[0]!.startTime)} - ${formatTime(mon[0]!.endTime)} | `}
					</label>
				);
			}
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const room = row.original;

				return (
					<Link href={`/room/${room.id}`}>
						<Button secondary>
							<ArrowBigRightDash className='h-4 w-4' />
						</Button>
					</Link>
				);
			}
		}
	];
	return <DataTable columns={columns} data={data?.rooms ?? []} noneMessage='No conference centers yet' />;
};

export default RoomList;
