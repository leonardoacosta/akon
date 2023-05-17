import Button from 'components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/Card';
import { TextInput } from 'components/ui/TextInput';
import { Form, Formik } from 'formik';
import { formatDayOfWeek } from 'lib/utils';
import { useRouter } from 'next/router';
import { trpc } from 'utils/trpc';

export const AvailabilityInfo = () => {
	const { query, back } = useRouter();
	const id = query.props ? query.props[0] : null;
	const { data, refetch } = trpc.availability.byId.useQuery(id as string, { enabled: !!id });
	const { mutate } = trpc.availability.update.useMutation();

	if (!data) return null;
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<h1 className='text-2xl font-bold text-gray-300'>{formatDayOfWeek(data?.startTime)}</h1>
				</CardTitle>
				<CardDescription>
					<p className='text-gray-300'>{formatDayOfWeek(data?.startTime)}</p>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Formik
					initialValues={data}
					onSubmit={async (values) => {
						mutate(
							{
								availability: values,
								id: data.id
							},
							{
								onSuccess: () => {
									refetch();
									back();
								}
							}
						);
					}}
				>
					{({ values, handleChange, handleBlur, handleSubmit, isValid, isSubmitting }) => (
						<Form onSubmit={handleSubmit}>
							<TextInput name='date' label='Date' type='date' />
							<TextInput name='start' label='Start' type='time' />
							<TextInput name='end' label='End' type='time' />
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
	);
};

export default AvailabilityInfo;
