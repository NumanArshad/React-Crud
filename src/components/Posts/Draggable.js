 import React, { useEffect } from "react"


 const Draggable=()=>{
     const [dragStatus,setDragStatus]=React.useState('')
     let node=React.useRef('')
     useEffect(()=>{
         document.addEventListener("dragstart",function(event){
            console.log(event.target.id)
           //  setDragStatus(event.target.id)
           event.dataTransfer.setData('text',event.target.id)
            
         })
         document.addEventListener("drag",function(event){
           console.log("being dragged")
        })
        document.addEventListener("dragover",function(event){
            console.log("going tp drop")
            event.preventDefault()
        })
        document.addEventListener("drop",function(event){
            event.preventDefault()
           // console.log("at last dropped"+event.target.className)
           // if(event.target.className=="droptarget"){
             
          let dragElement= event.target.replaceWith(document.getElementById( event.dataTransfer.getData('text')))
                event.target.replaceWith(dragElement)
               // dragElement.replaceWith(event.target)
           //  }
        })

        
        
         return(()=>{
            document.removeEventListener("dragstart",function(event){
                console.log("drag start")
            })
            document.removeEventListener("drag",function(event){
              console.log("being dragged")
           })
           document.removeEventListener("dragover",function(event){
               console.log("going tp drop")
           })
           document.removeEventListener("drop",function(event){
               console.log("at last dropped")

           })
         })
     }, [])

     return(<>{dragStatus} being dragged
     <div className="droptarget"><p  draggable={true} id="dragtarget1" ref={el=>node=el}>1</p>
     <p  draggable={true} id="dragtarget2" ref={el=>node=el}>2</p>
     <p  draggable={true} id="dragtarget3" ref={el=>node=el}>3</p>
     </div>
     <div className="droptarget" style={{marginLeft:20}}>1</div>
     <button onClick={()=>console.log(node.id)}>nk</button>
     </>)
 }


 export default Draggable