import { useState } from 'react'
import { Link } from 'react-router-dom'

function SignupAsPatient() {
    return (
        <div>
            <h1>Sign up as Patient</h1>
            <Link to="../login/aspatient">Already have an account? Login</Link>
                        <div>
                <Link to="../patient/profile/dashboard">Go to Patient Dashboard</Link>
            </div>
        </div>
    )
}

export default SignupAsPatient