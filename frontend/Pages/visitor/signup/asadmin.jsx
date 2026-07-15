import { useState } from 'react'
import { Link } from 'react-router-dom'


function SignupAsAdmin() {
    return (
        <div>
            <h1>Sign up as Admin</h1>
            <Link to="../login/asadmin">Already have an account? Login</Link>
            <div>
                <Link to="../admin/dashboard">Go to Admin Dashboard</Link>
            </div>
            <Link to="/">Already have an account? Login</Link>
        </div>
    )
}

export default SignupAsAdmin