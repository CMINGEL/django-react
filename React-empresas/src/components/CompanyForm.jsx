import React, { useEffect, useState } from "react";
import * as SERVER from "./companyServer";
import { useNavigate, useParams } from "react-router-dom";

const CompanyForm=  () => {
    const Navigate = useNavigate();
    const params = useParams();
    console.log(params)
    const initialState={ id:0, name:"", foundation:1950, website:"" };
    const [company,setCompany]=useState(initialState);
    const handleInput = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        setCompany({...company,[e.target.name]:e.target.value});
    }
    const handleSubmit  = async (e) =>{
        e.preventDefault();
        // console.log(company);
        try{
            let res;
            if(!params.id){
                res= await SERVER.nuevaCompania(company);
                const data=await res.json();
                console.log(data);
                if(data.message==="Success"){
                    setCompany(initialState);
                }
            }else{
                await SERVER.updatedCompany(params.id,company)
            }
           
            Navigate("/");
        }catch(error){
            console.log(error)
        }
    } 
const getCompany = async(id) =>{
    try{
        const res=await SERVER.getCompany(id);
        const data= await res.json();
        const {name,foundation,website}=data.company;
        setCompany({name,foundation,website})
        console.log(data)
        }catch(error){
            console.log(error)
        }
}

useEffect(()=>{
    if (params.id){
        getCompany(params.id);
        }
    }, []);

return(
    <div className="col-md-3 mx-auto">
        <br />
        <h2 className="mb-5 text-center">Company</h2>

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" name="name" value={company.name} onChange={handleInput} className="form-control" minLength="2" maxLength="50" autoFocus required />
            </div>
            <div className="mb-3">
                <label className="form-label">Foundation</label>
                <input type="number" name="foundation" value={company.foundation} onChange={handleInput} className="form-control" min="1900" max="2020" required />
            </div>
            <div className="mb-3">
                <label className="form-label">Website</label>
                <input type="url" name="website" value={company.website} onChange={handleInput} className="form-control" maxLength="100" required />
            </div>
            <div className="d-grid ">
                {
                    params.id?(
                        <button className="btn btn-primary" type="submit">Update</button>
                    ):(
                        <button className="btn btn-success" type="submit">Save</button>
                    )
                }
                
            </div>
        </form>

    </div>
)   };

export default CompanyForm;

