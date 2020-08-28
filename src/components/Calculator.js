import React, { useEffect, useCallback } from "react";
import { throws } from "assert";

// class Calculator extends React.Component{
// constructor(){
//     super();
//     this.state={result:'',
//     prev:{vl:"",op:""},
//     disallowOperator:['*', '/', '%', '=', '0'],
// scale:1}
// }

// componentDidMount(){

// }

// }


const Calculator = () => {

    const [result, setResult] = React.useState('')
    const [prev, setPrev] = React.useState({ vl: "", op: "" })
    //const [displayValues] = React.useState(['AC', 'C', '%', '0', '●', '1', '2', '3', '4', '5', '6', '7', '8', '9', '÷', 'x', '*', '-', '+', '='])
    const [disallowOperator, setAllowOperator] = React.useState(['*', '/', '%', '=', '0'])
    const [scale, setAutoScale] = React.useState(1)
    const [keyPress,handlePressed]=React.useState(false)
    let node = React.useRef('')

    useEffect(() => {
        console.log("called")
        if(!keyPress){
            document.addEventListener('keyup', handleKey)
            console.log(result)
        }
        const actualScale = node.parentNode.offsetWidth / node.offsetWidth
        if (actualScale < 1) {
            setAutoScale(actualScale)
        }
        else if (scale < 1) {
            setAutoScale(1)
        }
     
     
        // return () => {
        //     document.removeEventListener('keyup', (e) => {

        //           handleClick(e.key)
        //     })
        // }
    })

    const handleKey=e=>{
      // alert("key"+result)
       handlePressed(true)
        handleClick(e.key)

    }
   

    const handleClick = React.useCallback((keyPressed) => {
     // handlePressed(false)
     //  alert("called click"+result)

        let h="23*75"
        const iterativeIndex=h.includes("**") ? h.lastIndexOf("*"):undefined
//alert(h.match(/\d+$/)[0]) //num
//alert(h.match(/(\D+)/)[0])
        let previousResult = result.slice(-1)

        if (handleValidateInput(keyPressed, previousResult)) {
            if (keyPressed == "=") {   //= key pressed apply operation and reserved op and value for next iteration
             
                if (!prev.vl) {
                    let iterativeIndex=h.includes("**") && h.lastIndexOf("*")
                    setPrev({ vl: result.match(/\d+$/)[0], op: result.match(/(\D+)/)[0]})
                }
                applyOperation()
                return;
            }
            else if (keyPressed !== "=" && isNaN(keyPressed)) {  

                setPrev('')
            }

            setResult(result !== "Error" ? result + keyPressed : keyPressed)
        }

    })

    const handleValidateInput = (keyPressed, last) => {
        let isValid = true
        if (disallowOperator.find((op) => op == keyPressed) && result == "") {  //if operator is invalid (*,/,%,=)
            console.log('invalid')
            isValid = false
        }
        else if (isNaN(keyPressed) && (isNaN(last) && last !== "*")) {  //if current and prev are both operator
            console.log('invalid')
            isValid = false
        }
        return isValid
    }


    const handleClear = () => {
        setResult('')
        setPrev({})
    }

    const applyOperation = () => {
        let output = result

        if (prev.vl) {
            output += prev.op + prev.vl
        }
        try {
            setResult(eval(output).toString())
        }
        catch (err) {
            setResult("Error")
        }

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
                                <button className={`calculator-key`} onClick={() => handleClear()}>AC</button>
                                <button className={`calculator-key`} onClick={() => handleback()}>C</button>
                                <button className={`calculator-key`}>%</button>


                            </div>
                            <div className="digit-keys">

                                <button className="calculator-key key-0" onClick={() => handleClick('0')}>0</button>
                                <button className="calculator-key" onClick={() => handleClick('.')}>●</button>
                                <button className="calculator-key"  onClick={() => handleClick('1')}>1</button>
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
export default Calculator