import React, { useEffect, useState } from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { IncomeInfoByRegistrationID, HotelInfo } from '@/Posts';

export default function MonthSelection({ onSelectDate }) {
	const hotelInfo = HotelInfo();
	const incomeInfo = IncomeInfoByRegistrationID(hotelInfo.id);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	const [months, setMonths] = useState([]);

	useEffect(() => {
		incomeInfo.forEach((income) => {
			if (!months.find((month) => month.value === income.date)) {
				setMonths([...months, { label: income.date, value: income.date }]);
			}
		});
	}, [incomeInfo]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline' role='combobox' aria-expanded={open} className='w-fit justify-between self-start'>
					{value ? months?.find((month) => month.value === value)?.label : 'Select month...'}
					<CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0' align='start'>
				<Command>
					<CommandInput placeholder='Search month...' className='h-9' />
					<CommandEmpty>No month found.</CommandEmpty>
					<CommandGroup>
						{months.map((month) => (
							<CommandItem
								key={month.value}
								onSelect={(currentValue) => {
									setValue(currentValue === value ? '' : currentValue);
									setOpen(false);
									onSelectDate({ target: { id: 'date', value: currentValue === value ? '' : currentValue } });
								}}
							>
								{month.label}
								<CheckIcon className={cn('ml-auto h-4 w-4', value === month.value ? 'opacity-100' : 'opacity-0')} />
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
