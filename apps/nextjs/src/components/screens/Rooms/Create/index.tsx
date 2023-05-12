import { Room } from '@acme/db';
import Modal from '../../../ui/Modal';
import { TextInput } from '../../../ui/TextInput';
import { Form, Formik } from 'formik';
import { trpc } from '../../../../utils/trpc';
import { useState } from 'react';
import Button from '../../../ui/Button';
import { useRouter } from 'next/router';

export const CreateRoom = () => {
	const { query } = useRouter();
	const id = query.props ? query.props[0] : null;
	const [open, setOpen] = useState(false);

	const { mutate } = trpc.room.create.useMutation();
	const { data, refetch } = trpc.hotels.byId.useQuery(id as string, { enabled: !!id });

	const newEvent: Room = {
		id: '',
		name: '',
		description: '',
		capacity: 0,
		hotelId: ''
	};

	return (
		<Modal
			buttonLabel='Add Conference Center'
			modalTitle='New Conference Center'
			modalDescription='These will hold the rooms that will be available for panels and events.'
			open={open}
			setOpen={setOpen}
		>
			<Formik
				initialValues={newEvent}
				validate={(values) => {
					const errors = {};
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					values.hotelId = id as string;
					mutate(values, {
						onSuccess: () => {
							console.log('success');
							setOpen(false);
							refetch();
						}
					});
				}}
			>
				{({ dirty, isValid }) => (
					<Form>
						<TextInput name='name' label='Name' />
						<TextInput name='description' label='Description' />
						<TextInput name='capacity' label='Capacity' type='number' />
						<div className='mt-[25px] flex justify-end'>
							<Button onClick={() => setOpen(true)} disabled={!isValid}>
								Create Room
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default CreateRoom;
