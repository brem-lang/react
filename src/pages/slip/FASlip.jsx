import React, { useState } from "react";
import axios from "axios";
import { useForm, useFieldArray} from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const FASlip = () => {

  const { auth } = useAuth();
  const navigate = useNavigate();

  const { register, control, handleSubmit, formState: { errors }} = useForm(
    {
      defaultValues: {
        items: [{ item_code: "", item_description: "",qty:"",uom: "", remarks: ""}]
      }
    }
  );
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "items"
  });

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
          "http://172.16.0.118/api/create/wsfa",
          data,
          config
        );
  
        if (res.data.success === true) {
          Swal.fire("Slip Add", "FA slip add", "success").then(() =>
            navigate("/fa-logs")
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
                <h1 className="m-0">FA Slip</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">FA Slip</li>
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
                            <input {...register("department", { required: "Department is required" })}  
                            type="text" className="form-control" placeholder="Department" autoComplete="off" />
                             <p>{errors.department?.message}</p>
                          </div> 
                        </div>
                        <div className="col-6">
                          <div className="form-floating mb-3">
                            <input name="mr_no" {...register("mr_no", { required: "MR is required" })} type="number" 
                            className="form-control" placeholder="MR Number" autoComplete="off" />
                             <p>{errors.mr_no?.message}</p>
                          </div> 
                        </div>
                      </div>
                      {/*Dynamic Fields Begin*/}
                      <div className="row">
                        <div className="col text-right">
                          <div className="form-floating mb-3">
                          <button onClick={(e) => {
                            e.preventDefault()
                            append({ item_code: "", item_description: "", qty: "", uom: "", remarks: "" });
                          }} class="btn btn-success">Add Fields..
                          </button>
                          </div>
                        </div>
                      </div>
                      {fields.map((items, index) => {     
                        return(
                          <div className="row" key={items.id}>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input {...register(`items.${index}.item_code`,{required:true})}  type="text" 
                              placeholder="Item Code" className="form-control" autoComplete="off" />
                              {errors.items && <p>Item Code is required</p>}
                            </div> 
                          </div>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input {...register(`items.${index}.item_description`,{required:true})} type="text" 
                              placeholder="Item Description" className="form-control" autoComplete="off" />
                              {errors.items && <p>Item Description is required</p>}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input {...register(`items.${index}.qty`,{required:true})} type="text" 
                              placeholder="Qty" className="form-control" autoComplete="off" />
                              {errors.items && <p>Qty is required</p>}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input {...register(`items.${index}.serial_no`,{required:true})} type="text" 
                              placeholder="Serial Number " className="form-control" autoComplete="off" />
                               {errors.serial_no && <p>Serial is required</p>}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input type="text" {...register(`items.${index}.remarks`,{required:true})} 
                              placeholder="Remarks" className="form-control" autoComplete="off" />
                               {errors.items && <p>Remarks is required</p>}
                            </div>
                          </div>
                          <div className="col-md-auto">
                            <div className="form-floating ">
                              <button onClick={() => remove(index)} class="btn btn-danger">Remove</button>
                            </div>
                          </div>
                        </div>
                        )
                      })}

                      {/*Dynamic Fields End*/}

                      <div className="row">
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input type="text" {...register("prepared_by", { required: "Prepared by is required" })} 
                            placeholder="Prepared by" className="form-control" autoComplete="off" />
                             <p>{errors.prepared_by?.message}</p>
                          </div> 
                        </div>
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input type="text" {...register("approved_by", { required: "Approved by is required" })}
                             placeholder="Approved by" className="form-control" autoComplete="off" />
                              <p>{errors.approved_by?.message}</p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input {...register("released_by", { required: "Release by is required" })} type="text" 
                            placeholder="Release by" className="form-control" autoComplete="off" />
                              <p>{errors.released_by?.message}</p>
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

    );
  };
  
  export default FASlip;