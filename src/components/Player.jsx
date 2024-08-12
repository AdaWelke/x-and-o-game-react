import { useState } from 'react';

export default function Player({ initialName, symbol }) {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		setIsEditing(current => !current);
	};

	const handleNameChange = event => {
		event.preventDefault();
		setPlayerName(event.target.value);
	};

	const playerNameOrEdit = !isEditing ? (
		<span className='player-name'>{playerName}</span>
	) : (
		<input type='text' required value={playerName} onChange={handleNameChange} />
	);

	return (
		<li>
			<span className='player'>
				{playerNameOrEdit}
				<span className='player-symbol'>{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
		</li>
	);
}
