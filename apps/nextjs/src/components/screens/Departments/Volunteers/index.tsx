import { trpc } from 'utils/trpc';
import { DataTable } from 'components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import Button from 'components/ui/Button';
import { ArrowBigRightDash } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/api';
import { XSquareIcon } from 'lucide-react';

export const Volunteers = () => {
	const { user } = useUser();
	const isAdmin = user?.publicMetadata['isAdmin'];

	const { data, refetch } = trpc.users.all.useQuery({ department: 'isVolunteer' });
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
		// {
		// 	accessorKey: 'rooms',
		// 	header: 'Rooms',
		// 	cell: ({ getValue }) => <span>{(getValue() as any).length}</span>
		// },
		{
			id: 'actions',
			cell: ({ row }) => {
				const user = row.original;
				return (
					<Button secondary disabled={isLoading} onClick={() => mutate({ id: user.id, department: 'isProgramming' })}>
						<span className='sr-only'>Open menu</span>
						<XSquareIcon className='h-4 w-4' />
					</Button>
				);
			}
		}
	];
	return <DataTable columns={columns} data={data ?? []} noneMessage='No one is in volunteers' />;
};

export default Volunteers;
