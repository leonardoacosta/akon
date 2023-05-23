import { Panel } from '@acme/db';
import Modal from '../../../ui/Modal';
import { TextInput } from '../../../ui/TextInput';
import { Form, Formik } from 'formik';
import { trpc } from '../../../../utils/trpc';
import { useState } from 'react';
import Button from '../../../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/Select';
import { useRouter } from 'next/router';

export const CreatePanel = () => {
	const [open, setOpen] = useState(false);
	const { query } = useRouter();
	const id = query.props ? query.props[0] : null;

	const { mutate } = trpc.panels.create.useMutation();
	const { data: tags } = trpc.tags.all.useQuery({ type: 'PANEL' });
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
				onSubmit={(values, { setSubmitting }) => {
					mutate(values, {
						onSuccess: () => {
							setOpen(false);
							refetch();
						}
					});
				}}
			>
				{({ isValid, isSubmitting, setFieldValue }) => (
					<Form>
						<TextInput name='name' label='Name' />
						<TextInput name='description' label='Description' />

						<fieldset className='mb-[15px] flex items-center gap-5'>
							<label className='w-[90px] text-right text-[15px] text-gray-500' htmlFor='tags'>
								Tag
							</label>
							<Select
								onValueChange={(e) => {
									setFieldValue('tagId', e);
								}}
							>
								<SelectTrigger name='tagId'>
									<SelectValue placeholder='Select a Tag' />
								</SelectTrigger>
								<SelectContent>
									{tags?.map((tag) => (
										<SelectItem key={tag.id} value={tag.id}>
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

export default CreatePanel;
