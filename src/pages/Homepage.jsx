import { Swiper, SwiperSlide } from 'swiper/react'
import vendor1 from '../assets/website/ceremonyvendor.png';
import vendor2 from '../assets/website/ceremonyvendor1.jpeg';
import vendor3 from '../assets/website/ceremonyvendor2.png';
import vendor4 from '../assets/website/ceremonyvendor4.png';
import vendor5 from '../assets/website/img2.png';
import vendor6 from '../assets/website/img3.png';
import kevin from '../assets/website/kevin.png';
import photbooth from '../assets/website/photobooth_pixel.png';
import sally from '../assets/website/SallySparksDealphoto.png';
import urban from '../assets/website/urbanworldwide_deal.png';
import spring from '../assets/website/CrystalSpringsCateringDeal.png';
import { Pagination, Autoplay } from 'swiper/modules';
import blog1 from '../assets/website/blog1.webp';
import blog2 from '../assets/website/blog2.webp';
import blog3 from '../assets/website/blog3.webp';
import blog4 from '../assets/website/blog4.webp';
import '../App.scss';
import '../assets/theme.css';
import { Link, useNavigate } from 'react-router-dom';
import { getCategoryList } from '../Redux/Reducers/categorySlice';
import { useDispatch } from 'react-redux';
import useCategorySelector from '../Redux/Selectors/useCategorySelector';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'

