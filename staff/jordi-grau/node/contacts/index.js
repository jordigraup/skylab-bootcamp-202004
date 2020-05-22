const express = require ('express')
const path = require ('path')
const listContacts = require ('./logic/list-contacts')
const searchContacts = require ('./logic/search-contacts')



const server = http.createServer((req, res) =>{
   const  { url, method } = req

   res.setHeader('content-type', 'text/html')

   if (url === '/contacts') {
       lisrContacts((error, contacts) => {
           if (error) throw error

           res.end(App(listContacts(contacts)))
       })
   }
   
})


/*
    res.setHeader('content-type', 'text/html')

    if (url === '/contancts'){
        listContacts((error, contacts) =>{
            if (eror) throw error

            res.end(App(listContacts(contacts)))
        })
    }
    else if (url.startsWith('/search')){
        if(!url.includes('?')){
            res.end(App(searchContacts))
        }
        else {
            const [, queryString] = url.split('?')

            const [, query] = query.split('=')

            searchContacts(query, (error, contacts) => {
                if (error) throw error

                res.end(App(`${SearchContacts(query)}${ListContacts(contacts)}`)                )
            })
        }
        }
    
    
        
    
    
})



*/

server.listen(8080)

