import { trpc } from 'utils/trpc';
import { DataTable } from 'components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Group, Group_Tag } from '@acme/db';
import Button from 'components/ui/Button';
import { ArrowBigRightDash } from 'lucide-react';
import Link from 'next/link';

export const GroupList = () => {
	const { data: allGroups } = trpc.groups.all.useQuery(undefined);
	const columns: ColumnDef<Group>[] = [
		{
			accessorKey: 'name',
			header: 'Name'
		},
		{
			accessorKey: 'approved',
			header: 'Status',
			cell: ({ getValue }) => <span>{(getValue() as boolean) ? 'Approved' : 'Denied'}</span>
		},
		{
			accessorKey: 'tags',
			header: 'Tags',
			cell: ({ getValue }) => {
				const tags = getValue() as Group_Tag[];
				console.log(tags);

				return <span>{false ? 'Approved' : 'Denied'}</span>;
			}
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const hotel = row.original;
				return (
					<Link href={`/guests/${hotel.id}`}>
						<Button secondary>
							<span className='sr-only'>Open menu</span>
							<ArrowBigRightDash className='h-4 w-4' />
						</Button>
					</Link>
				);
			}
		}
	];
	return <DataTable columns={columns} data={allGroups ?? []} noneMessage='No groups to review' />;
};

export default GroupList;
