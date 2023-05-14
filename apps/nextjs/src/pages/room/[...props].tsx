import Layout from 'components/Layout';
import Button from 'components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/Card';
import { TextInput } from 'components/ui/TextInput';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { trpc } from 'utils/trpc';

export const Room = () => {
	const { query } = useRouter();
	const id = query.props ? query.props[0] : null;
	const { data, refetch } = trpc.room.byId.useQuery(id as string, { enabled: !!id });
	const { mutate } = trpc.room.update.useMutation();

	if (!data) return null;

	return (
		<Layout>
			<div className='grid grid-cols-2 gap-4'>
				<Card>
					<CardHeader>
						<CardTitle>
							<h1 className='text-2xl font-bold text-gray-300'>{data?.name}</h1>
						</CardTitle>
						<CardDescription>
							<p className='text-gray-300'>{data?.description}</p>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Formik
							initialValues={data}
							onSubmit={async (values) => {
								mutate(
									{
										room: values,
										id: data.id
									},
									{
										onSuccess: () => {
											refetch();
										}
									}
								);
							}}
						>
							{({ values, handleChange, handleBlur, handleSubmit, isValid }) => (
								<Form onSubmit={handleSubmit}>
									<TextInput name='name' label='Name' />
									<TextInput name='description' label='Description' />
									<TextInput name='capacity' label='Capacity' type='number' />
									<div className='mt-[25px] flex justify-end'>
										<Button disabled={!isValid}>Save</Button>
									</div>
								</Form>
							)}
						</Formik>
					</CardContent>
				</Card>
				<Card>{/* <CreateRoom /> */}</Card>
				<div className=''></div>
			</div>
		</Layout>
	);
};

export default Room;
