import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import { useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import Image from 'next/image';
import clsx from 'clsx';
import { RedirectToSignIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = [
	{ name: 'Dashboard', href: '/home', current: true },
	{ name: 'Guests', href: '/guests', current: false },
	{ name: 'Programming', href: '/programming', current: false },
	{ name: 'Vendors', href: '/vendors', current: false },
	{ name: 'Departments', href: '/departments', current: false },
	{ name: 'Settings', href: '/settings', current: false }
];
const teams = [
	{ id: 1, name: 'Volunteers', href: '#', initial: 'H', current: false },
	{ id: 2, name: 'Programming', href: '#', initial: 'T', current: false },
	{ id: 3, name: 'Workcation', href: '#', initial: 'W', current: false }
];

export default function Layout({ children }: { children: React.ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [redirect, setRedirect] = useState('');
	const { pathname } = useRouter();

	useEffect(() => {
		setRedirect(pathname);
	}, [pathname]);

	return (
		<>
			<SignedOut>
				<RedirectToSignIn afterSignInUrl={redirect} />
			</SignedOut>
			<div className='bg bg-slate-900'>
				{/* Sidebar for Mobile */}
				<Popover.Root>
					<Popover.Trigger className='PopoverTrigger'>More info</Popover.Trigger>
					<Popover.Portal>
						<Popover.Content className='PopoverContent' sideOffset={5}>
							Some more info…
							<Popover.Arrow className='PopoverArrow' />
						</Popover.Content>
					</Popover.Portal>

					{/* <Dialog as='div' className='relative z-50 lg:hidden' onClose={setSidebarOpen}>
						<Transition.Child
							as={Fragment}
							enter='transition-opacity ease-linear duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='transition-opacity ease-linear duration-300'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<div className='fixed inset-0 bg-gray-900/80' />
						</Transition.Child>

						<div className='fixed inset-0 flex'>
							<Transition.Child
								as={Fragment}
								enter='transition ease-in-out duration-300 transform'
								enterFrom='-translate-x-full'
								enterTo='translate-x-0'
								leave='transition ease-in-out duration-300 transform'
								leaveFrom='translate-x-0'
								leaveTo='-translate-x-full'
							>
								<Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
									<Transition.Child
										as={Fragment}
										enter='ease-in-out duration-300'
										enterFrom='opacity-0'
										enterTo='opacity-100'
										leave='ease-in-out duration-300'
										leaveFrom='opacity-100'
										leaveTo='opacity-0'
									>
										<div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
											<button type='button' className='-m-2.5 p-2.5' onClick={() => setSidebarOpen(false)}>
												<span className='sr-only'>Close sidebar</span>
												<XMarkIcon className='h-6 w-6 text-white' aria-hidden='true' />
											</button>
										</div>
									</Transition.Child>
									<div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2'>
										<div className='flex h-16 shrink-0 items-center'>
											<img
												className='h-8 w-auto'
												src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
												alt='Your Company'
											/>
										</div>
										<nav className='flex flex-1 flex-col'>
											<ul role='list' className='flex flex-1 flex-col gap-y-7'>
												<li>
													<ul role='list' className='-mx-2 space-y-1'>
														{navigation.map((item) => (
															<li key={item.name}>
																<a
																	href={item.href}
																	className={clsx(
																		item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
																		'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
																	)}
																>
																	<item.icon
																		className={clsx(
																			item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
																			'h-6 w-6 shrink-0'
																		)}
																		aria-hidden='true'
																	/>
																	{item.name}
																</a>
															</li>
														))}
													</ul>
												</li>
												<li>
													<div className='text-xs font-semibold leading-6 text-gray-400'>Your teams</div>
													<ul role='list' className='-mx-2 mt-2 space-y-1'>
														{teams.map((team) => (
															<li key={team.name}>
																<a
																	href={team.href}
																	className={clsx(
																		team.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
																		'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
																	)}
																>
																	<span
																		className={clsx(
																			team.current
																				? 'border-indigo-600 text-indigo-600'
																				: 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
																			'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium'
																		)}
																	>
																		{team.initial}
																	</span>
																	<span className='truncate'>{team.name}</span>
																</a>
															</li>
														))}
													</ul>
												</li>
											</ul>
										</nav>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog> */}
				</Popover.Root>

				{/* Static sidebar for desktop */}
				<div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className='flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-gradient-to-r from-slate-900/90 to-slate-900/20 px-6'>
						<div className='flex h-16 shrink-0 items-center'>
							<Image height={100} width={100} src='/logo.svg' alt='Akon logo' priority />
						</div>
						<nav className='flex flex-1 flex-col'>
							<ul role='list' className='flex flex-1 flex-col gap-y-7'>
								<li>
									<ul role='list' className='-mx-2 space-y-1'>
										{navigation.map((item) => (
											<li key={item.name}>
												<Link
													href={item.href}
													className={clsx(
														item.current ? 'bg-rose-600 text-white' : 'hover:text-white-600 text-white hover:bg-rose-600',
														'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
													)}
												>
													{/* <item.icon
														className={clsx(
															item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
															'h-6 w-6 shrink-0'
														)}
														aria-hidden='true'
													/> */}
													{item.name}
												</Link>
											</li>
										))}
									</ul>
								</li>
								<li>
									<div className='text-xs font-semibold leading-6 text-gray-400'>Staff Management</div>
									<ul role='list' className='-mx-2 mt-2 space-y-1'>
										{teams.map((team) => (
											<li key={team.name}>
												<a
													href={team.href}
													className={clsx(
														team.current ? 'bg-rose-600 text-white' : 'hover:text-white-600 text-white hover:bg-rose-600',
														'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
													)}
												>
													<span
														className={clsx(
															team.current
																? 'border-rose-600 text-rose-600'
																: 'border-gray-200 text-gray-400 group-hover:border-rose-600 group-hover:text-rose-600',
															'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium'
														)}
													>
														{team.initial}
													</span>
													<span className='truncate'>{team.name}</span>
												</a>
											</li>
										))}
									</ul>
								</li>
								<li className='-mx-6 mt-auto'></li>
							</ul>
						</nav>
					</div>
				</div>

				<div className='sticky top-0 z-40 flex items-center gap-x-6  px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
					<button type='button' className='-m-2.5 p-2.5 text-gray-700 lg:hidden' onClick={() => setSidebarOpen(true)}>
						<span className='sr-only'>Open sidebar</span>
						<HamburgerMenuIcon />
					</button>
					<div className='flex-1 text-sm font-semibold leading-6 text-gray-900'>Dashboard</div>
					<a href='#'>
						<span className='sr-only'>Your profile</span>
						<UserButton
							appearance={{
								elements: {
									userButtonAvatarBox: {
										width: '3rem',
										height: '3rem'
									}
								}
							}}
						/>
					</a>
				</div>

				<main className='lg:pl-72'>
					<div className='px-4 py-10 sm:px-6 lg:px-8 lg:py-6'>{children}</div>
				</main>
			</div>
		</>
	);
}
