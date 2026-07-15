import { useState } from 'react'
import { Link } from 'react-router-dom'

function SignupAsDoctor() {
    return (
        <div>
            <h1>Sign up as Doctor</h1>
            <Link to="../login/asdoctor">Already have an account? Login</Link>
                        <div>
                <Link to="../doctor/profile/dashboard">Go to Doctor Dashboard</Link>
            </div>
        </div>
    )
}

export default SignupAsDoctor