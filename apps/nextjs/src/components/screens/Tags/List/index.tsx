import { trpc } from 'utils/trpc';
import { DataTable } from 'components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Tag } from '@acme/db';
import Button from 'components/ui/Button';
import { ArrowBigRightDash } from 'lucide-react';
import Link from 'next/link';

export const TagList = () => {
	const { data: allTags } = trpc.tags.all.useQuery({});

	const columns: ColumnDef<Tag>[] = [
		{
			accessorKey: 'name',
			header: 'Name'
		},
		{
			accessorKey: 'type',
			header: 'Type',
			cell: ({ getValue }) => <span>{(getValue() as string) === 'PANEL' ? 'Panel' : 'Group'}</span>
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const hotel = row.original;
				return (
					<Link href={`/tags/${hotel.id}`}>
						<Button secondary>
							<span className='sr-only'>Open menu</span>
							<ArrowBigRightDash className='h-4 w-4' />
						</Button>
					</Link>
				);
			}
		}
	];
	return <DataTable columns={columns} data={allTags ?? []} noneMessage='No tags to review' />;
};

export default TagList;
