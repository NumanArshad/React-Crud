import React, { useEffect } from "react";
const Calculator = () => {

    const [result, setResult] = React.useState('')
    const [prev, setPrev] = React.useState({ vl: "", op: "" })
    const [displayValues] = React.useState(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%', '=', 'clear', 'back'])

useEffect(()=>{
   document.addEventListener('keyup',(e)=>{
    
       handleClick(e.key)
   })
   return()=>{
       document.removeEventListener('keyup',(e)=>{
    
        handleClick(e.key)
    })
   }
})

    const handleClick = (id) => {
        let last = result.slice(-1)
        let invalid = false
     
    
        if (isNaN(id) && (last == "" || (isNaN(last) && last !== "*"))) {  //if first is operator or current and prev are both operator

            invalid = true
        }

        else {
            if (id == "=") {
               // alert(result)
                if (!prev.vl) {
                    setPrev({ vl: last, op: result.slice(-2, -1) })
                }
                applyOperation()
                return;
            }
            else if (id !== "=" && isNaN(id)) {

                setPrev('')
            }

            setResult(result + id)
        }

    }

    const handleClear = () => {
        setResult('')
        setPrev({})
    }

    const applyOperation = () => {
        let output = result
     //   alert(prev.vl)
        if (prev.vl) {
            output += prev.op + prev.vl
        }
        setResult(eval(output).toString())
    }

    const handleback = () => {
        let update = result.length > 0 && result.slice(0, -1)
        setResult(update || "")
    }



    return (
        <> <h1>Calculator {prev.vl} {prev.op}</h1>

            <input type="text" placeholder="operation here" value={result} />
            {displayValues.map((element) => {
                if (element == "clear") {
                    return (<button onClick={() => handleClear()}>{element}</button>)
                }
                else if (element == "back") {
                    return (<button onClick={() => handleback()}>{element}</button>)
                }
                else{
                    return (<button onClick={() => handleClick(element)}>{element}</button>)

                }
            }


            )}

         
        </>
    )
}
export default Calculator