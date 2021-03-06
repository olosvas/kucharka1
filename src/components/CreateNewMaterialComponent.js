import React, {useState} from 'react'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import materialService from '../services/materialService'

const CreateNewMaterialComponent = () => {
  const [pressed, setPressed] = useState(false)
  const formik = useFormik({
    initialValues: {
      name: '',
      unit: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      unit: Yup.string().max(20, 'Must be 20 characters or less').required('Required')
    }),
    onSubmit: (values) => {
      console.log("values are - ",values)
      materialService.create(values)
    }
  });

  const createNewMaterialForm = () => {
    return(
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/> {
              formik.touched.name && formik.errors.name
                ? (<div>{formik.errors.name}</div>)
                : null
            }
          </div>
          <div>
            <label htmlFor="unit">Unit</label>
            <input id="unit" name="unit" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.unit}/> {
              formik.touched.unit && formik.errors.unit
                ? (<div>{formik.errors.unit}</div>)
                : null
            }
          </div>
          <div>
            <button type="submit">Submit new material</button>
          </div>
        </form>
      </div>
    )
  }


  return(
    <div>
      <button onClick={()=> setPressed(!pressed)}>Create new material</button>
      {
        pressed ?
        createNewMaterialForm()
        : <div> </div>
      }
    </div>
  )
}

export default CreateNewMaterialComponent
