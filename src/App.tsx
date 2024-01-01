import { RootState } from "./store";
import { useAppSelector, useAppDispatch } from "./hooks";
import { increment, incrementByAmount } from "./features/counter/counterSlice";

export default function App() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
      <div className="App">
        <h1>Redux toolkit example</h1>
        <h2>current count is: {count}</h2>
        <div>
          <button
              onClick={() => {
                dispatch(increment());
              }}
          >
            Inc
          </button>
        </div>
        <div>
          <button
              onClick={() => {
                dispatch(incrementByAmount(3));
              }}
          >
            Inc by 3
          </button>
        </div>
      </div>
  );
}
