import { Group, Room } from '@acme/db';
import Modal from '../../../ui/Modal';
import { TextInput } from '../../../ui/TextInput';
import { Form, Formik } from 'formik';
import { trpc } from '../../../../utils/trpc';
import { useState } from 'react';
import Button from '../../../ui/Button';
import { useRouter } from 'next/router';

export const CreateGroup = () => {
	const { query } = useRouter();
	const id = query.props ? query.props[0] : null;
	const [open, setOpen] = useState(false);

	const { mutate } = trpc.groups.create.useMutation();
	const { refetch } = trpc.groups.all.useQuery();

	const newEvent: Group = {
		id: '',
		name: '',
		description: '',
		approved: true
	};

	return (
		<Modal
			buttonLabel='Add Group'
			modalTitle='New Group'
			modalDescription='These represent guests, troupes, panelist, and other groups that will be attending the event.'
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
					mutate(values, {
						onSuccess: () => {
							setOpen(false);
							refetch();
						}
					});
				}}
			>
				{({ isValid, isSubmitting }) => (
					<Form>
						<TextInput name='name' label='Name' />
						<TextInput name='description' label='Description' />
						<TextInput name='capacity' label='Capacity' type='number' />
						<div className='mt-[25px] flex justify-end'>
							<Button onClick={() => setOpen(true)} disabled={!isValid || isSubmitting} loading={isSubmitting}>
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
