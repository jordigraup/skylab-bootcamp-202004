//Ventana para registrar usuarios nuevos
class Register extends Component{
    constructor(onSubmit,onLogin){
        super(`<section class="register">
        <h1>Register</h1>
        <form>
            <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}">
            <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}">
            <input type="email" name="email" placeholder="e-mail" required>
            <input type="password" name="password" placeholder="password" required minLength="8">
            <button>Submit</button>
            or <a href="">Login</a>
        </form>
        </section>`);
        
        const self=this;
        let feedback;
        const form= self.container.querySelector("form");
        //Cuando se le da al boton de registrar
        form.addEventListener("submit",function(event){
            event.preventDefault();
            let name=event.target.name.value;
            let surname=event.target.surname.value;
            let email=event.target.email.value;
            let password=event.target.password.value;

            try{
                onSubmit(name,surname,email,password);
                event.target.name.value="";
                event.target.surname.value="";
                event.target.email.value="";
                event.target.password.value="";
                if(feedback){
                    self.container.removeChild(feedback.container);
                    feedback=undefined;
                }
            }catch(error){
                //si no hay mensaje de error lo crea
                if(!feedback){
                    feedback= new Feedback(error.message,"error");
                    self.container.append(feedback.container);
                }else{
                    feedback.innerText=error.message;
                }
            }
        })
        //El boton para ir al login
        const login= self.container.querySelector("a");
        login.addEventListener("click",function(event){
            event.preventDefault();
            onLogin();
            form.name.value="";
            form.surname.value="";
            form.email.value="";
            form.password.value="";
            if(feedback){
                self.container.removeChild(feedback.container);
                feedback=undefined;
            }
        })
    }
}