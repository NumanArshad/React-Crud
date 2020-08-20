import joi from "joi-browser"
export const customValidator=(data,schema)=>{

    const result=joi.validate(data,schema,{ abortEarly: false })
    
    const usefulErrors = {};
    if(result.error){
        result.error.details.map((error) => {
            if (!usefulErrors.hasOwnProperty(error.path.join('_'))) {
              usefulErrors[error.path.join('_')] = error.message
              
            }
          });
    }
   
   
    return usefulErrors
}

