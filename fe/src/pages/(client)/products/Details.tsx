import { GiftOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, Image, InputNumber, Spin, Tabs, TabsProps } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { TProduct } from '../../../common/types/product';
import { getProductById } from '../../../services/product';
import styles from '../styles/detailsP.module.scss';
import { useState } from 'react';


const Details = () => {

    const { id } = useParams();

    const [spinning, setSpinning] = useState(false);
    const [percent, setPercent] = useState(0);

    const [quantity, setQuantity] = useState(1);


    const { data: product, isError, error, isFetching, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            try {
                const res = await getProductById(id);

                return res
            } catch (error) {
                console.log(error)
            }
        }
    })

    // Lấy sản phẩm dã xem từ storage
    const recentProducts = localStorage.getItem('products_watched');
    const productsWatched = recentProducts ? JSON.parse(recentProducts) : [];

    const detailsProduct = product?.data.data;

    // const onChange = (key: string) => {
    //     console.log(key);
    // };

    //* UI configs
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Mô tả sản phẩm',
            children: <p className='text-lg text-justify py-3'>{detailsProduct?.description}</p>,
        },
        {
            key: '2',
            label: 'Bình luận [0]',
            children: 'Content of Tab Pane 2',
        }
    ];

    // console.log(detailsProduct?.images)

    // const showLoader = () => {
    //     setSpinning(true);
    //     let ptg = -10;

    //     const interval = setInterval(() => {
    //         ptg += 5;
    //         setPercent(ptg);

    //         if (ptg > 120) {
    //             clearInterval(interval);
    //             setSpinning(false);
    //             setPercent(0);
    //         }
    //     }, 100);
    // };

    return (
        <>
            {isLoading && isFetching ? (
                <Spin spinning fullscreen />
            ) : ('')}
            <div className="container mx-auto">
                <div className={styles.mainContent}>
                    <div className={styles.left}>
                        <div className={styles.imgs}>
                            <Image.PreviewGroup

                                preview={{
                                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                }}

                            >
                                {
                                    detailsProduct?.images?.map((img: any, index: number) => (

                                        <Image src={img} alt={detailsProduct.title} key={index} placeholder />
                                    ))
                                }
                            </Image.PreviewGroup>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.title}>
                            {detailsProduct?.title}
                        </div>

                        <div className={styles.info}>
                            <div className={styles.category}>
                                <span className='font-semibold'>Loại sản phẩm: </span>
                                <Link to={''} className='hover:underline'>{detailsProduct?.category?.name}</Link>
                            </div>

                            <div className={styles.rating}>
                                <span className='font-semibold'>Lượt đánh giá: </span>
                                <p className='hover:underline'>{detailsProduct?.rating === 0 ? detailsProduct?.rating : (<span className='text-gray-500'>Chưa có đánh giá</span>)}</p>
                            </div>
                        </div>

                        <div className={styles.prices}>
                            <span className='font-semibold text-3xl'>${detailsProduct?.discount}</span>

                            <del className='text-gray-500 text-xl'>${detailsProduct?.price}</del>
                        </div>
                        <Form
                            // labelCol={{ span: 4 }}
                            // wrapperCol={{ span: 14 }}
                            // layout="horizontal"
                            // disabled={componentDisabled}
                            style={{ marginTop: 28 }}
                            size='large'
                        >

                            <Form.Item label="Số lượng" name='quantity' className='font-semibold m-0 p-0 flex-1'
                            // rules={[
                            //     { type: 'integer', message: `Chỉ được phép chứa ký tự số và số lượng không được phép vượt quá ${detailsProduct?.stock}` },

                            // ]}
                            >
                                <InputNumber min={1} max={detailsProduct?.stock} value={quantity} />
                            </Form.Item>

                            <div className="flex justify-between items-center space-x-4 my-7">
                                <Button type='customize' size='large' className='bg-[#292524] text-white p-4 flex-1 hover:bg-[#A8A29E] hover:text-black'>Thêm vào giỏ hàng <ShoppingCartOutlined /></Button>
                                <Button type='customize' size='large' className='bg-[#292524] text-white p-4 flex-1 hover:bg-[#A8A29E] hover:text-black'>Mua ngay <ShoppingCartOutlined /></Button>
                            </div>
                        </Form>

                        <div className={styles.services}>
                            <div className="flex items-center space-x-4 text-lg">
                            <i className="fa-solid fa-gift text-2xl"></i> <p className='text-justify'>Freeship cho tổng hóa đơn trên 100$</p>
                            </div>

                            <div className="flex items-center space-x-4 text-lg">
                                <i className="fa-solid fa-truck text-2xl"></i> <p className='text-justify'>Giao hàng 1 - 2 ngày khu vực nội thành</p>
                            </div>

                            <div className="flex items-center space-x-4 text-lg">
                            <i className="fa-solid fa-headset text-2xl"></i> <p className='text-justify'>Hỗ trợ tư vấn 24/7</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tabs my-10">
                    <Tabs defaultActiveKey="1" items={items} size='large' centered type='customize' className='active:text-black'/>
                </div>

                {/* Danh sách xem gần đây */}
                <section className={styles.listWatched}>
                    <div className={styles.heading}>
                        <h3 className='text-2xl font-semibold'>Sản phẩm đã xem</h3>
                    </div>

                    <div className={styles.content}>
                        {
                            productsWatched?.map((item: TProduct, index: any) => (
                                <div className={styles.item} key={index}>
                                    {/* <Link to={`/products/details/${item._id}`} className={styles.innerCard}> */}
                                    <div className={styles.innerCard}>
                                        <div className={styles.fav} onClick={() => alert('hi')}>
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
                                            <p className={styles.title}>{item.title}</p>
                                            <p className='font-semibold'>${item.discount}</p>
                                        </div>
                                    </div>
                                    {/* </Link> */}
                                </div>
                            ))
                        }
                    </div>
                </section>
            </div>
        </>
    )
}

export default Details