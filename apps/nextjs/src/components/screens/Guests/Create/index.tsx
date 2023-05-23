import { Group } from '@acme/db';
import Modal from '../../../ui/Modal';
import { TextInput } from '../../../ui/TextInput';
import { Form, Formik } from 'formik';
import { trpc } from '../../../../utils/trpc';
import { useState } from 'react';
import Button from '../../../ui/Button';
import TagSelect from 'components/ui/TagSelect';

export const CreateGroup = () => {
	const [open, setOpen] = useState(false);

	const { mutate } = trpc.groups.create.useMutation();
	const { refetch } = trpc.groups.all.useQuery();

	const newEvent: Group = {
		id: '',
		name: '',
		description: '',
		approved: true,
		tagId: ''
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
					const errors: any = {};
					if (!values.name) errors['name'] = 'Required';
					if (!values.description) errors['description'] = 'Required';
					if (!values.tagId) errors['tagId'] = 'Required';
					console.log(values, errors);
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					mutate(values, {
						onSuccess: () => {
							setSubmitting(false);
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
						<TagSelect tagType='GROUP' />
						<div className='mt-[25px] flex justify-end'>
							<Button onClick={() => setOpen(true)} disabled={!isValid || isSubmitting} loading={isSubmitting}>
								Create Group
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default CreateGroup;
