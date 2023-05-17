import { Availability } from '@acme/db';
import Modal from '../../../ui/Modal';
import { TextInput } from '../../../ui/TextInput';
import { Form, Formik } from 'formik';
import { trpc } from '../../../../utils/trpc';
import { useState } from 'react';
import Button from '../../../ui/Button';
import { useRouter } from 'next/router';

export const CreateAvailability = () => {
	const { query, pathname } = useRouter();
	const id = query.props ? query.props[0] : null;
	const [open, setOpen] = useState(false);
	const { mutate } = trpc.availability.create.useMutation();

	const newAvailability: Availability = {
		id: '',
		startTime: '',
		endTime: '',

		roomId: pathname.includes('room') ? (id as string) : null,
		vendorHallId: pathname.includes('vendor-hall') ? (id as string) : null
	};

	return (
		<div className='flex justify-between'>
			<h2 className='text-2xl font-bold text-white'>Availability</h2>
			<Modal
				buttonLabel='Add Availability'
				modalTitle='New Availability'
				modalDescription='This is when the room is available!'
				open={open}
				setOpen={setOpen}
			>
				<Formik
					initialValues={newAvailability}
					validate={(values) => {
						const errors = {};
						console.log(values);
						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						mutate(values, {
							onSuccess: () => {
								setOpen(false);
							},
							onError: (error) => {
								console.log(error.message);
							}
						});
						setSubmitting(false);
					}}
				>
					{({ dirty, isValid, isSubmitting }) => (
						<Form>
							<TextInput name='startTime' label='Start Time' type='datetime-local' />
							<TextInput name='endTime' label='End Time' type='datetime-local' />

							<div className='mt-[25px] flex justify-end'>
								<Button onClick={() => setOpen(true)} disabled={!isValid || isSubmitting} loading={isSubmitting}>
									Create Event
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</Modal>
		</div>
	);
};

export default CreateAvailability;
