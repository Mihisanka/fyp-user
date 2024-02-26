import React from 'react';
import './styles/Login.css'; // Import your CSS file

const LoginForm = () => {
    
    return (
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form>
                        <h2>Login</h2>
                        <div className="inputbox">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input type="email" required />
                            <label>Email</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="password" required />
                            <label>Password</label>
                        </div>
                        <div className="forget">
                            <label>
                                <input type="checkbox" />
                                Remember Me
                            </label>
                            <a href="#">Forgot Password</a>
                        </div>
                        <button>Log In</button>
                        <div className="register">
                            <p>Don't have an account? <a href="registration">Sign Up</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
export default   LoginForm ;

// // const App = () => {
// //     return (
// //         <div>
// //             <LoginForm />
// //         </div>
// //     );
// // };

// // export default App;

