import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginAsPatient() {
    return (
        <div>
            <h1>Login as Patient</h1>
            <Link to="../signup/aspatient">Have no account? Sign up</Link>
            <div>
                <Link to="../patient/profile/dashboard">Go to Patient Dashboard</Link>
            </div>
        </div>
    )
}

export default LoginAsPatient