import React, { useState } from 'react';
import SimpleModal from './components/SimpleModal';
import { MdOutlineDeleteForever } from "react-icons/md";

const App = () => {
	const [activities, setActivities] = useState([]);
	const [modalInfoIsOpen, setModalInfoOpen] = useState(false);

	const deleteActivity = (id) => {
		setActivities(activities.filter((element) => element.id !== id));
	};

	const onDragStart = (e, id) => {
		e.dataTransfer.setData('id', id);
	};

	const onDragOver = (e) => {
		e.preventDefault();
	};

	const onDrop = (e, status) => {
		const id = e.dataTransfer.getData('id');
		const updatedActivities = activities.map((activity) => {
			if (activity.id.toString() === id) {
				return { ...activity, status: status };
			}
			return activity;
		});
		setActivities(updatedActivities);
	};

	const getRandomActivity = async () => {
		try {
			const response = await fetch('https://www.boredapi.com/api/activity');
			const data = await response.json();
			const newActivity = {
				id: activities.length + 1,
				activity: data.activity,
				type: data.type,
				participants: data.participants,
				price: data.price,
				link: data.link,
				key: data.key,
				accessibility: data.accessibility,
				status: 'To do',
			};
			setActivities([...activities, newActivity]);
		} catch (error) {
			console.error('Error fetching random activity:', error);
		}
	};

	return (
		<div>
			<header className='h1'>Kanban Board</header>
			<div className='button-block'>
				<button className='btn btn-primary' onClick={getRandomActivity}>
					Get Random Activity
				</button>
			</div>
			<div className='container'>
				<div
					onDragOver={onDragOver}
					onDrop={(e) => onDrop(e, 'To do')}
					className='board'
				>
					<h2>To do</h2>
					{activities
						.filter((activity) => activity.status === 'To do')
						.map((activity) => (
							<div key={activity.id} draggable onDragStart={(e) => onDragStart(e, activity.id)}>
								<div className='card'>
									<h4 className='card-title'>{activity.activity} </h4>
									<p className='card-text'>Type: {activity.type}</p>
									<p className='card-text'>Participants: {activity.participants}</p>
									<p className='card-text'>Price: {activity.price}</p>
									<p className='card-text'>Link: {activity.link}</p>
									<p className='card-text'>Key: {activity.key}</p>
									<p className='card-text'>Accessibility: {activity.accessibility}</p>
									<MdOutlineDeleteForever className='delete-image' onClick={() => setModalInfoOpen(true)} />
									<SimpleModal isOpen={modalInfoIsOpen} onClose={() => setModalInfoOpen(false)}>
										<p className='text-center model-text'>Delete activity?</p>
										<div className='buttons'>
											<button className='delete-button btn btn-success' onClick={() => deleteActivity(activity.id)}>
												Yes
											</button>
											<button className='delete-button btn btn-danger' onClick={() => setModalInfoOpen(false)}>
												No
											</button>
										</div>
									</SimpleModal>
								</div>
							</div>
						))}
				</div>
				<div
					onDragOver={onDragOver}
					onDrop={(e) => onDrop(e, 'In progress')}
					className='board'
				>
					<h2>In progress</h2>
					{activities
						.filter((activity) => activity.status === 'In progress')
						.map((activity) => (
							<div key={activity.id} draggable onDragStart={(e) => onDragStart(e, activity.id)}>
								<div className='card'>
									<h4 className='card-title'>{activity.activity}</h4>
									<p className='card-text'>Type: {activity.type}</p>
									<p className='card-text'>Participants: {activity.participants}</p>
									<p className='card-text'>Price: {activity.price}</p>
									<p className='card-text'>Link: {activity.link}</p>
									<p className='card-text'>Key: {activity.key}</p>
									<p className='card-text'>Accessibility: {activity.accessibility}</p>
									<MdOutlineDeleteForever className='delete-image' onClick={() => setModalInfoOpen(true)} />
									<SimpleModal isOpen={modalInfoIsOpen} onClose={() => setModalInfoOpen(false)}>
										<p className='text-center model-text'>Delete activity?</p>
										<div className='buttons'>
											<button className='delete-button btn btn-success' onClick={() => deleteActivity(activity.id)}>
												Yes
											</button>
											<button className='delete-button btn btn-danger' onClick={() => setModalInfoOpen(false)}>
												No
											</button>
										</div>
									</SimpleModal>
								</div>
							</div>
						))}
				</div>
				<div onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'Done')} className='board l'>
					<h2>Done</h2>
					{activities
						.filter((activity) => activity.status === 'Done')
						.map((activity) => (
							<div key={activity.id} draggable onDragStart={(e) => onDragStart(e, activity.id)}>
								<div className='card'>
									<h4 className='card-title'>{activity.activity}</h4>
									<p className='card-text'>Type: {activity.type}</p>
									<p className='card-text'>Participants: {activity.participants}</p>
									<p className='card-text'>Price: {activity.price}</p>
									<p className='card-text'>Link: {activity.link}</p>
									<p className='card-text'>Key: {activity.key}</p>
									<p className='card-text'>Accessibility: {activity.accessibility}</p>
									<MdOutlineDeleteForever className='delete-image' onClick={() => setModalInfoOpen(true)} />
									<SimpleModal isOpen={modalInfoIsOpen} onClose={() => setModalInfoOpen(false)}>
										<p className='text-center model-text'>Delete activity?</p>
										<div className='buttons'>
											<button className='delete-button btn btn-success' onClick={() => deleteActivity(activity.id)}>
												Yes
											</button>
											<button className='delete-button btn btn-danger' onClick={() => setModalInfoOpen(false)}>
												No
											</button>
										</div>
									</SimpleModal>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default App;
