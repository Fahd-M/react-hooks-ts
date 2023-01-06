import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

interface User {
  id: number,
  username: string,
}

type fibFunc = (n: number) => number

const fib: fibFunc = (n) => {
  if (n < 2) return n
  return fib(n - 1) + fib(n - 2)
}
const myNum: number = 37

function App() {

  const [count, setCount] = useState<number>(0)
  const [users, setUsers] = useState<User[] | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  // Note: null is initial ref but type is HtmlInputElement
  // Ways to fix: 
  // 1) non-null assertion: const inputRef = useRef<HTMLInputElement>(null!)
  // 2) type guard: if (!inputRef.current)
  // 3) Optional chaining
  console.log(inputRef?.current) // if current exists then log it
  console.log(inputRef?.current?.value) // if it has a value then optional chain it too

  // Recall: Changing value that is stored in current will not make a re-render of the component.
  // When component does render then we would console.log the element and its value  


  useEffect(() => {
    console.log('mounting')
    console.log('Users: ', users)

    return () => console.log('unmounting')
  }, [users])

  const addTwo = useCallback((): void => setCount(prev => prev + 2),[])
  // *** more complex example -->  const addTwo = useCallback((e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>): void => setCount(prev => prev + 1),[])

  const result = useMemo<number>(() => fib(myNum), [myNum])
  
  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={addTwo}> Add </button>
      <h2>{result}</h2>
      <input type="text" ref={inputRef} />
    </div>
  )
}

export default App
