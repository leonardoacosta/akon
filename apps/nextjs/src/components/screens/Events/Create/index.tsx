import { Event } from '@acme/db';
import Modal from '../../../ui/Modal';
import { TextInput } from '../../../ui/TextInput';
import { Form, Formik } from 'formik';
import { trpc } from '../../../../utils/trpc';
import { useState } from 'react';
import Button from '../../../ui/Button';

export const CreateEvent = () => {
	const [open, setOpen] = useState(false);
	const { mutate } = trpc.events.create.useMutation();

	const newEvent: Event = {
		id: '',
		name: '',
		description: '',
		startDate: new Date(),
		endDate: new Date(),
		location: '',
		address: '',
		city: '',
		state: '',
		zip: ''
	};

	return (
		<Modal
			buttonLabel='Create a new Event'
			modalTitle='New Event'
			modalDescription='This is needed to create everything else!'
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
					setTimeout(() => {
						mutate(values, {
							onSuccess: () => {
								console.log('success');
								setOpen(false);
								// close modal
							}
						});
						setSubmitting(false);
					}, 400);
				}}
			>
				{({ dirty, isValid }) => (
					<Form>
						<TextInput name='name' label='Name' />
						<TextInput name='description' label='Description' />
						<TextInput name='startDate' label='startDate' type='date' />
						<TextInput name='endDate' label='endDate' type='date' />
						<TextInput name='location' label='location' />
						<TextInput name='address' label='address' />
						<TextInput name='city' label='city' />
						<TextInput name='state' label='state' />
						<TextInput name='zip' label='zip' />

						<div className='mt-[25px] flex justify-end'>
							<Button onClick={() => setOpen(true)} disabled={!isValid}>
								Create Event
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default CreateEvent;
