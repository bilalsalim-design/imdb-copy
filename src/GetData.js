export async function GetData(url)
{
    const response = await fetch(url,{
        method : "GET",
        headers : {
            'Accept' : "application/json"
        }
    });
    const resData = await response.json();
    if(!response.ok)
    {
        throw new Error("Failed to  fetch ");
    }
    return resData;
}