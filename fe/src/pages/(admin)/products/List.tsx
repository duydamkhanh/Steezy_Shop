import { PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Spin, Table } from 'antd'
import { Link } from 'react-router-dom'
import { TProduct } from '../../../common/types/product'
import { convertTimestampToGMT7 } from '../../../services/common'
import { getProducts, removeProductById } from '../../../services/product'

const List = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();

    //! APIs
    const { data, isError, error, isLoading, isPending, isFetching } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })


    //! REMOVE
    const { mutate } = useMutation({
        mutationFn: async (product: TProduct) => {
            try {
                const res = await removeProductById(product);



                if (res.status !== 200) return messageApi.open({
                    type: 'error',
                    content: `Xóa thất bại, thử lại sau...!`,
                });

            } catch (error) {
                console.error(error);
            }

        },
        onError: () => {
            messageApi.open({
                type: 'error',
                content: `${error}`,
            });
        },
        onSuccess: () => {
            messageApi.open({
                type: 'success',
                content: `Xóa bản ghi thành công`,
            });
            queryClient.invalidateQueries({
                queryKey: ['products']
            })
        }
    })


    console.log()


    // console.log(isError)

    // ! UI configs
    const dataSource = data?.data?.data?.map((item: TProduct, index: number) => ({
        key: <div className="font-bold">{index + 1}</div>,
        categoryName: item?.category?.name,
        thumbnailPath: item?.thumbnail,
        created: convertTimestampToGMT7(item.createdAt),
        updated: convertTimestampToGMT7(item.updatedAt),
        ...item
    }))

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'images',
            key: 'images',
            render: ( item: TProduct) => (
                item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.title} width={100} />
                ) : (
                    <span>Không có ảnh</span> // Hoặc bất kỳ thông điệp nào bạn muốn hiển thị
                )
            )
        },
        {
            title: 'Giá gốc',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Giá khuyến mãi',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: <div className='text-center'>Tools</div>,
            width: 200,
            render: ( item: TProduct) => {
                return (
                    <div className="flex space-x-3">
                        <Popconfirm
                            title="Xóa bản ghi"
                            description="Bạn có chắc chắn muốn xóa bản ghi này không?"
                            onConfirm={() => mutate(item)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                        <Button>
                            <Link to={`/admin/products/update/${item._id}`}>Cập nhật</Link>
                        </Button>
                    </div>
                );
            },
        },
    ];

    // ! Toast 
    isError && messageApi.open({
        type: 'error',
        content: `${error}`,
    });

    return (
        <>
            {contextHolder}
            <div className="flex justify-between items-center mb-5">
                <h1 className='font-bold text-2xl'>Danh sách sản phẩm</h1>
                <Button type='primary'>
                    <PlusOutlined />
                    <Link to={'/admin/products/create'}>Thêm mới</Link>
                </Button>
            </div>

            <div className="content">
                <Spin size='large' spinning={isFetching || isLoading || isPending ? true : false}>
                    <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="uid" />
                </Spin>
            </div>

        </>
    )
}

export default List  