export default function Homepage() {
	const {categoryItem : {categories, isLoading}} = useCategorySelector();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(getCategoryList());
		if (categories) {
			if (categories.length > 0) {
				localStorage.setItem("vendorCategory", JSON.stringify(categories));
			}
		}
		console.log(categories);
	}, [dispatch]);

	const formik = useFormik({
        initialValues: {
            category: "1f6824da-6bf8-47ff-a0ce-491f7ad23574",
            zipCode: '',
        },
        validationSchema: Yup.object({
            category: Yup.string(),
            zipCode: Yup.number().positive('Zip code must be positive').integer('Zip code must be an integer'),
        }),
        onSubmit: (values) => {
            console.log(values);
			navigate(`/categories/build-wedding/category/${values.category}/${values.zipCode}`);
        },
    });
  return (
    <>
        <main>
		<section className="hero_single version_2">
			<div className="wrapper">
				<div className="container">
					<h3>Let us help make your wedding dreams a reality!</h3>
					{/* <p>Let us help you find the wedding professionals that make your dreams come true!</p> */}
					<form  onSubmit={formik.handleSubmit}>
						<div className="row g-0 custom-search-input-2">
							<div className="col-lg-4">
								<div className="form-group">
									<select
										name="category"
										id="category"
										className='wide'
										value={formik.values.category}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									>
										{categories.length > 0 ? categories.map((category, index) => (
											<option key={index} value={category.id}>{category.name}</option>
										)) : null}
									</select>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group">
									<input
										className="form-control"
										type="number"
										name="zipCode" // Bind this field to Formik
										placeholder="Location/Zip code"
										value={formik.values.zipCode} // Formik value
										onChange={formik.handleChange} // Formik change handler
										onBlur={formik.handleBlur} // Formik blur handler
									/>
									<i className="icon_pin_alt"></i>
								</div>
								{formik.touched.zipCode && formik.errors.zipCode ? (
									<div className="error">{formik.errors.zipCode}</div>
								) : null}
							</div>
							<div className="col-lg-4">
								<button type="submit" className='btn'>Search</button>
							</div>
						</div>
						{formik.touched.category && formik.errors.category ? (
							<div className="error">{formik.errors.category}</div>
						) : null}
					</form>
				</div>
			</div>
		</section>
		
		<div className="bg_color_1">
			<div className="container margin_80_55">
				<div className="main_title_2">
					<span><em></em></span>
					<h2>Check out some of our favorite vendors</h2>
					<p>Find and book the best wedding vendors using Wedstimate.com. Here are just a few of our favorites.</p>
				</div>
				<div className="row">
					<div className="col-lg-4 col-md-6">
						<a href="https://www.rassasy.com/" className="grid_item" target='_blank'>
							<figure>
								<img src={vendor1} alt=""/>
								<div className="info">
									<h3>Rassasy Cakes</h3>
								</div>
							</figure>
						</a>
					</div>
					<div className="col-lg-4 col-md-6">
						<a href="https://www.total-dj.com/" className="grid_item" target='_blank'>
							<figure>
								<img src={vendor2} alt=""/>
								<div className="info">
									<h3>Total DJ</h3>
								</div>
							</figure>
						</a>
					</div>
					<div className="col-lg-4 col-md-6">
						<a href="https://www.ybarraevents.com/" className="grid_item" target='_blank'>
							<figure>
								<img src={vendor3} alt=""/>
								<div className="info">
									<h3>Ybarra Events</h3>
								</div>
							</figure>
						</a>
					</div>
					<div className="col-lg-4 col-md-6">
						<a href="https://villachanticleer.com/" className="grid_item" target='_blank'>
							<figure>
								<img src={vendor4} alt=""/>
								<div className="info">
									<h3>Villa Chanticleer</h3>
								</div>
							</figure>
						</a>
					</div>
					<div className="col-lg-4 col-md-6">
						<a href="https://www.bloomphotographyca.com" className="grid_item" target='_blank'>
							<figure>
								<img src={vendor5} alt=""/>
								<div className="info">
									<h3>Bloom Photography</h3>
								</div>
							</figure>
						</a>
					</div>
					<div className="col-lg-4 col-md-6">
						<a href="http://jamesstandfield.azurewebsites.net/" className="grid_item" target='_blank'>
							<figure>
								<img src={vendor6} alt=""/>
								<div className="info">
									<h3>James Stanfield Catering</h3>
								</div>
							</figure>
						</a>
					</div>
				</div>
			</div>
		</div>

		<div className="container-fluid margin_80_55">
			<div className="main_title_2">
				<span><em></em></span>
				<h2>Popular Wedding Deals</h2>
				<p>Let us help you find the best wedding professionals in your area</p>
			</div>
			<Swiper className=""
                loop={true}
                spaceBetween={20}
                slidesPerView={4.5}
				autoplay={{ delay: 3000 }} 
				// loopAdditionalSlides={4}
				modules={[Pagination, Autoplay]}
				pagination={{ clickable: true }}
				breakpoints={{
					320: {
						slidesPerView: 1,
						spaceBetween: 10,
					},
					480: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1024: {
						slidesPerView: 4.5,
						spaceBetween: 20,
					},
				}}
            >
				<SwiperSlide>
					<div className="strip grid">
						<figure>
							{/* <a href="detail-restaurant.html" className="wish_bt"></a> */}
							<a href="detail-restaurant.html" target='_blank'><img src={kevin} className="img-fluid" alt="" width="400" height="266"/><div className="read_more"><span>Read more</span></div></a>
							{/* <small>Restaurant</small> */}
						</figure>
						<div className="wrapper">
							<h3><a href="detail-restaurant.html" target='_blank'>Kevin Mccullough, Jazz Pianist</a></h3>
							<p>$100 OFF!</p>
							{/* <a className="address" href="https://www.google.com/maps/dir//Assistance+%E2%80%93+H%C3%B4pitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x47e66e1de36f4147:0xb6615b4092e0351f!2sAssistance+Publique+-+H%C3%B4pitaux+de+Paris+(AP-HP)+-+Si%C3%A8ge!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361">Get directions</a> */}
						</div>
						{/* <ul>
							<li><span className="loc_open">Now Open</span></li>
							<li><div className="score"><span>Superb<em>350 Reviews</em></span><strong>8.9</strong></div></li>
						</ul> */}
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="strip grid">
						<figure>
							{/* <a href="detail-restaurant.html" className="wish_bt"></a> */}
							<a href="detail-restaurant.html" target='_blank'><img src={photbooth} className="img-fluid" alt="" width="400" height="266"/><div className="read_more"><span>Read more</span></div></a>
							{/* <small>Restaurant</small> */}
						</figure>
						<div className="wrapper">
							<h3><a href="detail-restaurant.html" target='_blank'>Photobooth-Pixel</a></h3>
							<p>5% discount for Wedstimate couple</p>
							{/* <a className="address" href="https://www.google.com/maps/dir//Assistance+%E2%80%93+H%C3%B4pitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x47e66e1de36f4147:0xb6615b4092e0351f!2sAssistance+Publique+-+H%C3%B4pitaux+de+Paris+(AP-HP)+-+Si%C3%A8ge!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361">Get directions</a> */}
						</div>
						{/* <ul>
							<li><span className="loc_open">Now Open</span></li>
							<li><div className="score"><span>Superb<em>350 Reviews</em></span><strong>8.9</strong></div></li>
						</ul> */}
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="strip grid">
						<figure>
							{/* <a href="detail-restaurant.html" className="wish_bt"></a> */}
							<a href="detail-restaurant.html" target='_blank'><img src={spring} className="img-fluid" alt="" width="400" height="266"/><div className="read_more"><span>Read more</span></div></a>
							{/* <small>Restaurant</small> */}
						</figure>
						<div className="wrapper">
							<h3><a href="detail-restaurant.html" target='_blank'>Crystal Springs Catering</a></h3>
							<p>10% Discount</p>
							{/* <a className="address" href="https://www.google.com/maps/dir//Assistance+%E2%80%93+H%C3%B4pitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x47e66e1de36f4147:0xb6615b4092e0351f!2sAssistance+Publique+-+H%C3%B4pitaux+de+Paris+(AP-HP)+-+Si%C3%A8ge!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361">Get directions</a> */}
						</div>
						{/* <ul>
							<li><span className="loc_open">Now Open</span></li>
							<li><div className="score"><span>Superb<em>350 Reviews</em></span><strong>8.9</strong></div></li>
						</ul> */}
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="strip grid">
						<figure>
							{/* <a href="detail-restaurant.html" className="wish_bt"></a> */}
							<a href="detail-restaurant.html" target='_blank'><img src={sally} className="img-fluid" alt="" width="400" height="266"/><div className="read_more"><span>Read more</span></div></a>
							{/* <small>Restaurant</small> */}
						</figure>
						<div className="wrapper">
							<h3><a href="detail-restaurant.html" target='_blank'>Sally Sparks</a></h3>
							<p>3% Discount for Wedstimate couple</p>
							{/* <a className="address" href="https://www.google.com/maps/dir//Assistance+%E2%80%93+H%C3%B4pitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x47e66e1de36f4147:0xb6615b4092e0351f!2sAssistance+Publique+-+H%C3%B4pitaux+de+Paris+(AP-HP)+-+Si%C3%A8ge!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361">Get directions</a> */}
						</div>
						{/* <ul>
							<li><span className="loc_open">Now Open</span></li>
							<li><div className="score"><span>Superb<em>350 Reviews</em></span><strong>8.9</strong></div></li>
						</ul> */}
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="strip grid">
						<figure>
							{/* <a href="detail-restaurant.html" className="wish_bt"></a> */}
							<a href="detail-restaurant.html" target='_blank'><img src={urban} className="img-fluid" alt="" width="400" height="266"/><div className="read_more"><span>Read more</span></div></a>
							{/* <small>Restaurant</small> */}
						</figure>
						<div className="wrapper">
							<h3><a href="detail-restaurant.html" target='_blank'>UrbanBCN Worldwide</a></h3>
							<p>10% Discount!</p>
							{/* <a className="address" href="https://www.google.com/maps/dir//Assistance+%E2%80%93+H%C3%B4pitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x47e66e1de36f4147:0xb6615b4092e0351f!2sAssistance+Publique+-+H%C3%B4pitaux+de+Paris+(AP-HP)+-+Si%C3%A8ge!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361">Get directions</a> */}
						</div>
						{/* <ul>
							<li><span className="loc_open">Now Open</span></li>
							<li><div className="score"><span>Superb<em>350 Reviews</em></span><strong>8.9</strong></div></li>
						</ul> */}
					</div>
				</SwiperSlide>
			</Swiper>
			<div className="container">
				{/* <div className="btn_home_align"><a href="grid-listings-filterscol.html" className="btn_1 rounded" target='_blank'>View all</a></div> */}
			</div>
		</div>
		
		<div className="call_section pattern">
			<div className="wrapper">
				<div className="container margin_80_55">
					<div className="main_title_2">
						<span><em></em></span>
						<h2>Why Wedstimate?</h2>
						{/* <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p> */}
					</div>
					<div className="row">
						<div className="col-md-4">
							<div className="box_how">
								{/* <i className="pe-7s-search"></i> */}
								<h3>We Save Couples <br/>Time & Money</h3>
								<p>Couples download the Wedstimate app, for free, to quickly find the vendors that are most suited to their tastes, and to get special pricing on wedding packages.</p>
								<span></span>
							</div>
						</div>
						<div className="col-md-4">
							<div className="box_how">
								{/* <i className="pe-7s-info"></i> */}
								<h3>We Actively Connect <br/>Couples & Vendors</h3>
								<p>Other directories wait for couples and vendors to match. Based on key data points we ensure that vendors and couples get appropriate matches.</p>
								<span></span>
							</div>
						</div>
						<div className="col-md-4">
							<div className="box_how">
								{/* <i className="pe-7s-like2"></i> */}
								<h3>We Save Vendors <br/>Time & Money</h3>
								<p>Wedstimate is a less expensive alternative to other wedding directories vendors are guaranteed at least 5 leads per month from couples that match their services.</p>
							</div>
						</div>
					</div>
					{/* <p className="text-center add_top_30 wow bounceIn" data-wow-delay="0.5"><a href="register.html" className="btn_1 rounded" target='_blank'>Register Now</a></p> */}
				</div>
			</div>
		</div>
		
		<div className="container margin_80_55">
			<div className="main_title_2">
				<span><em></em></span>
				<h2>Wedstimate News</h2>
				<p>Wedding news, tips, and trends!</p>
			</div>
			<div className="row">
				<div className="col-lg-6">
					<Link to={'/blog/page'} className="box_news" target='_blank'>
						<figure><img src={blog1} alt=""/>
						</figure>
						<ul>
							{/* <li>Restaurants</li> */}
							<li>20.11.2017</li>
						</ul>
						<h4>Wedstimate's Top 10 Wedding Planning Tips</h4>
						<p>Planning a wedding can be both exciting and overwhelming for couples. To help you navigate through the intricacies of wedding planning,...</p>
					</Link>
				</div>
				<div className="col-lg-6">
					<Link to={'/blog/page'} className="box_news" target='_blank'>
						<figure><img src={blog2} alt=""/>
						</figure>
						<ul>
							{/* <li>Shops</li> */}
							<li>20.11.2017</li>
						</ul>
						<h4>Discover the Leads You've Gotten this Holiday Season!</h4>
						<p>Wishing you a season filled with joy, prosperity, and lots of happy moments! 🎄 As the year comes to a close, we wanted to express our...</p>
					</Link>
				</div>
				<div className="col-lg-6">
					<Link to={'/blog/page'} className="box_news" target='_blank'>
						<figure><img src={blog3} alt=""/>
						</figure>
						<ul>
							{/* <li>Shops</li> */}
							<li>20.11.2017</li>
						</ul>
						<h4>How to Choose the Right Wedding Dance Package for Your Needs</h4>
						<p>Your wedding day is one of the most important and memorable occasions of your life. Every aspect, including the wedding dance, plays a...</p>
					</Link>
				</div>
				<div className="col-lg-6">
					<Link to={'/blog/page'} className="box_news" target='_blank'>
						<figure><img src={blog4} alt=""/>
						</figure>
						<ul>
							{/* <li>Bars</li> */}
							<li>20.11.2017</li>
						</ul>
						<h4>2023 Wedding App of the Year!</h4>
						<p>Wedstimate Named 2023 Wedding App of the Year by LuxLife Magazine Oakland, CA, June 9, 2023 - Wedstimate, a leading wedding planning app,...</p>
					</Link>
				</div>
			</div>
			<p className="btn_home_align"><Link to={'/blog'} className="btn_1 rounded" target='_blank'>View all Blogs</Link></p>
		</div>
	</main>
    </>
  )
}
