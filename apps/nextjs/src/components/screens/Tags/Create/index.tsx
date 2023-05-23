import { Tag } from '@acme/db';
import Modal from '../../../ui/Modal';
import { TextInput } from '../../../ui/TextInput';
import { Form, Formik } from 'formik';
import { trpc } from '../../../../utils/trpc';
import { useState } from 'react';
import Button from '../../../ui/Button';
import Checkbox from 'components/ui/Checkbox';

export const CreateTag = () => {
	const [open, setOpen] = useState(false);

	const { mutate } = trpc.tags.create.useMutation();
	const { refetch } = trpc.tags.all.useQuery();

	const newtag: Tag = {
		id: '',
		name: '',
		classNames: '',
		type: 'GROUP'
	};

	return (
		<Modal
			buttonLabel='Add Tag'
			modalTitle='New Tag'
			modalDescription='These will help manage panels and guests.'
			open={open}
			setOpen={setOpen}
		>
			<Formik
				initialValues={newtag}
				validate={(values) => {
					const errors: any = {};
					if (!values.name) errors['name'] = 'Required';
					if (!values.classNames) errors['classNames'] = 'Required';

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
						<TextInput name='classNames' label='Tailwind Class Names' />
						<label className='block text-sm font-medium text-gray-700'>Type</label>
						<Checkbox name='type' value='PANEL' label='Panel tag' />
						<Checkbox name='type' value='GROUP' label='Group tag' />
						<div className='mt-[25px] flex justify-end'>
							<Button onClick={() => setOpen(true)} disabled={!isValid || isSubmitting} loading={isSubmitting}>
								Create Tag
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default CreateTag;
