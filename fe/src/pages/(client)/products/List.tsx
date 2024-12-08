import { HeartOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TProduct } from '../../../common/types/product';
import { getProducts } from '../../../services/product';
import styles from '../styles/listP.module.scss';
import instance from '../../../configs/axios';

const List = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState('default')
    const navigate = useNavigate();

    const useQueryParams = () => {
        const { search } = useLocation();
        return new URLSearchParams(search);
    };

    const queryParams = useQueryParams();
    const searchQuery = queryParams.get('query') || '';

    const { data, isLoading, isError, error, isFetching, isPending } = useQuery({
        queryKey: ['products', searchQuery, sort],
        queryFn: () => getProducts({ query: searchQuery }),
        enabled: true
    })

    // Xử lý dữ liệu sau khi data thay đổi
    useEffect(() => {
        if (data) {
            setProducts(data?.data?.data || []);
        }
    }, [data]);

    useEffect(() => {
        if (!searchQuery) {
            setProducts([]); // Hoặc giữ lại dữ liệu nếu cần
        }
    }, [searchQuery]);


    const redirectTo = (product: TProduct) => {
        // chuyển hướng tới chi tiết sản phẩm qua _id
        navigate(`/products/details/${product._id}`);

        //Sau khi click sản phẩm đã chọn, thông tin sản phẩm sẽ được lưu vào trong storage
        // có mục đích lưu lịch sử sản phẩm đã xem

        // Lấy danh sách sp đã lưu trong storage
        const recentProducts = localStorage.getItem('products_watched');
        const products = recentProducts ? JSON.parse(recentProducts) : [];

        // Không lưu lại sản phẩm đã xem trước đó thêm lần nữa
        const updateRecentProducts = products.filter((item: TProduct) => item._id !== product._id)

        updateRecentProducts.unshift(product)

        // Giới hạn = 4
        if (updateRecentProducts.length > 4) {
            updateRecentProducts.pop()
        }

        // Cập nhật storage
        localStorage.setItem('products_watched', JSON.stringify(updateRecentProducts));
    }

    // const productsData = data?.data?.data;

    const onChange = (e: any) => {
        // console.log(e.target.value)
        const { value } = e.target;
        setSort(value);
        // console.log('value: ', value)
    }

    // console.log(sort)

    // Add to wishlist
    const { mutate } = useMutation({
        mutationFn: async (data: TProduct) => {
            try {

                return await instance.put(`/products/${data._id}`, data)

            } catch (error) {
                throw new Error
            }
        },
        onError: (error) => {
            messageApi.open({
                type: 'error',
                content: `${error}`,
            });
        },
        onSuccess: () => {
            messageApi.open({
                type: 'success',
                content: `Thêm sản phẩm yêu thích thành công!`,
            });
            queryClient.invalidateQueries({
                queryKey: ['products']
            })
        }
    })

    const addToWishlist = (product: TProduct) => {
        console.log(product);

        mutate({...product, category: product?.category?._id, isFavorite: true})
    }

    return (
        <>
            {contextHolder}
            <Spin spinning={isLoading ?? isFetching ?? isPending ? true : false} size='large'>
                <div className="container mx-auto">
                    <div className="py-16">
                        <div className="flex justify-between items-center">
                            <div className="">
                                <h3 className='text-2xl font-semibold'>Tất cả sản phẩm</h3>
                                <p>Đang hiển thị <span className='font-semibold'>{products.length}</span> sản phẩm</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <span className='font-semibold'>Sắp xếp: </span>

                                <form onChange={onChange}>
                                    <select name="sort" >
                                        <option value="default">Mặc định</option>
                                        <option value="price-desc">Giá: từ thấp đến cao</option>
                                        <option value="price-asc">Giá: từ cao đến thấp</option>
                                    </select>
                                </form>

                            </div>
                        </div>

                        {
                            products.length === 0 ? (
                                <div className='text-center mt-8'>
                                    <h1 className='font-semibold text-xl'>Không có sản phẩm nào khớp với kết quả tìm kiếm!</h1>
                                </div>
                            ) : (
                                <div className={styles.content}>
                                    {
                                        products?.map((item: TProduct, index: any) => (
                                            <div className={styles.item} key={index}>
                                                <div className={styles.innerCard}>
                                                    <div className={styles.fav} onClick={() => addToWishlist(item)}>
                                                        <HeartOutlined />
                                                    </div>
                                                    {/* <div className={styles.action}>
                                                <div className={styles.prev}>
                                                    <div className={styles.act}>
                                                        <LeftOutlined />
                                                    </div>
                                                </div>
    
                                                <div className={styles.next}>
                                                    <div className={styles.act}>
                                                        <RightOutlined />
                                                    </div>
                                                </div>
                                            </div> */}

                                                    {/* Ảnh sản phẩm */}
                                                    <img
                                                        src={item.thumbnail ? item.thumbnail : (item.images && item.images.length > 0 ? item.images[0] : '')}
                                                        alt={item.title}
                                                    />

                                                    {/* Thông tin sản phẩm */}
                                                    <div className={styles.info}>
                                                        <p className={styles.title} onClick={() => redirectTo(item)}>{item.title}</p>
                                                        <p className='font-semibold'>${item.discount}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }


                    </div>
                </div>
            </Spin>
        </>
    )
}

export default List