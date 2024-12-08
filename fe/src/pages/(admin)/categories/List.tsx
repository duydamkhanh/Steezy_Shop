import { PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Spin, Table } from 'antd'
import { Link } from 'react-router-dom'
import { TCategoty } from '../../../common/types/category'
import { getCategories, removeCategoryById } from '../../../services/category'
import { convertTimestampToGMT7 } from '../../../services/common'

const List = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();

    //! APIs
    const { data, isError, error, isLoading, isPending, isFetching } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })


    //! REMOVE
    const { mutate } = useMutation({
        mutationFn: async (category: TCategoty) => {
            await removeCategoryById(category)
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
                queryKey: ['categories']
            })
        }
    })




    // console.log(isError)

    // ! UI configs
    const dataSource = data?.data?.data?.map((item: TCategoty, index: number) => ({
        key: <div className="font-bold">{index + 1}</div>,
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
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created',
            key: 'created',
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updated',
            key: 'updated',
        },
        {
            title: <div className='text-center'>Tools</div>,
            width: 200,
            render: (item: TCategoty) => {
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
                            <Link to={`/admin/categories/update/${item._id}`}>Cập nhật</Link>
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
                <h1 className='font-bold text-2xl'>Danh sách danh mục</h1>
                <Button type='primary'>
                    <PlusOutlined />
                    <Link to={'/admin/categories/create'}>Thêm mới</Link>
                </Button>
            </div>

            <div className="content">
                <Spin size='large' spinning={isFetching || isLoading || isPending ? true : false}>
                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                </Spin>
            </div>

        </>
    )
}

export default List  