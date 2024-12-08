import { Link } from 'react-router-dom'
import styles from './styles/footer.module.scss'

const Footer = () => {
    return (
        <>
            <footer>
                <div className="container mx-auto">
                    <div className={styles.innerFooter}>
                        <div className={styles.col}>
                            <div className={styles.heading}>Hỗ trợ</div>
                            <ul>
                                <li><Link to="/faq" className='hover:underline'>Câu hỏi thường gặp</Link></li>
                                <li><Link to="/product-care" className='hover:underline'>Chăm sóc sản phẩm</Link></li>
                                <li><Link to="/store" className='hover:underline'>Cửa hàng</Link></li>
                            </ul>
                        </div>

                        <div className={styles.col}>
                            <div className={styles.heading}>Dịch vụ</div>
                            <ul>
                                <li><Link to="/maintenance" className='hover:underline'>Dịch vụ bảo dưỡng</Link></li>
                                <li><Link to="/personalization" className='hover:underline'>Dịch vụ cá nhân hóa</Link></li>
                                <li><Link to="/gift-art" className='hover:underline'>Nghệ thuật tặng quà</Link></li>
                            </ul>
                        </div>

                        <div className={styles.col}>
                            <div className={styles.heading}>Về Steezy</div>
                            <ul>
                                <li><Link to="/latest-news" className='hover:underline'>Tin mới nhất</Link></li>
                                <li><Link to="/careers" className='hover:underline'>Tuyển dụng</Link></li>
                                <li><Link to="/art-culture" className='hover:underline'>Nghệ thuật & Văn hóa</Link></li>
                            </ul>
                        </div>

                        <div className={styles.col}>
                            <div className={styles.heading}>Kết nối với chúng tôi</div>
                            <p className='text-justify'>
                                <Link to='/subscribe' className='font-bold hover:underline'>Đăng ký </Link>
                                
                                    
                                nhận thư điện tử để cập nhật những tin tức mới nhất từ Steezy, bao gồm các buổi ra mắt độc quyền trực tuyến và bộ sưu tập mới.
                            </p>
                            <ul>
                                <li><Link to='/follow-us' className='hover:underline'>Theo dõi chúng tôi</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            <div className={styles.subFooter}>
                <p>Steezy Co.</p>
            </div>
        </>
    )
}

export default Footer