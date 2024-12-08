import { SearchOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories } from '../../services/category';
import styles from './styles/sidebar.module.scss';
import { TCategoty } from '../../common/types/category';


const Sidebar = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    })

    const onSearch = (data: any) => {
        // console.log(data.query)
        navigate(`products/?query=${data.query}`);
    }

    // console.log(categories?.data?.data)

    const categories = Array.isArray(data?.data?.data) ? data.data.data.slice(0, 4) : [];


    // console.log(categories)



    if (isLoading) return <div className="">Loading...</div>
    if (isError) return <div className="">{error.message}</div>



    return (
        <>
            <div className={styles.menu}>
                <div className="container mx-auto">
                    <div className={styles.innerMenu}>
                        <div className={styles.searchBar}>
                            <form onSubmit={handleSubmit(onSearch)}>
                                <div className={styles.formControl}>
                                    <input
                                        type="text"
                                        placeholder='Hôm nay bạn muốn tìm kiếm gì?'
                                        {...register('query', { required: true })}
                                    />

                                    <div className={styles.btn}>
                                        <Button shape='round' size='middle' className={styles.searchBtn} htmlType='submit'>
                                            <SearchOutlined />
                                            Tìm kiếm
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className={styles.heading}>
                            <p>Có thể bạn quan tâm</p>
                        </div>

                        <div className={styles.content}>
                            <div className={styles.col}>
                                <b className={styles.heading}>Sản phẩm</b>
                                <ul>
                                    <li><Link to='/products' className={`${styles.linkPath} hover:underline`}>Tất cả sản phẩm</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Sản phẩm mới nhất</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Sản phẩm nổi bật</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Sản phẩm</Link></li>
                                </ul>
                            </div>

                            <div className={styles.col}>
                                <b className={styles.heading}>Danh mục</b>
                                <ul>
                                    {categories && categories?.map((item: TCategoty, index: number) => (
                                        <li key={index}><Link to={`/categories/${item._id}`} className={`${styles.linkPath} hover:underline`}>{item.name}</Link></li>
                                    ))}
                                    {/* <li><Link to='' className={`${styles.linkPath} hover:underline`}>Dành cho Nữ</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Phụ kiện, trang sức</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Khác</Link></li> */}
                                </ul>
                            </div>

                            <div className={styles.col}>
                                <b className={styles.heading}>Cửa hàng</b>
                                <ul>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Liên hệ</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>QnA</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Tư vấn</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Địa chỉ cửa hàng</Link></li>
                                </ul>
                            </div>

                            <div className={styles.col}>
                                <b className={styles.heading}>Tin tức</b>
                                <ul>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Tin tức khuyến mãi</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Blog</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Thời trang quốc tế</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Thời trang trong nước</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar