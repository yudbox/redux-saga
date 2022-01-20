import { useDispatch, useSelector } from 'react-redux';

function App2() {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  console.log('store', store);
  return (
    <div>
      <h1>Redux saga</h1>
      <div>
        <button onClick={() => dispatch({ type: 'GET_SOME_DATA' })}>
          Click
        </button>
        <button onClick={() => dispatch({ type: 'NEW_EVENT_FOR_WATCHER' })}>
          Click2
        </button>
      </div>
    </div>
  );
}

export default App2;
