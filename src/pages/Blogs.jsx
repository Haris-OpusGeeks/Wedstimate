import { useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import useBlogSelector from '../Redux/Selectors/useBlogSelector';
import { useDispatch } from 'react-redux';
import {base_url, convertUtcToLocalTime, createExcerpt} from '../Redux/Utils/helper';
import useCategorySelector from '../Redux/Selectors/useCategorySelector';
import { getCategoryList } from '../Redux/Reducers/categorySlice';
import {getListOfBlogs} from "../Redux/Reducers/blogSlice.js";
import defaultImg from '../assets/default.jpg';

export default function Blogs() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {blogs, isError, isSuccess, errorMessage} = useBlogSelector();
	const { id } = useParams(); // Extract id from the URL
	// const categories = JSON.parse(localStorage.getItem("vendorCategory"));

	const {categoryItem:{categories, isLoading}} = useCategorySelector();
	useEffect(()=>{
		dispatch(getCategoryList());
	}, [dispatch]);

	useEffect(()=>{
		dispatch(getListOfBlogs(id));
		console.log(id);
		console.log(blogs);
		if (isSuccess) {
			console.log(blogs);
		} else if (isError) {
			console.log(errorMessage);
		}
	}, [dispatch, id]);

	const onBlogClick =  (blog) => {
		return async () => {
			if (localStorage.getItem('singleBlog')) {
				await localStorage.removeItem('singleBlog');
				await localStorage.setItem('singleBlog', JSON.stringify(blog));
				navigate(`/blog/page/${blog.id}`);
			} else {
				await localStorage.setItem('singleBlog', JSON.stringify(blog));
				navigate(`/blog/page/${blog.id}`);
			}
		}
	}

  return (
    <main className='blogPage'>
		<div className="container margin_60_35">
			<div className="row">
				<div className="col-lg-9">
					<div className="row">
						{blogs.length > 0 ? (
							blogs.map((blog) => (
							<div className="col-md-6" key={blog.id}>
								<article className="blog">
								<figure>
									<a onClick={onBlogClick(blog)}>
									<img src={blog.imageUrl ? `${base_url}/${blog.imageUrl}` : defaultImg} alt={blog.title} />
									<div className="preview"><span>Read more</span></div>
									</a>
								</figure>
								<div className="post_info">
									<small>{blog.categoryName} - {convertUtcToLocalTime(blog.createdDate)}</small>
									<h2><a onClick={onBlogClick(blog)}>{blog.title}</a></h2>
									<p>{createExcerpt(blog.description, 100)}</p>
									<ul>
									<li>
										<div className="thumb"><img src={defaultImg} alt="" /></div> Admin
									</li>
										<li></li>
									{/*<li><i className="ti-comment"></i>20</li>*/}
									</ul>
								</div>
								</article>
							</div>
							))
						) : (
							<p>No blogs available.</p>
						)}
					</div>
				</div>

					
				<aside className="col-lg-3">
					<div className="widget search_blog">
						<div className="form-group">
							<input type="text" name="search" id="search" className="form-control" placeholder="Search.."/>
							<span><input type="submit" value="Search"/></span>
						</div>
					</div>
					<div className="widget">
						<div className="widget-title">
							<h4>Latest Post</h4>
						</div>
						<ul className="comments-list">
						{blogs.length > 0 ? (
							blogs.map((blog) => (
							<li key={blog.id}>
								<div className="alignleft">
									<a onClick={onBlogClick(blog)}><img src={blog.imageUrl ? `${base_url}/${blog.imageUrl}` : defaultImg} alt={blog.title}/></a>
								</div>
								<small>{blog.categoryName} - {convertUtcToLocalTime(blog.createdDate)}</small>
								<h3><a onClick={onBlogClick(blog)}>{createExcerpt(blog.description, 50)}</a></h3>
							</li>
							))
						): null}
						</ul>
					</div>
					<div className="widget">
						<div className="widget-title">
							<h4>Categories</h4>
						</div>
						<ul className="cats">
							{categories && categories.length > 0
								? categories.map((category, index) => (
										<li key={index} className="nav-item">
											<Link className="nav-link" to={`/blog/${category.id}`} >
											{category.name}
											</Link>
										</li>
									))
								: null}
						</ul>
					</div>
				</aside>
			</div>

		</div>
		{/* </div> */}
	</main>
  )
}
