import React, { useState } from "react";
import { useForm, useFieldArray} from "react-hook-form";

const MISlip = () => {

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
                <h1 className="m-0">MI Slip</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">MI Slip</li>
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
                            <input {...register("customer_name", { required: "Customer Name is required" })} type="text" className="form-control" placeholder="Customer Name" autoComplete="off"/>
                            <p>{errors.customer_name?.message}</p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input type="text" {...register("pallet_no", { required: "Pallet Number is required" })} className="form-control" placeholder="Pallet Number" autoComplete="off" />
                            <p>{errors.pallet_no?.message}</p>
                          </div> 
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input type="text" {...register("wh_location", { required: "Warehouse Location is required" })}  
                            className="form-control" placeholder="Warehouse Location" autoComplete="off" />
                            <p>{errors.wh_location?.message}</p>
                          </div> 
                        </div>
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input type="text" {...register("warehouse", { required: "Warehouse is required" })} 
                            className="form-control" placeholder="Warehouse" autoComplete="off"/>
                            <p>{errors.warehouse?.message}</p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input type="text" {...register("profit_center", { required: "Profit Center is required" })}  
                            className="form-control" placeholder="Profit Center" autoComplete="off" />
                            <p>{errors.profit_center?.message}</p>
                          </div> 
                        </div>
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input type="text" {...register("sub_profit_center", { required: "Sub Profit Center is required" })} 
                             className="form-control" placeholder="Sub-Profit Center" autoComplete="off"/>
                              <p>{errors.sub_profit_center?.message}</p>
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
                              <input {...register(`items.${index}.uom`,{required:true})} type="text" 
                              placeholder="UOM " className="form-control" autoComplete="off" />
                               {errors.items && <p>UOM is required</p>}
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
  
  export default MISlip;