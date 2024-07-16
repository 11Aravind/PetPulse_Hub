import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className="container ">
		<div className="main-body">
			<div className="row">
				<div className="col-lg-4">
					<div className="card">
						<div className="card-body">
							<div className="d-flex  align-items-center text-center">
								<img src="	https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="Admin" className="rounded-circle p-1 " style={{"width":"50px" ,"height":"50px", "background":"#fff"}}/>
								<div className="mt-3" style={{"marginLeft": "24px"}}>
									<p className="text-muted font-size-sm">Hello,
                                    <h6>Aravind</h6>
                                    </p>
								</div>
							</div>
							<hr className="my-4"/>
							<ul className="list-group list-group-flush">
								
								<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 className="mb-0">My Orders</h6>
									<span className="text-secondary"> <i className="bi bi-chevron-right"></i></span>
								</li>
                                <hr className="my-4" />
								<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 className="mb-0">Manage Address</h6>
									<span className="text-secondary"><i className="bi bi-chevron-right"></i></span>
								</li>
                                <hr className="my-4" />
								<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 className="mb-0"><i className="bi bi-power"></i>Logout</h6>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="col-lg-8">
					<div className="card">
						<div className="card-body">
                           <div className=' d-flex'> <h5>Personal Informations</h5> <Link to="/">Edit</Link></div>
							<div className="row mb-3">
								<div className="col-sm-6">
                                <input type="text" className="form-control" value="Aravind "/>
								</div>
								<div className="col-sm-6 text-secondary">
									<input type="text" className="form-control" value=" AS"/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-6">
                                <input type="email" className="form-control" value="aravind@gmail.com "/>
								</div>
								<div className="col-sm-6 text-secondary">
									<input type="text" className="form-control" value="+918848310248"/>
								</div>
							</div>
							
					
					
							<div className="row">
								<div className="col-sm-3"></div>
								<div className="col-sm-9 text-secondary">
									<input type="button" className="btn btn-primary px-4" value="Save Changes"/>
								</div>
							</div>
						</div>
					</div>
					{/* <div className="row">
						<div className="col-sm-12">
							<div className="card">
								<div className="card-body">
									<h5 className="d-flex align-items-center mb-3">Project Status</h5>
									<p>Web Design</p>
									<div className="progress mb-3" style={{"height": "5px"}}>
										<div className="progress-bar bg-primary" role="progressbar" style={{"width": "80%","ariaValuenow":"80", "ariaValuemin":"0" ,"ariaValuemax":"100"} }></div>
									</div>
									<p>Website Markup</p>
									<div className="progress mb-3" style={{"height": "5px"}}>
										<div className="progress-bar bg-danger" role="progressbar" style={{"width":" 72%", "ariaValuenow":"72" ,"ariaValuemin":"0" ,"ariaValuemax":"100"}}></div>
									</div>
									<p>One Page</p>
									<div className="progress mb-3" style={{"height": "5px"}}>
										<div className="progress-bar bg-success" role="progressbar" style={{"width": "89%", "ariaValuenow":"89", "ariaValuemin":"0", "ariaValuemax":"100"}}></div>
									</div>
									<p>Mobile Template</p>
									<div className="progress mb-3" style={{"height":" 5px"}}>
										<div className="progress-bar bg-warning" role="progressbar" style={{"width": "55%", "ariaValuenow":"55" ,"ariaValuemin":"0", "ariaValuemax":"100"}}></div>
									</div>
									<p>Backend API</p>
									<div className="progress" style={{"height":" 5px"}}>
										<div className="progress-bar bg-info" role="progressbar" style={{"width": "66%" ,"ariaValuenow":"66", "ariaValuemin":"0" ,"ariaValuemax":"100"}}></div>
									</div>
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	</div>
  )
}

export default Profile
