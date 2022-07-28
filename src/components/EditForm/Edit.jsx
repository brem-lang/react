const Edit = ({ item, close }) => {
    const {
        email,
        name,
        roles
      } = item;
    return(
        <body className="hold-transition register-page">
        <div className="register-box">
          <div className="card">
            <div className="card-body register-card-body">
                <button
                    onClick={() => close(false)}
                    style={{ float: "right", border: "none", fontSize: 15 }}
                    type="button"
                    className="btn btn-outline-info" >
                    Close
                </button>
                <br></br><br></br>
              <form >
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={email}
                    // onChange={(e) => onChangeHandler(e)}
                    autoComplete="off"
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-at"></span>
                    </div>
                  </div>
                </div>
  
                <div className="input-group mb-3">
                  <input
                    type="Name"
                    className="form-control"
                    placeholder="Email"
                    name="name"
                    value={name}
                    // onChange={(e) => onChangeHandler(e)}
                    autoComplete="off"
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                </div>
                <p>Roles</p>

                {roles.map(data => (
                    <div className="input-group mb-3" key={data.id}>
                    <input
                      type="Name"
                      className="form-control"
                      placeholder="Email"
                      name="name"
                      value={data.name}
                      // onChange={(e) => onChangeHandler(e)}
                      autoComplete="off"
                      readOnly
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user-shield"></span>
                      </div>
                    </div>
                  </div>
                ))}
  
                <div className="row">
                  <div className="col-8"></div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    )
}
export default Edit;