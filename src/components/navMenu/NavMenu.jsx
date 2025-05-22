import './NavMenu.css';

function NavMenu() {
	return (
		<div id='navMenu-container'>
			<div className='secondary-icon'>
				<svg
					className='w-6 h-6 text-gray-800 dark:text-white'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					width='32'
					height='32'
					fill='none'
					viewBox='0 0 24 24'
				>
					<path
						stroke='currentColor'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5'
					/>
				</svg>
				<p className='small-text'>Home</p>
			</div>

			<div className='primary-icon'>
				<div className='only-svg'>
					<svg
						className='w-6 h-6 text-gray-800 dark:text-white'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						width='45'
						height='45'
						fill='none'
						viewBox='0 0 24 24'
					>
						<path stroke='#ffff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M8 18V6l8 6-8 6Z' />
					</svg>
				</div>
				<p className='small-text'>Train now</p>
			</div>

			<div className='secondary-icon'>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='30' height='30' fill='#272d29'>
					<path d='M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z' />
				</svg>

				<p className='small-text'>Profile</p>
			</div>
		</div>
	);
}

export default NavMenu;
