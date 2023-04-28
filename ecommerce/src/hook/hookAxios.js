import { useEffect, useState } from "react"
import axios from 'axios';

const useAxios = (url)=>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        isError: false,
        message:""
    })

    useEffect(()=>{
        const source = axios.CancelToken.source();

        const getData = async (url)=>{
            setIsLoading(true);
            try {
                const res = await axios.get(url, { cancelToken: source.token });
                console.log(res.data);
                setData(res.data);
            } catch (err) {
                setError({
                    isError:true,
                    message:err.message ||"There was an error"
                })
            }
            setIsLoading(false);
        };
        getData(url);

        return () => {
            source.cancel("Component unmounted, canceling request");
        };
    }, [url]);
    return {data, isLoading, error}
}

export default useAxios;
