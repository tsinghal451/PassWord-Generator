
import { useState, useCallback, useEffect, useRef } from 'react'


function App() {

  const [length , setLength] = useState(8)
  const [number , setNumber] = useState(false);
  const [ char, setChar] = useState(false)
  const [Password, setPassword] = useState("")

  const passwordRef = useRef(null)

  
  
  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFNSKFISIUHFIUHVMFFISHIFHISUFHNCI";

    if(number) str += "0123456789"
    if(char) str += "%#@!^&*(){}?"

    for(let i=1; i<=length; i++){
      let char =  Math.floor(Math.random( ) * str.length + 1)

      pass += str.charAt(char)
    }

    setPassword(pass)

  },  [length, number , char , setPassword])

  const Passwordclipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  }, [Password])



  useEffect(() => {
    PasswordGenerator()

  }, [length, number , char, PasswordGenerator])
  

  return (
    <>
      <h1 className='text-yellow-200 text-xxl mb-7 ml-80' > Simple Password Generator </h1>
      
  <div className="max-w-xl px-5 py-4 text-xl text-center text-red-800 bg-gray-700 rounded-lg shadow-md ml-80 ">

    <h1 className="mx-3 mb-3 text-xl text-center text-white">Password Generator </h1>

   <div className="flex mb-4 overflow-hidden rounded-lg shadow ">

   <input 
   type='text'
   value={Password}
   className="w-full px-3 py-1 outline-none"
   placeholder='password'
   readOnly
   ref={passwordRef}
   />
   <button className="outline-none bg-blue-700 ml-2 text-white px-3 py-0.5 shrink-0 "
   onClick={Passwordclipboard}>Copy</button>

   </div>

   <div className="flex text-sm gap-x-2 ">
    <div className="flex items-center gap-x-1">

    <input 
    type="range" 
    min={6}
    max={100}
    value={length}
    className='cursor-pointer '
      onChange={(e) => {setLength(e.target.value)}}
    />
    <label> length: {length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input
      type="checkbox"
      defaultChecked={number}
      id='numberinput'
      onChange={() => {
        setNumber((prev) => !prev);
      }}
      ></input>
      <label htmlFor="numberinput" >Numbers </label>
    </div>

    <div className='flex items-center gap-x-1'>
      <input
      type="checkbox"
      defaultChecked={char}
      id='charinput'
      onChange={() => {
        setChar((prev) => !prev);
      }}
      ></input>
      <label htmlFor="charinput" >Character </label>
    </div>
   </div>
  </div>

  
  </>
  
  )
}

export default App
