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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HotelInfo, ExpenseInfoByRegistrationID } from '@/Posts';
import axios from 'axios';
import ExpensesForm from './ExpensesForm';

const columns = [
	{
		accessorKey: 'period',
		header: 'Period',
		cell: ({ row }) => {
			const months = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			];

			return <div className='capitalize'>{months[parseInt(row.getValue('period')) - 1]}</div>;
		},
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
		accessorKey: 'operationalExpenses',
		header: () => <div className='text-right'>Operational</div>,
		cell: ({ row }) => {
			const operationalExpenses = parseFloat(row.getValue('operationalExpenses'));

			// Format the operationalExpenses as a pesos value.
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'PHP',
			}).format(operationalExpenses);

			return <div className='text-right font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'personnelCosts',
		header: () => <div className='text-right'>Personnel</div>,
		cell: ({ row }) => {
			const personnelCosts = parseFloat(row.getValue('personnelCosts'));

			// Format the personnelCosts as a pesos value.
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'PHP',
			}).format(personnelCosts);

			return <div className='text-right font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'marketingPromotions',
		header: () => <div className='text-right'>Marketing</div>,
		cell: ({ row }) => {
			const marketingPromotions = parseFloat(row.getValue('marketingPromotions'));

			// Format the marketingPromotions as a pesos value.
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'PHP',
			}).format(marketingPromotions);

			return <div className='text-right font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'guestServices',
		header: () => <div className='text-right'>Guest&#160;Services</div>,
		cell: ({ row }) => {
			const guestServices = parseFloat(row.getValue('guestServices'));

			// Format the guestServices as a pesos value.
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'PHP',
			}).format(guestServices);

			return <div className='text-right font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'propertyInvestments',
		header: () => <div className='text-right'>Prop.&#160;Investments</div>,
		cell: ({ row }) => {
			const propertyInvestments = parseFloat(row.getValue('propertyInvestments'));

			// Format the propertyInvestments as a pesos value.
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'PHP',
			}).format(propertyInvestments);

			return <div className='text-right font-medium'>{formatted}</div>;
		},
	},
];

export default function ExpensesTable() {
	const hotelInfo = HotelInfo();
	const fetchData = ExpenseInfoByRegistrationID(hotelInfo.id);
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [data, setData] = useState([]);

	useEffect(() => {
		const newEntry = fetchData.map((entry) => {
			return {
				period: entry.date.split('-')[0],
				year: entry.date.split('-')[1],
				operationalExpenses: entry.operationalExpenses,
				personnelCosts: entry.personnelCosts,
				marketingPromotions: entry.marketingPromotions,
				guestServices: entry.guestServices,
				propertyInvestments: entry.propertyInvestments,
			};
		});

		setData(...data, newEntry);
	}, [fetchData]);

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
		<div className='w-full h-screen'>
			<div className='flex xs:flex-row flex-col md:items-center items-start py-4 gap-4'>
				<Input
					placeholder='Filter period...'
					value={table.getColumn('period')?.getFilterValue() || ''}
					onChange={(event) => table.getColumn('period')?.setFilterValue(event.target.value)}
					className='max-w-sm'
				/>
				<ExpensesForm />
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
