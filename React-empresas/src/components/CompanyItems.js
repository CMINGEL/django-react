import React from "react";
import {deleteCompany} from "./companyServer"
import { useNavigate } from "react-router-dom";
const CompanyItem=({company, listCompanies})=> {
    const Navigate = useNavigate();
    const handleDelete = async (id)=> {
        console.log(id)
        await deleteCompany(id);
        listCompanies();
    };

    console.log(company);
    return (
    <div className="col-md-4 mb-4">
        <div className="card card-body">
            <h3 className="card-title">{company.name} <button className="ms-2 btn btn-sm btn-info" onClick={()=>  Navigate(`/updateCompany/${company.id}`)}> Edit </button></h3>
            <p className="card-text"> <strong> {company.foundation} </strong> </p>
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary" > Go to webside </a>
            <button className="btn btn-danger my-2" onClick={()=> company.id && handleDelete(company.id)}> Delete Company</button>
        </div>
    </div>
    )
};

export default CompanyItem;