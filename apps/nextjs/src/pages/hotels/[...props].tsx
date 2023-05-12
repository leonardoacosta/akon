import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import { trpc } from 'utils/trpc';
import { ColumnDef } from '@tanstack/react-table';
import { Room } from '@acme/db';
import Link from 'next/link';
import Button from 'components/ui/Button';
import { ArrowBigRightDash } from 'lucide-react';
import { DataTable } from 'components/ui/DataTable';

export const Hotel = () => {
	const { query } = useRouter();
	const id = query.props ? query.props[0] : null;

	const { data } = trpc.room.all.useQuery({ hotelId: id! }, { enabled: !!id });

	const columns: ColumnDef<Room>[] = [
		{
			accessorKey: 'name',
			header: 'Name'
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
	return (
		<Layout>
			<h1 className='text-2xl font-bold'>Rooms</h1>

			<DataTable columns={columns} data={data ?? []} noneMessage='No rooms' />
		</Layout>
	);
};

export default Hotel;
