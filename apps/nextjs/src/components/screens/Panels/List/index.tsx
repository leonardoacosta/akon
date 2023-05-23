import { trpc } from 'utils/trpc';
import { DataTable } from 'components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Panel, Tag } from '@acme/db';
import Button from 'components/ui/Button';
import { ArrowBigRightDash } from 'lucide-react';
import Link from 'next/link';
import { cn } from 'lib/utils';
import { useRouter } from 'next/router';

export const PanelList = () => {
	const { query } = useRouter();
	const guestId = query.props ? query.props[0] : null;

	const { data: allPanels } = trpc.panels.all.useQuery({ guestId: guestId ?? undefined });
	const columns: ColumnDef<Panel>[] = [
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
				const panel = row.original;
				return (
					<Link href={`/panels/${panel.id}`}>
						<Button secondary>
							<span className='sr-only'>Open menu</span>
							<ArrowBigRightDash className='h-4 w-4' />
						</Button>
					</Link>
				);
			}
		}
	];
	return <DataTable columns={columns} data={allPanels ?? []} noneMessage='No Panels to review' />;
};

export default PanelList;
