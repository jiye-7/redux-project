import { createStore } from 'redux';

const add = document.querySelector('#add');
const minus = document.querySelector('#minus');
const number = document.querySelector('span');

// reducer는 data를 modify한다.
// data를 바꾸고, 변경하는 것을 책임진다. reducer가 return하는 것이 application에 있는 data가 된다. 
// const reducer = () => { };
// 유일한 이 1개의 함수만 data를 modify 할 수 있다! data가 기본적으로 한 곳에만 있는 것! --> 유일하게 data를 바꿀 수 있는 곳이다.
// countModifier가 state를 수정한다.
const countModifier = (state = 10) => {
  console.log(state);
  // action을 통해서 count를 증가, 감소시킬 수 있다.
  return state;
};

// store가 하는 일은 기본적으로 data를 저장하는 장소, reducer를 만들어서 넣어줘야 된다.
//const store = createStore(reducer);
const countStore = createStore(countModifier);
console.log(`얘는 이제 초기화 한 다음 : ${countStore.getState()}`);
// createStore를 통해 store를 만들면, countModifier를 initial store로 불러온다.
// 그래서 countModifier안의 console.log(state)를 찍어보면, state는 undefined인 상태이다.
// 그래서 state = 0으로 initializing 해 놓았다.