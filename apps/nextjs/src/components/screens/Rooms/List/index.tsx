import { trpc } from 'utils/trpc';
import { DataTable } from 'components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Room } from '@acme/db';
import Button from 'components/ui/Button';
import { ArrowBigRightDash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
