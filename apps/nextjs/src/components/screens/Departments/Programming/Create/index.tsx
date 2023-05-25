import Modal from 'components/ui/Modal';
import { TextInput } from 'components/ui/TextInput';
import { Form, Formik } from 'formik';
import { trpc } from 'utils/trpc';
import { useEffect, useState } from 'react';
import Button from 'components/ui/Button';
import { Departments } from '@acme/api/src/router/users';

export const AddToProgramming = () => {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState('');
	const {
		data: userFound,
		refetch: refetchUsers,
		isSuccess
	} = trpc.users.checkIfUserExists.useQuery({ email: email }, { enabled: email.includes('@') });
	const { refetch } = trpc.users.all.useQuery({ department: 'isProgramming' });
	const { mutate, isLoading, error } = trpc.users.addToDepartment.useMutation({
		onSuccess: () => {
			refetch();
		}
	});

	const initialValues = {
		email: '',
		phoneNumber: '',
		department: 'isProgramming' as Departments
	};

	useEffect(() => {
		if (email.includes('@')) refetchUsers();
	}, [email, userFound]);

	return (
		<Modal
			buttonLabel='Add Volunteer'
			modalTitle='Add Volunteer to Programming'
			modalDescription='This volunteer will be added to the Programming department'
			open={open}
			setOpen={setOpen}
		>
			<Formik
				initialValues={initialValues}
				validate={(values) => {
					const errors: any = {};
					if (!values.email) errors.email = 'Required';
					if (values.email) if (!values.email.includes('@')) errors.email = 'Must be a valid email';
					if (!values.phoneNumber && !userFound) errors.phoneNumber = 'Required';

					setEmail(values.email);

					return errors;
				}}
				validateOnBlur
				validateOnChange
				validateOnMount
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					mutate(values, {
						onSuccess: () => {
							refetch();
							setSubmitting(false);
							setOpen(false);
						},
						onError: () => {
							setSubmitting(false);
						}
					});
				}}
			>
				{({ isValid, isSubmitting, errors }) => (
					<Form>
						<TextInput name='email' label='Email' />
						{!userFound && <TextInput name='phoneNumber' label='Cell Phone' />}
						<div className='flex flex-col items-end'>
							<label className='text-right'>
								{isSuccess ? (
									userFound ? (
										<sup>Email found!</sup>
									) : (
										<sup className='block pt-2'>Email not found, We'll invite them to join this portal!</sup>
									)
								) : (
									''
								)}
							</label>
							{error && <label className='block text-right text-red-500'>{error.message}</label>}
						</div>
						<div className='mt-[25px] flex justify-end'>
							<Button onClick={() => setOpen(true)} disabled={!isValid || isSubmitting} loading={isSubmitting}>
								{userFound ? 'Add' : 'Invite'}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default AddToProgramming;
