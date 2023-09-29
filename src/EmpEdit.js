import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams();

    //const [empdata, empdataChange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            idChange(resp.id);
            nameChange(resp.name);
            emailChange(resp.email);
            phoneChange(resp.phone);
            activeChange(resp.isactive);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []) 

    const [id, idChange] = useState("");
    const [name, nameChange] = useState("");
    const [email, emailChange] = useState("");
    const [phone, phoneChange] = useState("");
    const [active, activeChange] = useState(true);
    const [validation, valChange] = useState(false);

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = {id,name,email,phone,active};

        fetch("http://localhost:8000/employee/"+empid,{
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(empdata)
        }).then((res)=>{
            alert('Updated successfully.')
            navigate('/');
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    return(
       <div>
        <div className="row">
                <div className="offset-1g-3 col-1g-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="cart-title" style={{"textAlign":"center", "color":"green"}}>
                                <h2>Student Edit</h2>
                            </div>
                            <div className="card-body">
                                <div className='row'>

                                    <div className="col-1g-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled='disabled' className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-1g-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onMouseDown={(e)=>valChange(true)} onChange={(e)=>nameChange(e.target.value)} className="form-control"></input>
                                            {name.length===0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-1g-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input value={email} onChange={(e)=>emailChange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-1g-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input value={phone} onChange={(e)=>phoneChange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-1g-12">
                                        <div className="form-check">
                                        <input checked={active} onChange={(e)=>activeChange(e.target.checked)} type='checkbox' className="form-check-input"></input>
                                            <label className="form-check-label">Is Active</label>
                                        </div>
                                    </div>

                                    <div className="col-1g-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type='submit'>Update</button>
                                            <Link to='/' className='btn btn-danger'>Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
       </div>
    )
}
export default EmpEdit;