import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { contactUs } from "../Redux/Reducers/profileSlice.js";

export default function Contact() {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			name_contact: '',
			lastname_contact: '',
			email_contact: '',
			phone_contact: '',
			message_contact: ''
		},
		validationSchema: Yup.object({
			name_contact: Yup.string().required('First name is required'),
			lastname_contact: Yup.string(),
			email_contact: Yup.string().email('Invalid email address').required('Email is required'),
			phone_contact: Yup.string().required('Phone number is required'),
			message_contact: Yup.string().required('Message is required')
		}),
		onSubmit: (values) => {
			console.log("clicked")
			const requestData = {
				firstName : values.name_contact,
				lastName : values.lastname_contact,
				email : values.email_contact,
				phoneNumber : values.phone_contact,
				message : values.message_contact,
			}

			dispatch(contactUs(requestData))
				.then(()=>{
					console.log("done");
				})
				.catch((error) => {
					console.error("Failed to send Message:", error);
				});
		}
	});

	return (
		<main className="contactPage">
			<div className="container margin_60_35">
				<div className="row justify-content-center">
					<div className="col-xl-5 col-lg-6 pr-xl-5">
						<div className="main_title_3">
							<span></span>
							<h2>Send us a message</h2>
							<p>Have questions or need assistance? Our dedicated support team is here to help.</p>
						</div>
						<form onSubmit={formik.handleSubmit} autoComplete="off">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label>Name</label>
										<input
											className="form-control"
											type="text"
											id="name_contact"
											name="name_contact"
											value={formik.values.name_contact}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
										{formik.touched.name_contact && formik.errors.name_contact ? (
											<div className="error">{formik.errors.name_contact}</div>
										) : null}
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label>Last name</label>
										<input
											className="form-control"
											type="text"
											id="lastname_contact"
											name="lastname_contact"
											value={formik.values.lastname_contact}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
										{formik.touched.lastname_contact && formik.errors.lastname_contact ? (
											<div className="error">{formik.errors.lastname_contact}</div>
										) : null}
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label>Email</label>
										<input
											className="form-control"
											type="email"
											id="email_contact"
											name="email_contact"
											value={formik.values.email_contact}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
										{formik.touched.email_contact && formik.errors.email_contact ? (
											<div className="error">{formik.errors.email_contact}</div>
										) : null}
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label>Telephone</label>
										<input
											className="form-control"
											type="text"
											id="phone_contact"
											name="phone_contact"
											value={formik.values.phone_contact}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
										{formik.touched.phone_contact && formik.errors.phone_contact ? (
											<div className="error">{formik.errors.phone_contact}</div>
										) : null}
									</div>
								</div>
							</div>
							<div className="form-group">
								<label>Message</label>
								<textarea
									className="form-control"
									id="message_contact"
									name="message_contact"
									style={{ height: '150px' }}
									value={formik.values.message_contact}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								></textarea>
								{formik.touched.message_contact && formik.errors.message_contact ? (
									<div className="error">{formik.errors.message_contact}</div>
								) : null}
							</div>
							<p className="add_top_30">
								<input type="submit" className="btn_1 rounded" value="Submit" />
							</p>
						</form>
					</div>
					<div className="col-xl-5 col-lg-6 pl-xl-5">
						<div className="box_contacts">
							<i className="ti-support"></i>
							<h2>Need Help?</h2>
							<a href="tel:(415) 656-5535">(415) 656-5535</a> - <a href="mailto:info@wedstimate.com">info@wedstimate.com</a>
						</div>
						<div className="box_contacts">
							<i className="ti-home"></i>
							<h2>Address</h2>
							<a href="#0">1150 Clay Street, Unit 1404 <br/>Oakland, CA 94607</a>
						</div>
						<div className="box_contacts">
							<i className="ti-thumb-up"></i>
							<h2>Follow Us</h2>
							<div className="d-flex">
								<a href="https://www.facebook.com/Wedstimate" target='_blank'>
									<i className="ti-facebook"></i>
								</a>
								<a href="https://www.instagram.com/wedstimate/" target='_blank'>
									<i className="ti-instagram"></i>
								</a>
								<a href="https://twitter.com/wedstimate" target='_blank'>
									<i className="ti-twitter"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
