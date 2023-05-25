import { Group, Panel } from '@acme/db';
import Modal from '../../../ui/Modal';
import { TextInput } from '../../../ui/TextInput';
import { Form, Formik } from 'formik';
import { trpc } from '../../../../utils/trpc';
import { useState } from 'react';
import Button from '../../../ui/Button';
import { useRouter } from 'next/router';
import TagSelect from 'components/ui/TagSelect';

export const BecomeAGuest = () => {
	const [open, setOpen] = useState(false);
	const { push } = useRouter();

	const { mutate } = trpc.groups.request.useMutation();

	const newGroup: Group = {
		id: '',
		name: '',
		description: '',
		tagId: '',
		approved: false
	};

	return (
		<Modal
			buttonLabel='Become a Guest/Panelist'
			modalTitle='Ready to be part of the show?'
			modalDescription='In order to submit a panel or show idea you need to become a registered guest.'
			open={open}
			setOpen={setOpen}
		>
			<Formik
				initialValues={newGroup}
				validate={(values) => {
					const errors: any = {};
					if (!values.name) errors.name = 'Required';
					if (!values.description) errors.description = 'Required';
					if (!values.tagId) errors.tagId = 'Required';
					return errors;
				}}
				validateOnMount
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					mutate(values, {
						onSuccess: () => {
							setSubmitting(false);
							setOpen(false);
							push('/panelist');
						}
					});
				}}
			>
				{({ isValid, isSubmitting }) => (
					<Form>
						<TextInput name='name' label='Name' />
						<TextInput name='description' label='Description ' />
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

export default BecomeAGuest;
