import useBlogSelector from '../Redux/Selectors/useBlogSelector';
import {useDispatch} from 'react-redux';
import {base_url, convertUtcToLocalTime, createExcerpt} from '../Redux/Utils/helper';
import useCategorySelector from '../Redux/Selectors/useCategorySelector';
import {getCategoryList} from '../Redux/Reducers/categorySlice';
import {getListOfBlogs} from "../Redux/Reducers/blogSlice.js";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import defaultImg from "../assets/default.jpg";


export default function SingleBlogPage() {
    const dispatch = useDispatch();
    const {blogs, isError, isSuccess, errorMessage} = useBlogSelector();
    const singleBlog = JSON.parse(localStorage.getItem('singleBlog'));
    const {categoryItem: {categories}} = useCategorySelector();

    useEffect(() => {
        dispatch(getCategoryList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getListOfBlogs());
        if (isSuccess) {
            console.log(blogs);
        } else if (isError) {
            console.log(errorMessage);
        }
    }, [dispatch]);
    return (
        <main className='singleblog'>
            <div className="container margin_60_35">
                <div className="row">
                    <div className="col-lg-9">
                        {singleBlog ? (
                                <>
                                    <div className="singlepost" key={singleBlog.id}>
                                        <figure><img alt={singleBlog.title} className="img-fluid" src={singleBlog.imageUrl ? `${base_url}/${singleBlog.imageUrl}` : defaultImg}/></figure>
                                        <h1>{singleBlog.title}</h1>
                                        <div className="postmeta">
                                            <ul>
                                                <li><i className="ti-folder"></i> {singleBlog.categoryName}</li>
                                                <li><i className="ti-calendar"></i> {convertUtcToLocalTime(singleBlog.createdDate)}</li>
                                                {/*<li><i className="ti-user"></i> Admin</li>*/}
                                            </ul>
                                        </div>
                                        <div className="post-content">
                                            <p>
                                                {singleBlog.description}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) :
                            <p>Blog not found.</p>
                        }
                    </div>

                    <aside className="col-lg-3">
                        <div className="widget search_blog">
                            <div className="form-group">
                                <input type="text" name="search" id="search" className="form-control"
                                       placeholder="Search.."/>
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
                                                <Link to={{
                                                    pathname: `/blog/page/${blog.id}`,
                                                    state: {blog}, // Passing the blog object
                                                }} target='_blank'><img src={blog.imageUrl ? `${base_url}/${blog.imageUrl}` : defaultImg} alt={blog.title}/></Link>
                                            </div>
                                            <small>{blog.categoryName} - {convertUtcToLocalTime(blog.createdDate)}</small>
                                            <h3><Link to={{
                                                pathname: `/blog/page/${blog.id}`,
                                                state: {blog}, // Passing the blog object
                                            }} title="" target='_blank'>{createExcerpt(blog.description, 50)}</Link></h3>
                                        </li>
                                    ))
                                ) : null}
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
        </main>
    )
}
