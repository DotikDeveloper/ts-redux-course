import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const TodoList: FC = () => {
	const {
		page,
		limit,
		todos,
		loading,
		error
	} = useTypedSelector(state => state.todo)
	
	const {fetchTodos, setTodoPage} = useActions()
	
	const pages = [1, 2, 3, 4, 5]
	
	useEffect(() => {
		fetchTodos(page, limit)
	}, [page])
	
	if (loading) {
		return <h1>Loading...</h1>
	}
	
	if (error) {
		return <h1>{error}</h1>
	}
	
	return (
		<div style={{margin: 25}}>
			{
				todos.map(todo =>
					<div key={todo.id}>{todo.id} - {todo.title}</div>
				)
			}
			{
				pages.map((p, idx) =>
					<div key={idx} style={{display: 'inline-flex', margin: 5}}>
						<div
							onClick={() => setTodoPage(p)}
							style={{border: p === page ? '2px solid green' : '1px solid grey', padding: 10}}
						>
							{p}
						</div>
					</div>

				)
			}
		</div>
	);
};

export default TodoList;