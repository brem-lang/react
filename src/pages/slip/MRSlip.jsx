import React, { useState } from "react";
import { useForm, useFieldArray} from "react-hook-form";


const MRSlip = () => {

  const { register, control, handleSubmit, formState: { errors }} = useForm();
  const onSubmit = (data) => {
    console.log(JSON.stringify(data))
  }


    return (
      <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">MR Slip</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">MR Slip</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">              
              <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* @csrf                               */}
                  <div className="card-body">                           
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input type="text" {...register("id_number", { required: "ID Number is required" })} 
                           className="form-control" placeholder="ID number" autoComplete="off"/>
                            <p>{errors.id_number?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input type="text" {...register("name_of_employee", { required: "Name of Employee is required" })}  
                          className="form-control" placeholder="Name of Employee" autoComplete="off" />
                          <p>{errors.name_of_employee?.message}</p>
                        </div> 
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input type="text" {...register("department", { required: "Department is required" })}  
                           className="form-control" placeholder="Department" autoComplete="off" />
                           <p>{errors.department?.message}</p>
                        </div> 
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input type="text" {...register("section", { required: "Section is required" })}  
                          className="form-control" placeholder="Section" autoComplete="off"/>
                          <p>{errors.section?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input type="text" {...register("asset_code", { required: "Asset Code is required" })} 
                           className="form-control" placeholder="Asset Code" autoComplete="off" />
                           <p>{errors.asset_code?.message}</p>
                        </div> 
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input type="text" {...register("asset_type", { required: "Asset Type is required" })}  
                          className="form-control" placeholder="Asset Type" autoComplete="off" />
                          <p>{errors.asset_type?.message}</p>
                        </div> 
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input type="text" {...register("asset_description", { required: "Asset Description is required" })}  
                          className="form-control" placeholder="Asset Description" autoComplete="off"/>
                          <p>{errors.asset_description?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input type="text" {...register("asset_number", { required: "Asset Number is required" })} 
                          className="form-control" placeholder="Asset Serial Number" autoComplete="off" />
                          <p>{errors.asset_number?.message}</p>
                        </div> 
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input type="text" {...register("asset_value", { required: "Asset Value is required" })} 
                           className="form-control" placeholder="Asset Value  " autoComplete="off" />
                           <p>{errors.asset_value?.message}</p>
                        </div> 
                      </div>
                    </div>                     
                    <button type="submit" className="btn btn-primary">Save and Print</button>
                  </div>
                </form>
              </div>
            </div> 
          </div>
        </div>
      </section>
      {/* /.content */}
    </div>
    );
  };
  
  export default MRSlip;