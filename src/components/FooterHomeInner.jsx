import googleplay from '../assets/website/googleplay.png'
import applestore from '../assets/website/applestore.png'
import mockup from '../assets/website/wedstimate mockup.jpg';
import '../App.scss';
import '../assets/theme.css';
import { Link } from 'react-router-dom';
export default function FooterHome() {
  return (
    <>
        <footer className="plus_border">
		<div className="container-fluid margin_60_35">
			<div className="row">
				<div className="col-lg-2 col-md-6 col-sm-6">
					<h3 >Quick Links</h3>
					<div className="" id="">
						<ul className="links">
							<li><Link to={'/about'} target='_blank'>About us</Link></li>
							<li><a href="#0">My account</a></li>
							<li><a href="#0">Create account</a></li>
							<li><Link to={'/contact-us'} target='_blank'>Contacts</Link></li>
						</ul>
					</div>
				</div>
				<div className="col-lg-5 col-md-6 col-sm-6">
				</div>
				<div className="col-lg-5 col-md-6 col-sm-6">
					<div className="row">
						<div className="col-lg-4">
							<h3>Contacts</h3>
							<div className="">
								<ul className="contacts">
									<li><i className="bi bi-house-door"></i>1150 Clay Street, Unit 1404
									Oakland, CA 94607</li>
									<li><i className="bi bi-headset"></i>(415) 656-5535</li>
									<li><i className="bi bi-envelope"></i><a href="mailto:info@wedstimate.com">info@wedstimate.com</a></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-6">
							<img src={mockup} className='mockup' alt="" width={"100%"} height={320}/>
						</div>
						<div className="col-lg-2 appLinks">
							<a href="https://play.google.com/store/apps/details?id=com.rough_smoke_23947">
								<img src={googleplay} alt="" width={150} />
							</a>
							<a href="https://apps.apple.com/us/app/wedstimate-wedding-planner/id1578772552">
								<img src={applestore} alt="" width={150} />
							</a>
						</div>
					</div>
				</div>
			</div>
			<hr/>
			<div className="row">
				<div className="col-lg-6">
					<ul id="footer-selector">
						<li>
							<select className="form-select" aria-label="Default select example">
								<option value="English">English</option>
								<option value="French">French</option>
								<option value="Spanish">Spanish</option>
								<option value="Russian">Russian</option>
							</select>
						</li>
						<li>
							{/* <div className="styled-select" id="currency-selector"> */}
								{/* <select>
									<option value="US Dollars">US Dollars</option>
									<option value="Euro">Euro</option>
								</select> */}
								<select className="form-select" aria-label="Default select example">
								<option value={"US Dollars"} >US Dollars</option>
								<option value="Euro">Euro</option>
							</select>
							{/* </div> */}
						</li>
						<li><img src="img/cards_all.svg" alt=""/></li>
					</ul>
				</div>
				<div className="col-lg-6">
					<ul id="additional_links">
						<li><Link to={"/terms-of-services"}>Terms and conditions</Link></li>
						<li><Link  to={"/privacy-policy"}>Privacy</Link></li>
						{/* <li><span>© 2024 Sparker</span></li> */}
					</ul>
				</div>
			</div>
		</div>
	</footer>
    </>
  )
}
