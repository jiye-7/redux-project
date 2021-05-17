import { createStore } from 'redux';

const add = document.querySelector('#add');
const minus = document.querySelector('#minus');
const number = document.querySelector('span');

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";

// data를 수정하는 유일한 곳!
const countModifier = (count = 0, action) => {
  // action을 통해서 count를 증가, 감소시킬 수 있다.
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  console.log(countStore.getState());
  number.innerText = countStore.getState();
}

countStore.subscribe(onChange); // subscribe는 store안에 있는 변화들을 알 수 있게 해 준다.

add.addEventListener('click', () => {
  countStore.dispatch({ type: ADD })
});

minus.addEventListener('click', () => {
  countStore.dispatch({ type: MINUS })
});
