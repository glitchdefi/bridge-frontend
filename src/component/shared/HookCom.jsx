import React, { useState } from 'react';


export const useInput = ({ type = 'text', placeHolder = '' , textarea = false}) => {
    const [value, setValue] = useState('');
    
    const input = (
        <div className="form-group">
            {
                !textarea &&
                <input value={value} onChange={e => setValue(e.target.value)} type={type} placeholder={placeHolder} className="form-control" />
            }
            {
                textarea && 
                <textarea value={value} onChange={e => setValue(e.target.value)} type={type} placeholder={placeHolder} className="form-control" />
            }
 
            
                      
        </div>
    )
    
    return [value, setValue, input];
}