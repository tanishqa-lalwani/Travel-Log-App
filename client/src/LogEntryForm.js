import React from "react";
import {useForm} from 'react-hook-form';
import {createLogEntry} from './api.js'
import { useState } from 'react';
import { dbs,getDocs,collection,addDoc } from './firebase'; 

// Add a new document with a generated id.


const LogEntryForm = ({location, onClose}) => {
    
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const { register, handleSubmit} = useForm();

const onSubmit = async (data) => {
    try{
        console.log(data)
        setLoading(true);
        data.latitude = location.latitude;
        data.longitude = location.longitude;
        const docRef = await addDoc(collection(dbs, "Logs"), {
            latitude: data.latitude,
            longitude: data.longitude,
            title : data.title,
            description : data.description,
            comments : data.comments,
            image:data.image,
            visitDate: data.visitDate

          });
      //  const created = await createLogEntry(data);
        //console.log(created);
        console.log("Document written with ID: ", docRef.id);

        onClose();
    } catch(error){
        console.log(error);
        setError(error.message);
        setLoading(false);
    }
}

return (
        <form onSubmit = {handleSubmit(onSubmit)} className="entry-form"> 
            {error ? <h3>{error}</h3> : null}
            <label htmlFor="title">Title</label>
            <input name="title" required ref={register}></input>
            <label htmlFor="comments">Comments</label>
            <textarea name="comments" rows={3} ref={register}></textarea>
            <label htmlFor="description">Description</label>
            <textarea name="description" rows={3} ref={register}></textarea>
            <label htmlFor="image">Image</label>
            <input name="image" ref={register}></input>
            <label htmlFor="visitDate">Visit Date</label>
            <input name="visitDate" type="date" ref={register}></input>
            <button disabled={loading} >{loading ? 'Loading...' : 'Create Log Entry'}</button>

        </form>);
};

export default LogEntryForm;