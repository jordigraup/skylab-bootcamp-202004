module.exports = (message, level) => {
    return `<p class="feedback--${level}>${message}</p>`
}