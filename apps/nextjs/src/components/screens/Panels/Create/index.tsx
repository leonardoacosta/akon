import { Panel } from '@acme/db';
import Modal from '../../../ui/Modal';
import { TextInput } from '../../../ui/TextInput';
import { Form, Formik } from 'formik';
import { trpc } from '../../../../utils/trpc';
import { useState } from 'react';
import Button from '../../../ui/Button';
import { useRouter } from 'next/router';
import TagSelect from 'components/ui/TagSelect';

export const CreatePanel = () => {
	const [open, setOpen] = useState(false);
	const { query } = useRouter();
	const id = query.props ? query.props[0] : null;

	const { mutate } = trpc.panels.create.useMutation();
	const { refetch } = trpc.panels.all.useQuery({ guestId: id as string });

	const newPanel: Panel = {
		id: '',
		groupId: id as string,
		name: '',
		description: '',
		start: new Date(),
		end: new Date(),
		approved: false,
		approvalSent: null,
		denied: false,
		deniedReason: '',
		deniedSent: null,
		eightteenPlus: false,
		roomId: null,
		tagId: ''
	};

	return (
		<Modal
			buttonLabel='Add Panel'
			modalTitle='New Panel'
			modalDescription='Submit a panel for review!'
			open={open}
			setOpen={setOpen}
		>
			<Formik
				initialValues={newPanel}
				validate={(values) => {
					const errors = {};
					return errors;
				}}
				validateOnMount
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					mutate(values, {
						onSuccess: () => {
							refetch();
							setSubmitting(false);
							setOpen(false);
						}
					});
				}}
			>
				{({ isValid, isSubmitting }) => (
					<Form>
						<TextInput name='name' label='Name' />
						<TextInput name='description' label='Description' />
						<TagSelect tagType='PANEL' />
						<div className='mt-[25px] flex justify-end'>
							<Button onClick={() => setOpen(true)} disabled={!isValid || isSubmitting} loading={isSubmitting}>
								Create Panel
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default CreatePanel;
