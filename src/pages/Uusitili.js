import React,{ useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./Loginsivu.css"
import Userinfo from '../databases/käyttäjät/Users.json';

const Uusitili = () => {
    const [formData, setFormData] = useState({ sposti: "", salasana: "", confirmPassword: "" });
    const [formError, setFormError] = useState({ sposti: "", salasana: "", confirmPassword: "" });
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        // Salasanan vahvistus ja virheviestit
        let inputError = {
            sposti: "",
            salasana: "",
            confirmPassword: "",
        }

        if (!formData.sposti && !formData.salasana) {
            setFormError({
                ...inputError,
                sposti: 'Anna kelvollinen sähköpostiosoite',
                salasana: 'Anna Salasana',
            })
            return;
        }

        if (!formData.sposti) {
            setFormError({
                ...inputError,
                sposti: 'Anna kelvollinen sähköpostiosoite',
            })
            return;
        }

        if (formData.confirmPassword !== formData.salasana) {
            setFormError({
                ...inputError,
                confirmPassword: 'Salasanat eivät täsmää',
            })
            return;
        }

        if (!formData.salasana) {
            setFormError({
                ...inputError,
                salasana: 'Anna Salasana',
            })
            return;
        }

        setFormError(inputError);

        // Uuden käyttäjän luonti
        const newUser = {
            sposti: formData.sposti,
            salasana: formData.salasana,
            confirmPassword: formData.confirmPassword
        };

        // Käytössä olevan sähköpostiosoitteen tarkistus
        // Mikäli sähköpostiosoite on jo käytössä, ei rekisteröityminen onnistu
        const emailExists = Userinfo.kayttajat.some((user) => user.sposti === formData.sposti);

        if (emailExists) {
            setFormError({
                ...inputError,
                sposti: 'Sähköpostiosoite on jo käytössä!',
            })
            return;
        }

        // Tietojen tallennus tietokantaan
        // Jos rekisteröinti onnistuu, tallentuu tunnukset tietokantaan, ja käyttäjä ohjautuu kirjaudu-sivulle.
        try {
            const response = await fetch('http://localhost:3030/kayttajat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if(response.ok) {
                navigate("/login")
            } else {
                alert('Rekisteröityminen epäonnistui!')
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    // Näytä Salasana
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
            <div className="rekisteröidyFrm">
                <form className="form" onSubmit={handleRegistration}>
                    <h1 className="title-rekisteröidy">Rekisteröidy</h1>

                    <div className="inputContainer">
                        <input type="email" className="input" name="sposti" value={FormData.sposti} onChange={handleInputChange} placeholder="a" required/>
                        <label className="label">Sähköposti</label>
                    </div>
                    <p className="error-message">{formError.sposti}</p>


                    <div className="inputContainer">
                        <input type={passwordShown ? "text" : "password"} className="input" name="salasana" value={formData.salasana} onChange={handleInputChange} placeholder="a" required/>
                        <label className="label">Salasana</label>
                    </div>


                    <div className="inputContainer">
                        <input type={passwordShown ? "text" : "password"} className="input" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="a" />
                        <label className="label">Vahvista Salasana</label><br></br>
                    </div>
                    <p className="error-message">{formError.confirmPassword}</p>


                    <div className="showPassword">
                        <input type="checkbox" className="showPsw" onClick={togglePassword} />
                        <p className='näytä'>Näytä Salasana</p>
                    </div>

                    <input type="submit" className="submitBtn" value="Rekisteröidy" ></input>

                    <div className="kirjaudu">
                    <h4 className="hr-lines">TAI</h4>
                    <p>Onko sinulla jo käyttäjä?</p>
                    <Link to="/login"><span></span>Kirjaudu Sisään</Link>
                    </div>
                </form>
            </div>
    );
}

export default Uusitili;