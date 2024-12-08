import { CloseOutlined, HeartOutlined, NotificationFilled, PhoneFilled, SearchOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/header.module.scss';
import { useEffect, useState } from 'react';
import Sidebar from './Menu';
import { Button, message, Popconfirm, PopconfirmProps } from 'antd';

const Header = () => {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [displayAccount, setDisplayAccount] = useState(false);

  const [displayNotify, setDisplayNotify] = useState(true)
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    setDisplaySidebar(false);
  }, [location]);


  const showSidebar = () => {
    setDisplaySidebar(!displaySidebar)
  }

  const user = localStorage.getItem('user');

  const hasLogin = user ? JSON.parse(user) : null;

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e);

    if (user && hasLogin) {
      localStorage.removeItem('user')
      navigate('/');
    } else {
      message.error('Bạn chưa đăng nhập!');

    }

    message.success('Đăng xuất thành công!');
  };

  return (
    <>
      {/* {
        displayNotify && (
          <div className=' bg-[#E6DED3]'>
            <div className="container mx-auto">
              <div className="inner p-2 flex justify-between items-center ">
                <div className=""></div>
                <div className="space-x-3">
                  <NotificationFilled className='text-red-600' /><Link to={''} className='underline'>Đăng ký</Link> để nhận thông tin mới nhất từ chúng tôi
                </div>
                <div className="hover:cursor-pointer" onClick={() => setDisplayNotify(false)}>
                  <CloseOutlined />
                </div>
              </div>
            </div>
          </div>
        )
      } */}
      <header className={styles.header}>
        <div className="container mx-auto">
          <div className={styles.innerHeader}>
            <div className={styles.left}>
              <div className={styles.item} onClick={showSidebar} >
                <i className="fa-solid fa-bars "></i>
                <p className='p-0 m-0'>Menu</p>
              </div>

            </div>
            <div className={styles.center}>
              <div className={styles.logo}>
                <Link to={'/'}>Steezy Co.</Link>
              </div>
            </div>
            <div className={styles.right}>
              <Link to={''}>Liên hệ với chúng tôi</Link>
              <div className={styles.item}>
                <Link to={'/wishlist'}>
                  <HeartOutlined />
                </Link>
              </div>
              <div className={styles.item} style={{ position: 'relative' }} onClick={() => setDisplayAccount(!displayAccount)}>
                <UserOutlined />
                {displayAccount ? (
                  <div className="absolute right-0 my-3 flex bg-slate-200 p-5 rounded-xl justify-center items-center">
                    <ul className='m-0 flex flex-col gap-1'>
                      {
                        hasLogin ? (
                          <>
                            <li className='mb-2'>
                              <p className='w-full'>Xin chào, <span className='font-semibold'>{hasLogin.username}</span></p>
                            </li>
                            <li className=''>
                              <Button className='w-full px-14'>Thông tin cá nhân</Button>
                            </li>
                            <li className=''>
                              <Popconfirm
                                title="Đăng xuất"
                                description="Bạn có muốn đăng xuất tài khoản này ra khỏi thiết bị không?"
                                // onConfirm={confirm}
                                okText="Đồng ý"
                                cancelText="Hủy"
                              >
                                <Button type='primary' danger className='w-full px-14' onClick={confirm}>Đăng xuất</Button>
                              </Popconfirm>
                            </li>
                          </>
                        ) : (
                          <li className=''>
                            <Button className='w-full px-14' href='login'>Đăng nhập</Button>
                          </li>
                        )
                      }
                    </ul>
                  </div>
                ) : ('')}

              </div>
            </div>
          </div>
        </div>
      </header>
      {displaySidebar && <Sidebar />}
    </>
  )
}

export default Header