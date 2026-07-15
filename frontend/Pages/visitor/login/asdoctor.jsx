import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginAsDoctor() {
    return (
        <div>
            <h1>Login as Doctor</h1>
            <Link to="../signup/asdoctor">Have no account? Sign up</Link>
                        <div>
                <Link to="../doctor/profile/dashboard">Go to Doctor Dashboard</Link>
            </div>
        </div>
    )
}

export default LoginAsDoctor