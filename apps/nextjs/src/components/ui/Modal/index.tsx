import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Button from '../Button';

const Modal = ({ buttonLabel, modalTitle, modalDescription, children, open, setOpen }: ModalProps) => {
	return (
		<Dialog.Root open={open}>
			<Dialog.Trigger asChild>
				<Button onClick={() => setOpen(true)} secondary>
					{buttonLabel}
				</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='data-[state=open]:animate-overlayShow fixed inset-0 bg-black/25' />
				<Dialog.Content className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
					<Dialog.Title className='m-0 text-[17px] font-medium text-gray-900'>{modalTitle}</Dialog.Title>
					<Dialog.Description className='mt-[10px] mb-5 text-[15px] leading-normal text-gray-600'>
						{modalDescription}
					</Dialog.Description>
					{children}
					<Dialog.Close asChild onClick={() => setOpen(false)}>
						<button
							className='absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-gray-900 hover:bg-sky-200 focus:shadow-[0_0_0_2px] focus:shadow-sky-900 focus:outline-none'
							aria-label='Close'
						>
							<Cross2Icon />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

interface ModalProps {
	buttonLabel: React.ReactNode;
	modalTitle: React.ReactNode;
	modalDescription?: React.ReactNode;
	children: React.ReactNode | React.ReactNode[];
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export default Modal;
