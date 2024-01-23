import React, { useRef, useState } from 'react';
import default_image from '../Assets/Image2.jpg';
import './ImageGenerator.css';
const ImageGenerator = () => {

    const [image_url, setImage_url]=useState("/");
    let inputRef = useRef(null)

    const [loading,setLoading]= useState(false);

    const ImageGenerator = async() =>{
        if(inputRef.current.value===""){
            return 0;
        }
        setLoading(true);

        

        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
           {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer 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 ",
                "User-Agent": "Chrome",
            },
            body:JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n:1,
                size:"512x512"
            }),
            } 
        );
        let data = await response.json();
        let data_array = data.data;    
        setImage_url(data_array[0].url);  
        setLoading(false);  
        console.log(data);
    }

  return (
    <div className='ai-image-generator'>
        <div className='header'>
            Ai image <span>generator</span>
        </div>

        <div className='img-loading'>
            <div className='image'><img src={image_url==="/"?default_image:image_url} alt=''></img></div>
            <div className='loading'>
                <div className={loading?"loading-bar-full":"loading-bar"} ></div>
                <div className={loading?"loading-text":"display-none"}>Loading</div>
            </div>
        </div>
        <div className='search-box'>
            <input type='text' ref={inputRef} className='search-input' placeholder='Describe your prompt here'/>
            <div className="generate-btn" onClick={()=>{ImageGenerator()}}>Generate</div>
        </div>
    </div>
  )
}

export default ImageGenerator