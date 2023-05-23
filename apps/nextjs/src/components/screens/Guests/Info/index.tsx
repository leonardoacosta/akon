import Button from 'components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/Card';
import TagSelect from 'components/ui/TagSelect';
import { TextInput } from 'components/ui/TextInput';
import { Form, Formik } from 'formik';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { trpc } from 'utils/trpc';

export const GuestInfo = () => {
	const { query, back } = useRouter();
	const id = query.props ? query.props[0] : null;
	const { data, refetch } = trpc.groups.byId.useQuery(id as string, { enabled: !!id });
	const { mutate } = trpc.groups.update.useMutation();

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
						initialValues={data}
						onSubmit={async (values) => {
							mutate(
								{
									group: values,
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
								<TagSelect tagType='GROUP' />
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

export default GuestInfo;
