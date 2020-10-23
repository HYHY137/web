import React from 'react'

export default function Form(props) {

    return (
        <form onSubmit={props.onSubmit} className={props.formClass} style={props.style}>
            {
                props.fields.map((field, index) => {
                    if (field.input.dropdown) {
                        return (
                            <React.Fragment key={field.input.id}>
                                <label key={index+100}  htmlFor={field.label.htmlFor} className={field.label.className}>{field.label.text}</label>
                                <select key={index} id={field.input.id} className={field.input.className} value={field.input.value} onChange={field.input.onChange}>
                                    <option value="" selected disabled hidden></option>
                                    {
                                        field.input.options.map((option, indexSelect) => {

                                            return <option key={index + indexSelect+1000} value={option.value} className={field.input.className}>{option.text}</option>
                                        })
                                    }
                                </select>
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <React.Fragment key={field.input.id}>
                                <label key={index+100} htmlFor={field.label.htmlFor} className={field.label.className}>{field.label.text}</label>
                                <input key={index} id={field.input.id} placeholder={field.input.placeholder} required={field.input.required}
                                    className={field.input.className} type={field.input.type} step={field.input.step} onChange={field.input.onChange} defaultValue={field.input.value}>
                                </input>
                            </React.Fragment>
                        )
                    }
                })
            }
            <input type="submit" className={props.button.className} value={props.button.value}></input>
        </form>
    )
}
