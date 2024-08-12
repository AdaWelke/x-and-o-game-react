import { useState } from 'react';

export default function Player({ initialName, symbol, onNameChange }) {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		if (isEditing) {
			onNameChange(playerName, symbol);
		}
		setIsEditing(current => !current);
	};

	const handleNameChange = event => {
		setPlayerName(event.target.value);
	};

	const playerNameOrEdit = !isEditing ? (
		<span className='player-name'>{initialName}</span>
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
