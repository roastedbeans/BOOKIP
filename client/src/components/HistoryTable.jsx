import React, { useState } from 'react';
import { CaretSortIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookingInfo } from '@/Posts';
import { format } from 'date-fns';
import FlipCountdown from '@rumess/react-flip-countdown';

const columns = [
	{
		accessorKey: 'roomName',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Room
					<CaretSortIcon className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <div className='ml-4'>{row.getValue('roomName')}</div>,
	},
	{
		accessorKey: 'customerName',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Name
					<CaretSortIcon className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <div className='text-start ml-4'>{row.getValue('customerName')}</div>,
	},
	{
		accessorKey: 'customerPhone',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Contact&#160;#
					<CaretSortIcon className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <div className='text-start ml-4'>{row.getValue('customerPhone')}</div>,
	},
	{
		accessorKey: 'checkInDate',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Check&#8209;in&#160;Date
					<CaretSortIcon className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='text-start ml-4'>{format(new Date(row.getValue('checkInDate') || new Date()), 'PP')}</div>
		),
	},
	{
		accessorKey: 'checkOutDate',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Check&#8209;out&#160;Date
					<CaretSortIcon className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='text-start ml-4'>{format(new Date(row.getValue('checkOutDate') || new Date()), 'PP')}</div>
		),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			return <div className='text-start'>{row.getValue('status') ? 'Booked' : 'Vacant'}</div>;
		},
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return (
				<Button
					className='w-full justify-end'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Total&#160;Payment
					<CaretSortIcon className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const price = parseFloat(row.getValue('price'));

			// Format the price as a pesos value.
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'PHP',
			}).format(price);

			return <div className='text-right font-medium mr-6'>{formatted}</div>;
		},
	},
];

export default function ExpensesTable() {
	const data = BookingInfo();

	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	});

	return (
		<div className='w-full'>
			<div className='flex items-center py-4'>
				<Input
					placeholder='Filter name...'
					value={table.getColumn('customerName')?.getFilterValue() || ''}
					onChange={(event) => table.getColumn('customerName')?.setFilterValue(event.target.value)}
					className='max-w-sm'
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
							Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={(value) => column.toggleVisibility(!!value)}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 py-4'>
				<div className='space-x-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
