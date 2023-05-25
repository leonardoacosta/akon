import { trpc } from 'utils/trpc';
import { DataTable } from 'components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import Button from 'components/ui/Button';
import { User } from '@clerk/nextjs/api';
import { XSquareIcon } from 'lucide-react';

export const GuestsList = () => {
	const { data, refetch } = trpc.users.all.useQuery({ department: 'isGuests' });
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
			header: 'Email',
			cell: ({ row }) => <span>{row.original.emailAddresses.map((e) => e.emailAddress + ' ')}</span>
		},
		{
			header: 'Phone',
			cell: ({ row }) => <span>{row.original.phoneNumbers.map((e) => e.phoneNumber + ' ')}</span>
		},
		{
			header: 'Remove',
			cell: ({ row }) => {
				const user = row.original;
				return (
					<Button secondary disabled={isLoading} onClick={() => mutate({ id: user.id, department: 'isVolunteers' })}>
						<span className='sr-only'>Open menu</span>
						<XSquareIcon className='h-4 w-4' />
					</Button>
				);
			}
		}
	];
	return <DataTable columns={columns} data={data ?? []} noneMessage='No one is in volunteers' />;
};

export default GuestsList;
