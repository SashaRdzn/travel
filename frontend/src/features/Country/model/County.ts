class Country{
    static async getCountry(){
        const response =  await fetch(`${import.meta.env.VITE_SERVER_URL_CATALOG}/country/`,{
            method:'GET',
            headers:{
                'Content-type':'application/json',
            }
        })
        const data =  await response.json()
        if(response.status===200){
        }
        return data
    }
}



export default Country