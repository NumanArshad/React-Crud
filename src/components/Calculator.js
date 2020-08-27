 import React, { useEffect } from "react";
const Calculator = () => {

    const [result, setResult] = React.useState('0')
    const [prev, setPrev] = React.useState({ vl: "", op: "" })
    const [displayValues] = React.useState(['AC', 'C', '%', '0', '●', '1', '2', '3', '4', '5', '6', '7', '8', '9', '÷', 'x', '*', '-', '+', '='])
    const [disallowOperator, setAllowOperator] = React.useState(['*', '/', '%', '='])
    const [scale,setAutoScale]=React.useState(1)

    useEffect(() => {
      //  console.log(node.parentNode.offsetWidth /node.offsetWidth)
        document.addEventListener('keyup', (e) => {

            // handleClick(e.key)
        })
        return () => {
            document.removeEventListener('keyup', (e) => {

                //   handleClick(e.key)
            })
        }
    })
    
    let node=React.useRef(null)

    const handleClick = (id) => {
        console.log(node.parentNode.offsetWidth)
        console.log(node.parentNode.offsetWidth /node.offsetWidth)
        console.log(node.parentNode.offsetWidth /node.offsetWidth)
       const actualScale=node.parentNode.offsetWidth /node.offsetWidth
        if(actualScale<1){
            setAutoScale(actualScale)
        }
        else if(scale<1){
            setAutoScale(1)
        }
       // setAutoScale()
        let last = result.slice(-1)
        let invalid = false
        if (disallowOperator.find((op) => op == id) && result == "") {  //if operator is invalid (*,/,%,=)
            console.log('invalid')
        }
        else if (isNaN(id) && (isNaN(last) && last !== "*")) {  //if current and prev are both operator
            console.log('invalid')
        }

        else {
            if (id == "=") {
                alert(result)
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
         //   alert(prev.vl) alert(this.node.parentNode.offsetWidth / this.node.offsetWidth)
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
        <div id="wrapper">
            <div id="app">
                <div className="calculator">
                    <div className="calculator-display">
                        <div
                            className="auto-scaling-text"
                            style={{ transform: `scale(${scale},${scale})` }}
                            ref={el => node = el}
                        >{result}</div>
                    </div>
                    <div className="calculator-keypad">
                        <div className="input-keys">

                            <div className="function-keys">
                                <button className={`calculator-key`} onClick={() =>handleClear()}>AC</button>
                                <button className={`calculator-key`} onClick={() => handleback()}>C</button>
                                <button className={`calculator-key`}>%</button>


                            </div>
                            <div className="digit-keys">

                                <button className="calculator-key key-0" onClick={() => handleClick('0')}>0</button>
                                <button className="calculator-key" onClick={() => handleClick('.')}>●</button>
                                <button className="calculator-key" onClick={() => handleClick('1')}>1</button>
                                <button className="calculator-key" onClick={() => handleClick('2')}>2</button>
                                <button className="calculator-key" onClick={() => handleClick('3')}>3</button>
                                <button className="calculator-key" onClick={() => handleClick('4')}>4</button>
                                <button className="calculator-key" onClick={() => handleClick('5')}>5</button>
                                <button className="calculator-key" onClick={() => handleClick('6')}>6</button>
                                <button className="calculator-key" onClick={() => handleClick('7')}>7</button>
                                <button className="calculator-key" onClick={() => handleClick('8')}>8</button>
                                <button className="calculator-key" onClick={() => handleClick('9')}>9</button>
                            </div>
                        </div>
                        <div className="operator-keys">
                            <button className="calculator-key" onClick={() => handleClick('/')}>÷</button>
                            <button className="calculator-key" onClick={() => handleClick('*')}>×</button>
                            <button className="calculator-key" onClick={() => handleClick('-')}>−</button>
                            <button className="calculator-key" onClick={() => handleClick('+')}>+</button>
                            <button className="calculator-key" onClick={() => handleClick('=')}>=</button>
                        </div>
                    </div>
                </div></div>
        </div>

    )
}



// const Calculator = () => {

//     const [result, setResult] = React.useState('')
//     const [prev, setPrev] = React.useState({ vl: "", op: "" })
//     const [displayValues] = React.useState(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*','.','/', '%', '=', 'clear', 'back'])
//     const[disallowOperator,setAllowOperator]=React.useState(['*','/','%','='])

// useEffect(()=>{
//    document.addEventListener('keyup',(e)=>{

//        handleClick(e.key)
//    })
//    return()=>{
//        document.removeEventListener('keyup',(e)=>{

//         handleClick(e.key)
//     })
//    }
// })

//     const handleClick = (id) => {

//         let last = result.slice(-1)
//         let invalid = false
// if(disallowOperator.find((op)=>op==id) && result==""){  //if operator is invalid (*,/,%,=)
// console.log('invalid')
// }

//   else if (isNaN(id) &&  (isNaN(last) && last !== "*")) {  //if current and prev are both operator

//     console.log('invalid')
//         }

//         else {
//             if (id == "=") {
//                alert(result)
//                 if (!prev.vl) {
//                     setPrev({ vl: last, op: result.slice(-2, -1) })
//                 }
//                 applyOperation()
//                 return;
//             }
//             else if (id !== "=" && isNaN(id)) {

//                 setPrev('')
//             }

//             setResult(result + id)
//         }

//     }

//     const handleClear = () => {
//         setResult('')
//         setPrev({})
//     }

//     const applyOperation = () => {
//         let output = result
//      //   alert(prev.vl)
//         if (prev.vl) {
//             output += prev.op + prev.vl
//         }
//         setResult(eval(output).toString())
//     }

//     const handleback = () => {
//         let update = result.length > 0 && result.slice(0, -1)
//         setResult(update || "")
//     }



//     return (
//         <> <h1>Calculator {prev.vl} {prev.op}</h1>

//             <input type="text" placeholder="operation here" value={result} />
//             {displayValues.map((element) => {
//                 if (element == "clear") {
//                     return (<button onClick={() => handleClear()}>{element}</button>)
//                 }
//                 else if (element == "back") {
//                     return (<button onClick={() => handleback()}>{element}</button>)
//                 }
//                 else{
//                     return (<button onClick={() => handleClick(element)}>{element}</button>)

//                 }
//             } )}






//         </>
//     )
// }
export default Calculator