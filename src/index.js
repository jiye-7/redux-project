import { createStore } from 'redux';
const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// addToDo, deleteToDo function은 오로지 action을 dispatch하기 위한 용도로 둔다. --> object를 리턴하는 것일뿐!
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text
  }
}

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}

// state를 mutate하지 않는다. 새로운 state를 만들어야된다.
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    //return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== parseInt(action.id));
    default:
      return state;
  }
}

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
}

const dispatchDeleteToDo = (e) => {
  const id = e.target.parentNode.id; // reducer에서 parseInt안 하고 여기서 parseInt(e.target.parentNode.id)하는 것도 괜찮음
  store.dispatch(deleteToDo(id));
}

const paintTodo = () => {
  const toDos = store.getState();
  ul.innerHTML = '';
  toDos.forEach((toDo) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    li.id = toDo.id;
    li.innerText = toDo.text;
    btn.innerText = 'DEL';
    btn.addEventListener('click', dispatchDeleteToDo);
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

// toDo의 변화에 맞게 list를 reponating한다.
store.subscribe(paintTodo);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  dispatchAddToDo(toDo);
}

form.addEventListener('submit', onSubmit);