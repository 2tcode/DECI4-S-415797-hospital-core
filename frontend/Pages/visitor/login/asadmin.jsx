import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginAsAdmin() {
    return (
        <div>
            <h1>Login as Admin</h1>
            <Link to="../signup/asadmin">Have no account? Sign up</Link>
                        <div>
                <Link to="../admin/dashboard">Go to Admin Dashboard</Link>
            </div>
        </div>
  )
}

export default LoginAsAdmin