import axios from "axios";

const AuthPage = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();
        const { value } = e.target[0];
        axios.post(
            'http://localhost:3001/authenticate',
            { username: value }
        )
        props.onAuth({ username: value, secret: value })
    }

    return (
        <div className="background">
            <form onSubmit={onSubmit} className="form-card">
                <div className="form-title">
                    {/* Welcome 👋 */}
                    ברוך הבא לטמבור
                </div>

                <div className="form-subtitle">
                    {/* Set a username to get started */}
                    הכנס שם משתמש בשביל להתחיל
                </div>

                <div className="auth">
                    <div className="auth-label">שם משתמש</div>
                    <input className="auth-input" name="username" />
                    <button className="auth-button" type="submit">כניסה</button>
                </div>
            </form>
        </div>
    );
}

export default AuthPage