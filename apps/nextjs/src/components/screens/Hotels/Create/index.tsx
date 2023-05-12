import { Hotel } from '@acme/db';
import Modal from '../../../ui/Modal';
import { TextInput } from '../../../ui/TextInput';
import { Form, Formik } from 'formik';
import { trpc } from '../../../../utils/trpc';
import { useState } from 'react';
import Button from '../../../ui/Button';

export const CreateHotel = () => {
	const [open, setOpen] = useState(false);
	const { mutate } = trpc.hotels.create.useMutation();
	const { data, refetch } = trpc.events.getCurrent.useQuery();

	const newEvent: Hotel = {
		id: '',
		name: '',
		address: '',
		city: '',
		state: '',
		zip: '',
		eventId: ''
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
					values.eventId = `${data?.id}`;
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
						<TextInput name='location' label='location' />
						<TextInput name='address' label='address' />
						<TextInput name='city' label='city' />
						<TextInput name='state' label='state' />
						<TextInput name='zip' label='zip' />

						<div className='mt-[25px] flex justify-end'>
							<Button onClick={() => setOpen(true)} disabled={!isValid}>
								Create Conference Center
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default CreateHotel;
