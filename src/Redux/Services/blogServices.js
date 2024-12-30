import endPoints  from '../Constants/endpoints';
import { fetchApi } from '../Utils/helper';

class BlogServices {
  getListOfBlogs = async id => {
    console.log("running");
    const url = id ? `${endPoints.BLOGS}?categoryId=${id}` : endPoints.BLOGS;
    const response = await fetchApi({
      method: 'GET',
      endPoint: url,
    });
    return response;
  };
  createBlog = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.BLOGS,
      token: true,
      data,
      formData: true,
    });
    return response;
  };
  updateBlog = async data => {
    const response = await fetchApi({
      method: 'PUT',
      endPoint: endPoints.BLOGS,
      token: true,
      data,
      formData: true,
    });
    return response;
  };
  deleteBlog = async data => {
    const response = await fetchApi({
      method: 'DELETE',
      endPoint: `${endPoints.BLOGS}?id=${data.id}`,
      token: true,
      data,
    });
    return response;
  };
}

const blogServices = new BlogServices();
export default blogServices;