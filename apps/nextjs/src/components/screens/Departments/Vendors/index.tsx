import { trpc } from 'utils/trpc';
import { DataTable } from 'components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import Button from 'components/ui/Button';
import { XSquareIcon } from 'lucide-react';
import { User } from '@clerk/nextjs/api';

export const Vendors = () => {
	const { data, refetch } = trpc.users.all.useQuery({ department: 'isVendors' });
	const { mutate, isLoading } = trpc.users.toggleDepartment.useMutation({
		onSuccess: () => {
			refetch();
		}
	});

	const columns: ColumnDef<User>[] = [
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => (
				<span>
					{row.original.firstName} {row.original.lastName}
				</span>
			)
		},
		{
			header: 'Remove',
			cell: ({ row }) => {
				const user = row.original;
				return (
					<Button secondary disabled={isLoading} onClick={() => mutate({ id: user.id, department: 'isVendors' })}>
						<span className='sr-only'>Open menu</span>
						<XSquareIcon className='h-4 w-4' />
					</Button>
				);
			}
		}
	];
	return <DataTable columns={columns} data={data ?? []} noneMessage='No one is in Programming' />;
};

export default Vendors;
