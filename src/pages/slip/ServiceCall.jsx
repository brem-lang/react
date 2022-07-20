import React, { useState } from "react";
import axios from "axios";
import { useForm, useFieldArray} from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ServiceCall() {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const { register, control, handleSubmit, formState: { errors }} = useForm();
      // Submit using axios
      const onSubmit = async (data) => {
        // console.log(JSON.stringify(data))
        let config = {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        };
    
        try {
          const res = await axios.post(
            "http://172.16.0.118/api/create/servicecall",
            data,
            config
          );
    
          if (res.data.success === true) {
            Swal.fire("Slip Add", "Service Call slip add", "success").then(() =>
              navigate("/mr-logs")
            );
          }
          console.log(res);
        } catch (err) {
          console.error(err);
        }
      };

  return (
    <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0">Service Call</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Service Call</li>
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
                                <input type="text"  {...register("customer_name", { required: "Customer Name is required" })} 
                                   className="form-control" placeholder="Customer Name" autoComplete="off"/>
                                    <p>{errors.customer_name?.message}</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="number"  {...register("contact_number", { required: "Contact Number is required" })}  
                                 className="form-control" placeholder="Contact Number" autoComplete="off" />
                                    <p>{errors.contact_number?.message}</p>
                            </div> 
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text"  {...register("phone_no", { required: "Phone Number is required" })} 
                                  className="form-control" placeholder="Phone number" autoComplete="off" />
                                    <p>{errors.phone_no?.message}</p>
                            </div> 
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text"  {...register("status", { required: "Status is required" })} 
                                  className="form-control" placeholder="Status" autoComplete="off" />
                                    <p>{errors.status?.message}</p>
                            </div> 
                        </div>
                    </div>     
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text"  {...register("item_no", { required: "Item Number is required" })}   
                                 className="form-control" placeholder="Item number" autoComplete="off"/>
                                    <p>{errors.item_no?.message}</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text"  {...register("description", { required: "Description is required" })}  
                                 className="form-control" placeholder="Description" autoComplete="off" />
                                    <p>{errors.description?.message}</p>
                            </div> 
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text"{...register("mfr_serial_no", { required: "MFR Serial Number is required" })} 
                                  className="form-control" placeholder="Mfr Serial number" autoComplete="off" />
                                    <p>{errors.mfr_serial_no?.message}</p>
                            </div> 
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text"  {...register("serial_no", { required: "Serial Number is required" })}  
                                 className="form-control" placeholder="Serial number" autoComplete="off" />
                                    <p>{errors.serial_no?.message}</p>
                            </div> 
                        </div>
                    </div>        
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text"  {...register("subject", { required: "Subject is required" })}  
                                 className="form-control" placeholder="Subject" autoComplete="off"/>
                                    <p>{errors.subject?.message}</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text"  {...register("origin", { required: "Origin is required" })}
                                 className="form-control" placeholder="Origin" autoComplete="off" />
                                    <p>{errors.origin?.message}</p>
                            </div> 
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text"  {...register("problem_type", { required: "Problem Type is required" })} 
                                className="form-control" placeholder="Problem Type" autoComplete="off" />
                                    <p>{errors.problem_type?.message}</p>
                            </div> 
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" {...register("assigned_to", { required: "Assigned to is required" })} 
                                className="form-control" placeholder="Assigned to" autoComplete="off" />
                                    <p>{errors.assigned_to?.message}</p>
                            </div> 
                        </div>
                    </div>        
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" {...register("priority", { required: "Priority is required" })} 
                                 className="form-control" placeholder="Priority" autoComplete="off"/>
                                    <p>{errors.priority?.message}</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input  type="text" {...register("call_type", { required: "Call Type is required" })} 
                                className="form-control" placeholder="Call type" autoComplete="off" />
                                     <p>{errors.call_type?.message}</p>
                            </div> 
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input  type="text"  {...register("technician", { required: "Technician is required" })}  
                                className="form-control" placeholder="Technician" autoComplete="off" />
                                    <p>{errors.technician?.message}</p>
                            </div> 
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input  type="text" {...register("remarks", { required: "Remarks is required" })} 
                                 className="form-control" placeholder="Remarks" autoComplete="off" />
                                    <p>{errors.remarks?.message}</p>
                            </div> 
                        </div>
                    </div>     
                    <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
                </div>
            </div> 
            </div>
        </div>
        </section>
    {/* /.content */}
  </div>
  )
}
