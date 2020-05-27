// class Results extends Component {
//     constructor(users) {
//         super(`<section class="results">
//     </section>`)

//         if (users.length) {
//             const list = document.createElement('ul')

//             // users.forEach(function (user) {
//             //users.forEach(function ({ name, surname, email }) {
//             users.forEach(({ name, surname, email }) => {
//                 const item = document.createElement('li')

//                 // const { name, surname, email } = user

//                 item.innerText = `${name} ${surname} (${email})`

//                 list.appendChild(item)
//             })

//             this.container.appendChild(list)
//         } else this.container.appendChild(new Feedback('sorry, no results :(', 'warning').container)
//     }
// }

function Results({ users }) {
    return <section className="results">
        {
            users.lenght ?
                <ul>{users.map(({ name, surname, email }) => <li>{`${name} ${surname} (${email})`}</li>)}</ul>
                : <Feedback message="sorry, no results : (" level="warning" />
        }
    }
    </section>
}