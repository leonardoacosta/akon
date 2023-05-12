import { trpc } from 'utils/trpc';
import { DataTable } from 'components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Hotel } from '@acme/db';
import Button from 'components/ui/Button';
import { ArrowBigRightDash } from 'lucide-react';
import Link from 'next/link';

export const HotelList = () => {
	const { data } = trpc.events.getCurrent.useQuery();
	const columns: ColumnDef<Hotel>[] = [
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
	return <DataTable columns={columns} data={data?.hotels ?? []} noneMessage='No conference centers yet' />;
};

export default HotelList;
