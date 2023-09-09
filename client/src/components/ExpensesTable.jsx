import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookingInfo } from '@/Posts';
import { format } from 'date-fns';

const HistoryTable = () => {
	const invoices = [];

	return (
		<div className='w-full h-screen'>
			<Table>
				<TableCaption>A list of all the expenses report.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className=''>Period</TableHead>
						<TableHead className=''>Year</TableHead>
						<TableHead className='text-right'>Income</TableHead>
						<TableHead className='text-right'>Expenses</TableHead>
						<TableHead className='text-right'>Net&#160;Income&#160;Before&#160;Tax</TableHead>
						<TableHead className='text-right'>Income&#160;Tax&#160;Expense</TableHead>
						<TableHead className='text-right'>Net&#160;Income</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className='w-full h-screen overflow-y-scroll grid grid-rows-7 justify-between items-start '>
					{invoices?.map((invoice) => (
						<TableRow key={invoice.id} className='w-full flex '>
							<TableCell className='font-medium'>{invoice.period}</TableCell>
							<TableCell className='font-medium'>{invoice.year}</TableCell>
							<TableCell className='text-right'>{invoice.income}</TableCell>
							<TableCell className='text-right'>{invoice.expenses}</TableCell>
							<TableCell className='text-right'>{invoice.beforeTax}</TableCell>
							<TableCell className='text-right'>{invoice.taxExpense}</TableCell>
							<TableCell className='text-right'>{invoice.netIncome}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default HistoryTable;
