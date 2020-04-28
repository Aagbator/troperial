import React, {useState} from 'react';
import MyContext from './context';



const Provider = (props) => {
    let [isLoggedIn, setLoginStatus] = useState(false)
    let [isRegistered, setRegistrationStatus] = useState(false)
    let [email, setEmail] = useState('')
    let [phoneNumber, setPhoneNumber] = useState('')

    return(
        <MyContext.Provider
                value={{
                    email,
                    phoneNumber,
                    setLoginStatus,
                    setRegistrationStatus,
                    setEmail,
                    setPhoneNumber
                }}
            >
                {props.children}
            </MyContext.Provider>
    )
}

export default Provider;