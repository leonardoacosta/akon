import Button from 'components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/Card';
import { TextInput } from 'components/ui/TextInput';
import { Form, Formik } from 'formik';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { trpc } from 'utils/trpc';

export const RoomInfo = () => {
	const { query, back } = useRouter();
	const id = query.props ? query.props[0] : null;
	const { data, refetch } = trpc.room.byId.useQuery(id as string, { enabled: !!id });
	const { mutate } = trpc.room.update.useMutation();

	if (!data) return null;
	return (
		<div>
			<h2 className='pb-2 text-2xl font-bold text-white' onClick={back}>
				<ArrowLeft className='inline-block' /> Go Back
			</h2>
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
						validateOnMount
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
						{({ handleSubmit, isValid, isSubmitting }) => (
							<Form onSubmit={handleSubmit}>
								<TextInput name='name' label='Name' />
								<TextInput name='description' label='Description' />
								<TextInput name='capacity' label='Capacity' type='number' />
								<div className='mt-[25px] flex justify-end'>
									<Button disabled={!isValid || isSubmitting} loading={isSubmitting}>
										Save
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</CardContent>
			</Card>
		</div>
	);
};

export default RoomInfo;
