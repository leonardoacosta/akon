import { trpc } from 'utils/trpc';
import { DataTable } from 'components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Group, Tag } from '@acme/db';
import Button from 'components/ui/Button';
import { ArrowBigRightDash } from 'lucide-react';
import Link from 'next/link';
import { cn } from 'lib/utils';

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
			accessorKey: 'tag',
			header: 'Tag',
			cell: ({ getValue }) => {
				const tag = getValue() as Tag;
				console.log(tag);

				return <div className={cn(`chip rounded-full ${tag.classNames} inline-block`)}>{tag.name}</div>;
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
