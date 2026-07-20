function GeneralView() {
    return (
        <div className="container">
            <h1>General viewing</h1>
            <div>
                <div className="box">
                <h3>Doctors' number: </h3> <p>0</p>
                </div>
                <div className="box">
                <h3>Rceptionists' number: </h3> <p>0</p>
                </div>
                <div className="box">
                <h3>Admins' number: </h3> <p>0</p>
                </div>
                <div className="box">
                <h3>Appointments' status</h3>
                <ul>
                    <li><h5>total Appointments:</h5></li> <p>0</p>
                    <li><h5>Booked appointments:</h5></li> <p>0</p>
                    <li><h5>Completed appointments:</h5></li> <p>0</p>
                    <li><h5>Cancelled appointments:</h5></li> <p>0</p>
                </ul>
                </div>
            </div>
        </div>
    )
}

export default GeneralView