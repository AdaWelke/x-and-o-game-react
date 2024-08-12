import { useState } from 'react';

export default function Player({ initialName, symbol, handleNameChange, isActive }) {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		if (isEditing) {
			handleNameChange(playerName, symbol);
		}
		setIsEditing(current => !current);
	};

	const handleNameEdit = event => {
		setPlayerName(event.target.value);
	};

	const playerNameOrEdit = !isEditing ? (
		<span className='player-name'>{initialName}</span>
	) : (
		<input type='text' required value={playerName} onChange={handleNameEdit} />
	);

	return (
		<li className={isActive ? 'active' : undefined}>
			<span className='player'>
				{playerNameOrEdit}
				<span className='player-symbol'>{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
		</li>
	);
}
