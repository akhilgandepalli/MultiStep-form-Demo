import React, {useState} from 'react'
import './MultiStepForm.css'
import { useEffect } from 'react';

const MultiStepForm = () => {

  const [formStep, setFormStep] = useState(1);
  const [formInputs, setFormInputs] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const inputUpdate = (e) =>{
    const {name , value} = e.target;
    setFormInputs((val)=>({...val,[name]:value}));
  }

  const validate = (inputs)=>{
    let errors={};
    let emailRegex=/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;

    if(formStep>0){
      if(!inputs.firstname){
        errors.firstname='Firstname is required!';
      }
      if(!inputs.lastname){
        errors.lastname='Lastname is required!';
      }
      if(formStep>1){
        if(!inputs.email){
          errors.email='Email is required!';
        }
        if(!inputs.password){
          errors.password='Password is required!';
        }
        if(formStep>2){
          if(!inputs.terms && !inputs.rules){
            errors.checkboxes='Agree all conditions';
          }
        }
      }
    }
    return errors
  }

  // const buttonHandler = (e) =>{
  //   e.preventDefault();
  //   setFormErrors(validate(formInputs))
  //   if(Object.keys(formErrors).length === 0){
  //     setFormStep(formStep+1);
  //   } 
  //   console.log(formErrors)
  // }
  const submitHandler = (e)=>{
    e.preventDefault();
    setFormErrors(validate(formInputs))
    if(Object.keys(formErrors).length === 0){
      setFormStep(formStep+1);
    }
    console.log(formErrors);
  }
  useEffect(()=>{
    setFormErrors(validate(formInputs));
  },[formStep])

  return (
    <>
    <main>
      <h1>Welcome to the <span className='portal'>Portal</span></h1>
      <p className='sub-heading'>complete the 3 easy steps to register</p>
      <div className='form-container'>
      <form onSubmit={submitHandler}>
        {
        formStep===1?
          <>
          <div className='form-head'>Step-{formStep}</div>
          <input className='inputs' 
          type="text"
          name='firstname'
          value={formInputs.firstname || ""}
          placeholder='First Name' 
          onChange={inputUpdate}
          />
          <p className='error'>&nbsp;{formErrors.firstname}</p>
          <input className='inputs' 
          type="text" 
          name='lastname'
          value={formInputs.lastname || ""}
          placeholder='Last Name'
          onChange={inputUpdate}
          />
          <p className='error'>&nbsp;{formErrors.lastname}</p>
          <button onClick={submitHandler}>Next</button>
          </>
        :formStep === 2?
        
          <>
            <div className='form-head'>Step-{formStep}</div>

            <input className='inputs' 
            type="text"
            name='email'
            value={formInputs.email || ""}
            onChange={inputUpdate}
            placeholder='Email' 
            />
            <p className='error'>&nbsp;{formErrors.email}</p>
            <input className='inputs' 
            type="text" 
            name='password'
            value={formInputs.password || ""}
            onChange={inputUpdate}
            placeholder='Password'
            />
            <p className='error'>&nbsp;{formErrors.password}</p>

            <button onClick={submitHandler}>Next</button>
          </>
        : formStep === 3?
          <>
          <div className='form-head'>Step-{formStep}</div>
          
          <span className='checkbox-container'>
          <input 
          type="checkbox"
          id='terms'
          name='terms'
          
          onChange={inputUpdate}
          />
          <label htmlFor="terms">I agree <a href="#">terms & conditions</a></label>
          </span>
          <span className='checkbox-container'>
          <input 
          type="checkbox" 
          id='rules'
          name='rules'
          
          onChange={inputUpdate}
          />
          <label htmlFor="rules">I accepts the <a href="#">rules & regulations</a></label>
          </span>
          <p className='error'>&nbsp;{formErrors.checkboxes}</p>
  
          <button type='submit'>Create Account</button>
          </>
        

        :<>
          <div className='post-credit'>Congrats !! you have registered</div>
          <pre>{Object.entries(formInputs).map((e)=>(e[0]+' : '+e[1]+'\n'))}</pre>
          <button onClick={()=>{setFormStep(1);setFormInputs({})}}>Back</button>
        </>
        }
        </form>
      </div>
    </main>
    </>
  )
}

export default MultiStepForm