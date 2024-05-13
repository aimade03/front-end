// import { useEffect, useState } from "react";

// export default function useFetch(url){
//     const [data,setData] = useState(null)
//     const [loding,setLoding] = useState(true)
//     const [error,setError] = useState()
//     useEffect( () => {
//         fetch(url)
//         .then(res => res.json())
//         .then(data =>{
//             setData(data)
//             setLoding(false)
//             setError(null)
//         })
//         .catch( error => {
//             setLoding(false)
//             setError(error.message)
//         } )
//     },[url])
//     return { data,loding,error}
// }
import { useEffect, useState } from "react";

export default function useFetch(url){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            setData(data);
            setLoading(false);
            setError(null);
        })
        .catch(error => {
            setLoading(false);
            setError(error.message);
        });
    }, [url]);

    return { data, loading, error };
}
