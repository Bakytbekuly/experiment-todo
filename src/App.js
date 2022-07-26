import { useState, useRef, useEffect } from 'react';

import './App.css';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [date, setDate] = useState();

    const inputRef = useRef();
    useEffect(() => {
        setDate(new Date().toUTCString().split(' ').slice(0, 4).join(' '));
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef?.current?.focus();
        }
    }, [todoList]);

    const addNewTodo = () => {
        if (inputValue !== '') {
            setTodoList([
                ...todoList,
                {
                    id: new Date().toISOString(),
                    todoItem: inputValue,
                    todoDate: new Date().toUTCString(),

                    completed: false,
                },
            ]);
        }

        setInputValue('');
    };

    const handleOnKeyDownEnter = (e) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            addNewTodo();
        }
    };

    const deleteItemTodo = (id) => {
        setTodoList(
            todoList.filter((item) => {
                if (item.id !== id) {
                    return true;
                }
            })
        );
    };

    const handleCheckbox = (id) => {
        setTodoList(
            todoList.map((item) => {
                if (item.id == id) {
                    item.completed = !item.completed;
                }
                return item;
            })
        );
    };

    return (
        <div className="App">
            <p>{date}</p>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleOnKeyDownEnter}
                ref={inputRef}
            />
            <button onClick={addNewTodo} onKeyDown={handleOnKeyDownEnter}>
                Add todo
            </button>
            <div>
                {todoList.map((item) => (
                    <li key={item.id}>
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => handleCheckbox(item.id)}
                        />
                        <span>
                            <span>{item.todoItem}</span>
                            <span>
                                {item.todoDate.split(' ').slice(4, 5).join(' ')}
                            </span>
                        </span>

                        <button onClick={() => deleteItemTodo(item.id)}>
                            x
                        </button>
                    </li>
                ))}
            </div>
        </div>
    );
}

export default App;
