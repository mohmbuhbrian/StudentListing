import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
    const navigate = useNavigate();

    const LoadEdit = (id) => {
        navigate('/employee/edit/' + id);
    }
    const RemoveFunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch(" http://localhost:8000/employee/" + id, {
                method: 'DELETE',
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            });
        };
    };
    const LoadDetail = (id) => {
        navigate('/employee/detail/' + id);
    }

    const [empdata, empdataChange] = useState(null);
    useEffect(() => {
        fetch(" http://localhost:8000/employee").then((res) => {
            return res.json();
        }).then((resp) => {
            empdataChange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title" style={{ "color": "green" }}>
                    <h2>Student Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="employee/create" className="btn btn-success">Add New [+]</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="">
                            <tr>
                                <td><em><b>ID</b></em></td>
                                <td><em><b>NAME</b></em></td>
                                <td><em><b>EMAIL</b></em></td>
                                <td><em><b>PHONE</b></em></td>
                                <td><em><b>ACTION</b></em></td>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { RemoveFunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
export default EmpListing;