import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
    const { empid } = useParams();

    const [empdata, empdataChange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            empdataChange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <div>
            <div className="card" style={{ "textAlign": "left", "marginLeft":"9px", "marginRight":"9px"}}>
                <div className="cart-title" style={{"textAlign":"center", "color":"green"}}>
                    <h2>Student Details</h2>
                </div>
                <div className="card-body"></div>
                { empdata &&
                    <div>
                        <h1>The Student name is : <b>{empdata.name}</b> [{empdata.id}]</h1>
                        <h3>Contact Details</h3>
                        <h5>Email is : {empdata.email}</h5>
                        <h5>Phone is : {empdata.phone}</h5>
                        <Link to='/' className="btn btn-danger">Back to Listing</Link>
                    </div>
                }
            </div>
        </div>
    )
}
export default EmpDetail;