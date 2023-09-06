import { Link } from 'react-router-dom';
import { useState } from 'react';

const Kirjaudu = () => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <>
            <div className="testinav">
                <nav>
                    <ul>
                        <Link to="/">Etusivu</Link>
                        <Link to="/kirjaudu">Kirjaudu</Link>
                    </ul>
                </nav>
            </div>

            <div className="kirjauduFrm">
                <form action="" className="form">
                    <h1 className="title-kirjaudu">Kirjaudu Sisään</h1>

                    <div className="inputContainer">
                        <input type="email" className="input" placeholder="a" required />
                        <label htmlFor="" className="label">Sähköposti</label>
                    </div>

                    <div className="inputContainer">
                        <input type={passwordShown ? "text" : "password"} className="input" name="password" placeholder="a"  required />
                        <label htmlFor="" className="label">Salasana</label><br></br>
                    </div>
                    <input type="checkbox" className="showPsw" onClick={togglePassword} /> Näytä Salasana

                    <input type="submit" className="submitBtn" value="Kirjaudu Sisään" />

                    <div className="forgotPsw">
                        <Link to="/salasana">Unohtuiko Salasana?</Link>
                    </div>

                    <div className="rekisteröidy">
                    <h4 className="hr-lines">TAI</h4>
                    <p>Oletko uusi käyttäjä?</p>
                    <Link to="/uusitili">Rekisteröidy</Link>
                    </div>
                </form>
            </div>
        </>

    )
}

export default Kirjaudu




/* PASSWORD VALIDATION

import validator from "validator";

const validate = (value) => {
    if (validator.isStrongPassword(value, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
        setErrorMessage('Vahva Salasana')
    } else {
        setErrorMessage('Ei Vahva Salasana')
    }
}

{errorMessage === '' ? null :
    <span style={{
        fontWeight: "bold",
        color: "red",
    }}>{errorMessage}</span>}*/