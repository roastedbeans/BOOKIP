import React, { useState, useEffect } from 'react';
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HotelInfo, IncomeInfoByRegistrationID, IncomeTableContent } from '@/Posts';
import TaxesForm from './TaxForm';
const columns = [
	{
		accessorKey: 'period',
		header: 'Period',
		cell: ({ row }) => <div className='capitalize'>{row.getValue('period')}</div>,
	},
	{
		accessorKey: 'year',
		header: ({ column }) => {
			return (
				<Button
					className='justify-center w-full'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Year
					<CaretSortIcon className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <div className='text-center'>{row.getValue('year')}</div>,
	},
	{
		accessorKey: 'income',
		header: () => <div className='text-right'>Income</div>,
		cell: ({ row }) => {
			const income = parseFloat(row.getValue('income'));

			// Format the income as a pesos value.
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'PHP',
			}).format(income);

			return <div className='text-right font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'expenses',
		header: () => <div className='text-right'>Expenses</div>,
		cell: ({ row }) => {
			const expenses = parseFloat(row.getValue('expenses'));

			// Format the expenses as a pesos value.
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'PHP',
			}).format(expenses);

			return <div className='text-right font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'beforeTax',
		header: () => <div className='text-right'>Net&#160;Income Before&#160;Tax</div>,
		cell: ({ row }) => {
			const beforeTax = parseFloat(row.getValue('beforeTax'));

			// Format the beforeTax as a pesos value.
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'PHP',
			}).format(beforeTax);

			return <div className='text-right font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'taxExpense',
		header: () => <div className='text-right'>Income&#160;Tax Expense</div>,
		cell: ({ row }) => {
			const taxExpense = parseFloat(row.getValue('taxExpense'));

			// Format the taxExpense as a pesos value.
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'PHP',
			}).format(taxExpense);

			return <div className='text-right font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'netIncome',
		header: () => <div className='text-right'>Net Income</div>,
		cell: ({ row }) => {
			const netIncome = parseFloat(row.getValue('netIncome'));

			// Format the netIncome as a pesos value.
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'PHP',
			}).format(netIncome);

			return <div className='text-right font-medium'>{formatted}</div>;
		},
	},
];

export default function IncomeTable() {
	const hotelInfo = HotelInfo();
	const incomeData = IncomeInfoByRegistrationID(hotelInfo.id);
	const data = IncomeTableContent(incomeData);
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
			<div className='flex xs:flex-row flex-col md:items-center items-start py-4 gap-4'>
				<Input
					placeholder='Filter period...'
					value={table.getColumn('period')?.getFilterValue() || ''}
					onChange={(event) => table.getColumn('period')?.setFilterValue(event.target.value)}
					className='max-w-sm'
				/>
				<TaxesForm />
				{/* <DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
							Period <ChevronDownIcon className='ml-2 h-4 w-4' />
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
				</DropdownMenu> */}
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
