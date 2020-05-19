const fs = require('fs')
const path = require('path')



function searchContact (query, callback ) {
    
    readdir(path.join(__dirname, '..', 'data'), (error, files) =>{
        if (error) throw new Error(error)

        const matches = []
        
        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data', file), (error, results)=>{
                if(error) throw new Error(error)

                const results = JSON.parse(results)

                const values = value(results) 

                if (values.includes(query)) matches.push(results)
                
                callback (null, results) 

                

            })
           
        });

    }) 

}

module.exports= searchContact