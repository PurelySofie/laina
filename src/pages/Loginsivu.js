import React,{ useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Userinfo from '../databases/käyttäjät/Users.json';
import "../pages/Loginsivu.css";
import axios from 'axios';

const Loginsivu = () => {
    const navigate = useNavigate();
    const [sposti, setSposti] = useState("")
    const [salasana, setSalasana] = useState("")
    const [formError, setFormError] = useState({ sposti: "", salasana: ""});
    const [passwordShown, setPasswordShown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
            navigate("/userpage/Profiili");
        }
    },[])

    const handleLogin = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        let payload = {
            email:sposti,
            password:salasana,
        }

        let inputError = {
            sposti: "",
            salasana: "",
        }
        setFormError(inputError);
        axios.get('http://localhost:3030/kayttajat', payload)
        .then((r) => {
            const user = Userinfo.kayttajat.find((kayttajat) => kayttajat.sposti === sposti && kayttajat.salasana === salasana);

            if(user) {
                navigate(`/userpage/${sposti}`);
            } else {
                setFormError({
                    ...inputError,
                    salasana: 'Väärä Sähköpostiosoite tai Salasana! Yritä Uudelleen.',
                })
            }
            setIsSubmitting(false)
            localStorage.setItem('token', r.data.token)
        })
        axios.get('http://localhost:3030/admins', payload)
            .then((r) => {
                const admin = Userinfo.admins.find((admins) => admins.sposti === sposti && admins.salasana === salasana);

                if(admin) {
                    navigate("/admin")
                } else {
                    setFormError({
                        ...inputError,
                        salasana: 'Väärä Sähköpostiosoite tai Salasana! Yritä Uudelleen.',
                    })
                }
                setIsSubmitting(false)
                localStorage.setItem('token', r.data.token)
            })
    };

    // Näytä Salasana
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="kirjauduFrm">
            <form onSubmit={handleLogin} className="form">
                <h1 className="title-kirjaudu">Kirjaudu Sisään</h1>

                <div className="inputContainer">
                    <input type="email" className="input" id="email" name="email" value={sposti} onChange={(e) => setSposti(e.target.value)} placeholder="a" required  />
                    <label htmlFor="email" className="label">Sähköposti</label>
                </div>

                <div className="inputContainer">
                    <input type={passwordShown ? "text" : "password"} className="input" id="password" name="password" value={salasana} onChange={(e) => setSalasana(e.target.value)} placeholder="a" required  />
                    <label htmlFor="password" className="label">Salasana</label>
                </div>
                <p className="error-message">{formError.salasana}</p>

                <div className="showPassword">
                    <input type="checkbox" className="showPsw" onClick={togglePassword} />
                    <p className='näytä'>Näytä Salasana</p>
                </div>

                <input disabled={isSubmitting} type="submit" onSubmit={handleLogin} className="submitBtn" value="Kirjaudu Sisään" ></input>

                <div className="forgotPsw">
                    <Link to="/forgotpassword">Unohtuiko Salasana?</Link>
                </div>

                <div className="rekisteröidy">
                    <h4 className="hr-lines">TAI</h4>
                    <p>Oletko uusi käyttäjä?</p>
                    <Link to="/register"><span></span>Rekisteröidy</Link>
                </div>
            </form>
        </div>
    );
}

export default Loginsivu;