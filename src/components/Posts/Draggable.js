import React, { useEffect } from "react"


const Draggable = () => {
    const [dragStatus, setDragStatus] = React.useState('')
    let node = React.useRef('')
    const lastPoint = { y: null, status: null }
    useEffect(() => {
        let rows = document.getElementsByClassName("tr")
        for (let row of rows) {
            row.draggable = true
        }
        document.addEventListener("mousemove", function (e) {

            lastPoint.status = lastPoint.y > e.clientY ? "up" : lastPoint.y < e.clientY ? "down" : "none"
            lastPoint.y = e.clientY


        })
        document.addEventListener("dragstart", function (event) {
            console.log(event.target.id)
            //  setDragStatus(event.target.id)
            event.dataTransfer.setData('text', event.target.id)

        })
        document.addEventListener("drag", function (event) {
            console.log("being dragged")
        })
        document.addEventListener("dragover", function (event) {
            // console.log("going tp drop")
            event.preventDefault()
           console.log(event.target.id)
        })
        document.addEventListener("drop", function (event) {
            event.preventDefault()
          //  console.log(lastPoint)
           //  console.log("at last dropped"+ document.getElementsByClassName("droptarget")[0])
            // if(event.target.className=="droptarget"){
             let parent = document.getElementsByClassName("droptarget")[0]
         
           
            //    console.log(parent)
       // let parent=document.getElementById(event.dataTransfer.getData('text'))
       //console.dir(document.getElementById(event.dataTransfer.getData('text')).parentElement)
       console.log(event.target.parentElement===document.getElementById(event.dataTransfer.getData('text')))
let getParent=event.target.parentElement===document.getElementById(event.dataTransfer.getData('text')).parentElement ? event.target.parentElement:undefined

       if(document.getElementById(event.dataTransfer.getData('text')) && getParent){
        parent.insertBefore(document.getElementById(event.dataTransfer.getData('text')),event.target)

       }
            // parent.insertBefore(document.getElementById( event.dataTransfer.getData('text')),event.target)
            // }
            //    else{
            //     parent.insertBefore(document.getElementById(event.dataTransfer.getData('text')),event.target)
            //    }



            //    event.target.replaceWith(dragElement)
            // dragElement.replaceWith(event.target)
            //  }
        })



        // return (() => {
        //     document.removeEventListener("dragstart3", function (event) {
        //         console.log("drag start")
        //     })
        //     document.removeEventListener("drag", function (event) {
        //         console.log("being dragged")
        //     })
        //     document.removeEventListener("dragover", function (event) {
        //         console.log("going tp drop")
        //     })
        //     document.removeEventListene("drop", function (event) {
        //         console.log("at last dropped")

        //     })
        // })

    })

    return (<>{JSON.stringify(lastPoint)} being dragged
     <div className="droptarget">
            <p class="tr" id="dragtarget1" ref={el => node = el}>1</p>
            <p class="tr" id="dragtarget2" ref={el => node = el}>2<span>kfnje</span></p>
            <p class="tr" id="dragtarget3" ref={el => node = el}>3</p>
            <p class="tr" id="dragtarget4" ref={el => node = el}>4</p>
            <p class="tr" id="dragtarget5" ref={el => node = el}>5</p>
        </div>
      
        <button onClick={() => console.log(node.id)}>nk</button>
    </>)
}


export default Draggable