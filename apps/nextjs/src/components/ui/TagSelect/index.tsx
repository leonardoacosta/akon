import { trpc } from 'utils/trpc';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select';
import { useFormikContext } from 'formik';

export const TagSelect = ({ tagType }: TagSelectProps) => {
	const { data: tags } = trpc.tags.all.useQuery({ type: tagType });
	const { setFieldValue } = useFormikContext();

	return (
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
	);
};
export interface TagSelectProps {
	tagType: 'PANEL' | 'GROUP';
}

export default TagSelect;
