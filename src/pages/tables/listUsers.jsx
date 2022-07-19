import React  from 'react'
import { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function ListUsers() {

  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    
    <div className='content-wrapper'>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">List of Users</h1>
          </div>{/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">List of Users</li>
            </ol>
          </div>{/* /.col */}
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>

    <section className='content'>
        <div className='container-fluid'>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">DataTable with default features</h3>   
                            <div className="card-tools">
                                  <button onClick={showModal} type="submit" className="btn btn-success">
                                    Add User
                                  </button>                 
                            </div>
                        </div>    
                        <div className="card-body">
                        <table id="example1" className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Trident</td>
                                <td>Internet Explorer 4.0</td>
                                <td>
                                <i class="fas fa-pen"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>Trident</td>
                                <td>Internet Explorer 4.0</td>
                                <td>
                                <i class="fas fa-pen"></i>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>                        
                    </div>
                </div>           
            </div>
        </div>
    </section>
    <Modal show={isOpen} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>Hi</Modal.Title>
            </Modal.Header>
        <Modal.Body>
          <form>
            <div class="card-body">
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />

              </div>
                <div class="form-group">
                  <label>Roles</label>
                    <select class="form-control">
                      <option>option 1</option>
                      <option>option 2</option>
                      <option>option 3</option>
                      <option>option 4</option>
                      <option>option 5</option>
                    </select>
                </div>
              </div>
            </form>
          </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success">Save</button>
          <button onClick={hideModal} className="btn btn-danger">Cancel</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default ListUsers;