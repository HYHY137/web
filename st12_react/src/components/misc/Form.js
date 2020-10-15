import React from 'react'

export default function Form(props) {

    return (
        <form onSubmit={props.onSubmit} className={props.formClass}>
            {   
                props.fields.map( (field, index) =>{

                    return (
                        <>
                            <label htmlFor={field.label.htmlFor} className={field.label.className}>{field.label.text}</label>
                            <input  id={field.input.id} placeholder={field.input.placeholder} required={field.input.required} 
                                    className={field.input.className}  type={field.input.type} onChange={field.input.onChange} defaultValue={field.input.value}>
                            </input>
                        </>
                    )
                })
            }
                    <input type="submit" className={props.button.className} value={props.button.value}></input>
        </form>
    )
}
