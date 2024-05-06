import React from 'react';
import { TiDeleteOutline } from "react-icons/ti";

export const SimpleModal = ({ isOpen, onClose, children }) => {
	return (
		<>
			{isOpen && (
				<div className='model'>
					<div className='model-wrapper'>
						<div className='model-content'>
							<TiDeleteOutline onClick={() => onClose()} className='delete-icon'/>
							{children}
						</div>
					</div>
				</div>
			)
			}
		</>
	)
}
export default SimpleModal