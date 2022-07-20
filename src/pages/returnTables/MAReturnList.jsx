import React from 'react'

function MAReturnList() {
  return (
    <div className='content-wrapper'>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">MA Return Slip Log</h1>
          </div>{/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">MA Return Slip Log</li>
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
                        </div>    
                        <div className="card-body">
                        <table id="example1" className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>Document Series No</th>
                                <th>Prepared by</th>
                                <th>Approved by</th>
                                <th>Release by</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Trident</td>
                                <td>Internet Explorer 4.0</td>
                                <td>Win 95+</td>
                                <td>GFI+DateToday+Document Series No</td>
                                <td>
                                <i class="fas fa-file-pdf"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>Trident</td>
                                <td>Internet Explorer 4.0</td>
                                <td>Win 95+</td>
                                <td>GFI+DateToday+Document Series No</td>
                                <td>
                                <i class="fas fa-file-pdf"></i>
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
    </div>
  )
}

export default MAReturnList