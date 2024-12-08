import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Select,
    Upload,
    UploadFile,
    UploadProps
} from 'antd';
import { Link, useParams } from 'react-router-dom';
import { TCategoty } from '../../../common/types/category';
import { TProduct } from '../../../common/types/product';
import { getCategories } from '../../../services/category';
import { createProduct, getProductById, updateProductById } from '../../../services/product';
import { useEffect, useState } from 'react';

const FormSubmit = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // * APIs

    const { data: product, } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
        enabled: !!id
    });

    //* Get categories data 
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    });

    // Load dữ liệu sản phẩm khi có ID
    useEffect(() => {
        if (id && product?.data?.data) {
            form.setFieldsValue(product.data.data);
        }
        if (id && product?.data?.data?.images) {
            setFileList(
                product.data.data.images.map((url: string, index: number) => ({
                    uid: index.toString(),
                    name: `image${index}`,
                    status: "done",
                    url: url,
                }))
            );
        }
    }, [id, product, form]);

    // Xử lý khi submit form
    const { mutate } = useMutation({
        mutationFn: async (data: TProduct) => {
            if (id) {
                const updatedData = { ...data, _id: id };
                const res = await updateProductById(updatedData);
                if (res.status !== 204) throw new Error('Update failed');
            } else {
                await createProduct(data);
            }
        },
        onError: () => {
            messageApi.open({
                type: 'error',
                content: `Có lỗi xảy ra!`,
            });
        },
        onSuccess: () => {
            messageApi.open({
                type: 'success',
                content: `${id ? 'Cập nhật' : 'Thêm mới'} thành công`,
            });
            if (id) {
                queryClient.invalidateQueries({ queryKey: ['product'] });
            } else {
                form.resetFields();
                setFileList([]);
            }
        }
    });

    // Kiểm tra giá khuyến mãi và giá sản phẩm
    const comparePrices = (price: number, discount: number) => {
        return discount > price ? 'Giá khuyến mãi không được phép lớn hơn giá gốc!' : '';
    };

    // Xử lý khi thay đổi ảnh sản phẩm
    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList([...newFileList]);
    };

    // Xử lý khi submit form
    const onFinish = (data: TProduct ) => {
        const imageURLs = fileList
            .filter((file) => file.status === 'done')
            .map((file) => file.response?.secure_url || file.url);

        // Gọi mutate để xử lý API
        mutate({ ...data, images: imageURLs });
    };

    // * UI configs...
    const { TextArea } = Input;

    const categoriesData = categories?.data?.data || [];

    return (
        <>
            {contextHolder}
            <div className="flex justify-between items-center mb-10">
                <h1 className='font-bold text-2xl'>{id ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}</h1>
                <Button type='primary'>
                    <Link to={'/admin/products'}>
                        <RollbackOutlined /> Quay lại
                    </Link>
                </Button>
            </div>

            <div className="content my-3 mx-3">
                <Form
                    form={form}
                    name="wrap"
                    labelCol={{ flex: '130px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 600 }}
                    layout="horizontal"
                    onFinish={onFinish}
                >
                    <Form.Item label="Tên sản phẩm" name='title'
                        rules={[
                            { required: true, message: 'Tên sản phẩm không được bỏ trống!' },
                            { max: 255, message: 'Tên sản phẩm có độ dài tối đa 255 ký tự!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Chọn danh mục" name='category'
                        rules={[{ required: true, message: 'Danh mục không được bỏ trống!' }]}
                    >
                        <Select
                            options={categoriesData.map((item: TCategoty) => ({
                                value: item._id,
                                label: item.name
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="Giá sản phẩm" name='price'
                        rules={[{ required: true, message: 'Giá sản phẩm không được bỏ trống!' }]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item label="Giá khuyến mãi" name='discount'
                        rules={[
                            { required: true, message: 'Giá khuyến mãi không được bỏ trống!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const price = getFieldValue('price');
                                    if (value > price) {
                                        return Promise.reject(new Error(comparePrices(price, value)));
                                    }
                                    return Promise.resolve();
                                }
                            })
                        ]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item label="Mô tả" name='description'>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Số lượng hàng" name='stock'
                        rules={[{ required: true, message: 'Số lượng sản phẩm không được bỏ trống!' }]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>

                    {/* Images */}
                    <Form.Item label="Ảnh sản phẩm" name='images'>
                        <Upload
                            action="https://api.cloudinary.com/v1_1/phmvu2912/image/upload"
                            data={{ upload_preset: 'steezy_shop' }}
                            onChange={handleChange}
                            multiple
                            fileList={fileList}
                            listType="picture-card"
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <div className="mt-10">
                        <Button type="primary" htmlType="submit">
                            {id ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};


export default FormSubmit;
