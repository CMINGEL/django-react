const API_URL = "http://127.0.0.1:8000/api/companies/";

export const listCompanies = async () => {
    return await fetch(API_URL);
};

export const nuevaCompania = async (newCompany) => {
    return await fetch(API_URL,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'name': String(newCompany.name).trim(),
            'foundation': parseInt(newCompany.foundation),
            'website':String(newCompany.website).trim(),
        })
    });
};

export const deleteCompany = async (id) => {
    return await fetch(`${API_URL}${id}` , {
        method: 'DELETE',
    });
};

export const getCompany = async (id) => {
    return await fetch(`${API_URL}${id}`);
};

export const updatedCompany = async (id,updatedCompany) => {
    return await fetch(`${API_URL}${id}`,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'name': String(updatedCompany.name).trim(),
            'foundation': parseInt(updatedCompany.foundation),
            'website':String(updatedCompany.website).trim(),
        })
    });
};