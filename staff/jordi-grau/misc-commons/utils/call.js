const Http = require('./http')
require('../polyfills/url')
require('../polyfills/function')

module.exports = (method, url, body, headers) => {
    Http.validateMethod(method)
    URL.validate(url)

    return new Promise((reject, resolve)=>{

        const xhr = new XMLHttpRequest()
    
        xhr.open(method, url)
    
        if (headers)
            for (const key in headers)
                xhr.setRequestHeader(key, headers[key])
    
        xhr.onload = function () {
            resolve({ status: this.status, body : this.responseText})
        }
    
        xhr.onerror = function () {
            reject(new Error('network error'))
        }
        console.log(body)
        xhr.send(body ? body : undefined)
    })

}