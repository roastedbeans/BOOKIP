import * as React from 'react';
import { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { incomeForm } from '@/formValue';
import { HotelInfo, host } from '@/Posts';
import axios from 'axios';
import { BiInfoCircle } from 'react-icons/bi';

export default function TaxesForm() {
	const [taxInfo, setTaxInfo] = useState(incomeForm);
	const hotelInfo = HotelInfo();

	const onReset = () => {
		setTaxInfo(incomeForm);
	};

	const onHandleChange = async (e) => {
		if (e.target.id === 'taxButton') {
			try {
				const response = await axios.get(`${host}/incomes/${hotelInfo.id}`);
				const fetchTax = response.data[0].tax;
				setTaxInfo({ ...taxInfo.tax, tax: fetchTax });
			} catch (err) {
				console.log(err);
			}
		} else {
			setTaxInfo({
				...taxInfo.tax,
				[e.target.id]: e.target.value,
			});
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (taxInfo.tax) {
			// If data exists, update it
			const updateResponse = await axios.put(`${host}/incomes/registration/${hotelInfo.id}`, { tax: taxInfo.tax });
			console.log(updateResponse.data);
		}

		setTaxInfo(incomeForm);
		window.location.reload();
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button id='taxButton' onClick={onHandleChange} className='bg-darkColor md:text-sm text-xs' type='button'>
					Income&#160;Tax&#160;Rate
				</Button>
			</PopoverTrigger>
			<PopoverContent align='start' side='top' className='xs:w-72 w-fit items-center justify-center xs:block flex'>
				<form onSubmit={onSubmit}>
					<h4></h4>
					<div className='flex flex-col w-full items-center gap-2'>
						<div className='flex w-full flex-col space-y-1 '>
							<Label htmlFor='tax' className='items-center flex gap-1'>
								Tax (%)
								<Popover>
									<PopoverTrigger type='button'>
										<BiInfoCircle />
									</PopoverTrigger>
									<PopoverContent align='start' side='top' className='bg-darkColor py-1 w-48 flex text-center'>
										<p className='text-xs text-gray-400'>Your tax payment based on income and tax rate.</p>
									</PopoverContent>
								</Popover>
							</Label>
							<Input
								id='tax'
								name='tax'
								type='number'
								placeholder='Enter annual tax rate'
								value={taxInfo.tax ?? ''}
								max={100}
								min={0}
								length={2}
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
							Set
						</Button>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	);
}
