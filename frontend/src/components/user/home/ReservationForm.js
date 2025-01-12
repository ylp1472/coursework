import React, { useState } from 'react';
import axios from 'axios';

function ReservationForm() {
	const [formData, setFormData] = useState({
		email: '',
		phone: '',
		personCount: 1,
		date: '',
		startTime: '',
		endTime: '',
		status: 'Pending'
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axios.post('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/reservations/create', formData)
			.then((res) => {
				console.log('Reservation Created:', res.data);
				alert('Reservation created successfully');
			})
			.catch((err) => {
				console.error('Reservation Creation Error:', err);
				alert('Failed to create reservation');
			});

		console.log('Reservation Details:', formData);
	};

	return (
		<div className="w-full flex flex-col items-center">
			<div className="h-36 w-36 flex items-center justify-center border-8 border-zinc-50 bg-red-500 text-white rounded-full z-[5]">
				<svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-tools-kitchen-2">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3" />
				</svg>
			</div>

			<div className="w-full flex flex-col justify-center py-16 px-10 pt-28 rounded bg-zinc-50 mt-[-4.5rem] shadow-xl">
				<form
					className="w-full flex flex-col gap-14"
					onChange={handleChange}
					onSubmit={handleSubmit}
				>
					<h4 className="text-3xl font-bold text-center">Reserve a Table</h4>

					<div className="w-full flex flex-col items-center justify-center gap-8">
						<input
							type="email"
							name="email"
							placeholder="Email Address"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
							required
						/>

						<input
							type="tel"
							name="phone"
							placeholder="Phone Number"
							maxLength={10}
							value={formData.phone}
							onChange={handleChange}
							className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
							required
						/>

						<input
							type="number"
							name="personCount"
							placeholder="Person Count"
							min={1}
							max={10}
							value={formData.personCount}
							onChange={handleChange}
							className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
							required
						/>

						<input
							type="date"
							name="date"
							placeholder="Reservation Date"
							value={formData.date}
							onChange={handleChange}
							className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
							required
						/>

						<div className="w-full flex flex-row items-center justify-between gap-5">
							<select
								name="startTime"
								className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
								value={formData.startTime}
								onChange={handleChange}
							>
								<option value="" disabled>Start Time</option>
								<option value="8:00 AM">8:00 AM</option>
								<option value="9:00 AM">9:00 AM</option>
								<option value="10:00 AM">10:00 AM</option>
								<option value="11:00 AM">11:00 AM</option>
								<option value="12:00 PM">12:00 PM</option>
								<option value="1:00 PM">1:00 PM</option>
								<option value="2:00 PM">2:00 PM</option>
								<option value="3:00 PM">3:00 PM</option>
								<option value="4:00 PM">4:00 PM</option>
								<option value="5:00 PM">5:00 PM</option>
								<option value="6:00 PM">6:00 PM</option>
								<option value="7:00 PM">7:00 PM</option>
								<option value="8:00 PM">8:00 PM</option>
							</select>

							to

							<select
								name="endTime"
								className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
								value={formData.endTime}
								onChange={handleChange}
							>
								<option value="" disabled>End Time</option>
								<option value="9:00 AM">9:00 AM</option>
								<option value="10:00 AM">10:00 AM</option>
								<option value="11:00 AM">11:00 AM</option>
								<option value="12:00 PM">12:00 PM</option>
								<option value="1:00 PM">1:00 PM</option>
								<option value="2:00 PM">2:00 PM</option>
								<option value="3:00 PM">3:00 PM</option>
								<option value="4:00 PM">4:00 PM</option>
								<option value="5:00 PM">5:00 PM</option>
								<option value="6:00 PM">6:00 PM</option>
								<option value="7:00 PM">7:00 PM</option>
								<option value="8:00 PM">8:00 PM</option>
								<option value="9:00 PM">9:00 PM</option>
							</select>
						</div>
					</div>

					<div className="w-full flex flex-row items-center justify-center gap-4">
						<button className="w-fit flex flex-row items-center justify-center gap-3 px-10 text-xs uppercase bg-red-600 hover:bg-red-500 text-white font-medium p-2.5 rounded hover:shadow-xl duration-200">
							Book Now
							<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M9 6l6 6l-6 6" />
							</svg>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ReservationForm;