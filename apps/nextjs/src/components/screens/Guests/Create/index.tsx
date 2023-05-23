import { Group, Room } from '@acme/db';
import Modal from '../../../ui/Modal';
import { TextInput } from '../../../ui/TextInput';
import { Form, Formik } from 'formik';
import { trpc } from '../../../../utils/trpc';
import { useState } from 'react';
import Button from '../../../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/Select';

export const CreateGroup = () => {
	const [open, setOpen] = useState(false);

	const { mutate } = trpc.groups.create.useMutation();
	const { data: tags } = trpc.tags.all.useQuery({ type: 'GROUP' });
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
						<fieldset className='mb-[15px] flex items-center gap-5'>
							<label className='w-[90px] text-right text-[15px] text-gray-500' htmlFor='tags'>
								Tag
							</label>
							<Select>
								<SelectTrigger name='tags'>
									<SelectValue placeholder='Select a fruit' />
								</SelectTrigger>
								<SelectContent>
									{tags?.map((tag) => (
										<SelectItem key={tag.id} value={tag.name}>
											{tag.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</fieldset>
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
