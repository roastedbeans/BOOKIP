import * as React from 'react';
import { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { expenseForm } from '@/formValue';
import { HotelInfo, host } from '@/Posts';
import MonthSelection from './MonthSelection';
import axios from 'axios';
import { BiInfoCircle } from 'react-icons/bi';

export default function ExpensesForm() {
	const [expenseInfo, setExpenseInfo] = useState(expenseForm);
	const [existingData, setExistingData] = useState();
	const registrationID = HotelInfo().id;

	const onReset = () => {
		setExpenseInfo(expenseForm);
	};
	const onHandleChange = (e) => {
		if (e.target.id === 'date') {
			// Check if there's existing data with the same date
			const findData = existingData.find((data) => data.date === e.target.value);
			if (findData) {
				setExpenseInfo(findData);
			} else {
				setExpenseInfo(expenseForm);
			}
			return;
		}

		setExpenseInfo({
			...expenseInfo,
			[e.target.id]: e.target.value,
			registrationID: registrationID,
		});
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(`${host}/expenses/${registrationID}/${expenseInfo.date}`);
				setExistingData(response.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, [registrationID, expenseInfo.date]);

	const onSubmit = async (e) => {
		e.preventDefault();

		if (existingData) {
			// If data exists, update it
			const updateResponse = await axios.put(`${host}/expenses/date/${expenseInfo.date}`, expenseInfo);
			console.log(updateResponse.data);
		}
		const totalExpenses =
			parseFloat(expenseInfo.operationalExpenses) +
			parseFloat(expenseInfo.personnelCosts) +
			parseFloat(expenseInfo.marketingPromotions) +
			parseFloat(expenseInfo.guestServices) +
			parseFloat(expenseInfo.propertyInvestments);

		const updateIncome = await axios.put(`${host}/incomes/date/${expenseInfo.date}`, { expenses: totalExpenses });
		setExpenseInfo(expenseForm);
		window.location.reload();
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className='bg-darkColor md:text-sm text-xs' type='button'>
					Add&#160;Expenses
				</Button>
			</PopoverTrigger>
			<PopoverContent align='start' side='top' className='xs:w-72 w-fit items-center justify-center xs:block flex'>
				<form onSubmit={onSubmit}>
					<div className='flex flex-col w-full items-center gap-2'>
						<MonthSelection onSelectDate={onHandleChange} />
						<div className='flex w-full flex-col space-y-1 '>
							<Label htmlFor='operationalExpenses' className='items-center flex gap-1'>
								Operational Expenses
								<Popover>
									<PopoverTrigger type='button'>
										<BiInfoCircle />
									</PopoverTrigger>
									<PopoverContent align='start' side='top' className='bg-darkColor py-1 w-48 flex text-center'>
										<p className='text-xs text-gray-400'>e.g. rent, electricity, water, internet, insurance, etc.</p>
									</PopoverContent>
								</Popover>
							</Label>
							<Input
								id='operationalExpenses'
								name='operationalExpenses'
								type='number'
								placeholder='Enter monthly expenses'
								value={expenseInfo.operationalExpenses || ''}
								required
								onChange={onHandleChange}
							/>
						</div>
						<div className='flex w-full flex-col space-y-1'>
							<Label htmlFor='personnelCosts' className='items-center flex gap-1'>
								Personnel Costs
								<Popover>
									<PopoverTrigger type='button'>
										<BiInfoCircle />
									</PopoverTrigger>
									<PopoverContent align='start' side='top' className='bg-darkColor py-1 w-48 flex text-center'>
										<p className='text-xs text-gray-400'>e.g. salaries, wages, benefits, payroll taxes, etc.</p>
									</PopoverContent>
								</Popover>
							</Label>
							<Input
								id='personnelCosts'
								name='personnelCosts'
								type='number'
								placeholder='Enter monthly expenses'
								value={expenseInfo.personnelCosts || ''}
								required
								onChange={onHandleChange}
							/>
						</div>
						<div className='flex w-full flex-col space-y-1'>
							<Label htmlFor='marketingPromotions' className='items-center flex gap-1'>
								Marketing and Promotion
								<Popover>
									<PopoverTrigger type='button'>
										<BiInfoCircle />
									</PopoverTrigger>
									<PopoverContent align='start' side='top' className='bg-darkColor py-1 w-48 flex text-center'>
										<p className='text-xs text-gray-400'>e.g. website, advertisement, etc.</p>
									</PopoverContent>
								</Popover>
							</Label>
							<Input
								id='marketingPromotions'
								name='marketingPromotions'
								type='number'
								placeholder='Enter monthly expenses'
								value={expenseInfo.marketingPromotions || ''}
								required
								onChange={onHandleChange}
							/>
						</div>
						<div className='flex w-full flex-col space-y-1'>
							<Label htmlFor='guestServices' className='items-center flex gap-1'>
								Guest Services
								<Popover>
									<PopoverTrigger type='button'>
										<BiInfoCircle />
									</PopoverTrigger>
									<PopoverContent align='start' side='top' className='bg-darkColor py-1 w-48 flex text-center'>
										<p className='text-xs text-gray-400'>e.g. toiletries, bed linens, complimentaries, etc.</p>
									</PopoverContent>
								</Popover>
							</Label>
							<Input
								id='guestServices'
								name='guestServices'
								type='number'
								placeholder='Enter monthly expenses'
								value={expenseInfo.guestServices || ''}
								required
								onChange={onHandleChange}
							/>
						</div>
						<div className='flex w-full flex-col space-y-1'>
							<Label htmlFor='propertyInvestments' className='items-center flex gap-1'>
								Property Investments
								<Popover>
									<PopoverTrigger type='button'>
										<BiInfoCircle />
									</PopoverTrigger>
									<PopoverContent align='start' side='top' className='bg-darkColor py-1 w-48 flex text-center'>
										<p className='text-xs text-gray-400'>e.g. renovations, furniture, and appliances, etc.</p>
									</PopoverContent>
								</Popover>
							</Label>
							<Input
								id='propertyInvestments'
								name='propertyInvestments'
								type='number'
								placeholder='Enter monthly expenses'
								value={expenseInfo.propertyInvestments || ''}
								required
								onChange={onHandleChange}
							/>
						</div>
					</div>
					<div className='flex justify-between mt-4'>
						<Button onClick={onReset} type='button' variant='outline'>
							Reset
						</Button>
						<Button type='submit' className='bg-darkColor'>
							Add
						</Button>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	);
}
