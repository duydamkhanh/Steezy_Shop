import React from 'react'
import styles from './styles/homepage.module.scss'
import { Link } from 'react-router-dom'

import menBag from '../../assets/images/bag_for_men.jpg'
import menShoes from '../../assets/images/shoes_for_men.jpg'
import menPerfumes from '../../assets/images/perfumes_for_men.jpg'
import womenBag from '../../assets/images/bag_for_women.jpg'
import womenShoes from '../../assets/images/shoes_for_women.jpg'
import womenJewelry from '../../assets/images/jewelry_for_women.jpg'
import menItems from '../../assets/images/items_for_men.jpg'
import womenItem from '../../assets/images/items_for_women.jpg'
import banner1 from '../../assets/images/banner1.jpg'

const HomePage = () => {


  return (
    <>
      <section className={styles.mainBanner}>
        <div className={styles.banner}>
          <img src={banner1} alt="" />

          <div className={styles.context}>
            <span>Dành cho Nam</span>
            <h4>BST Thu-Đông 2024 phong cách Workwear: Louis Vuitton x Timberland</h4>
            <Link to={''} className={styles.link}>Khám phá thêm</Link>

          </div>
        </div>
      </section>

      <div className="container mx-auto">
        <section className={styles.collection}>
          <div className={styles.heading}>
            <h3>Khám phá các sáng tạo độc đáo của Steezy</h3>
          </div>

          <div className={styles.content}>
            <div className={styles.item}>
              <Link to={''}>
                <img src={womenBag} alt="" />

                <div className={styles.text}>
                  Túi xách nữ
                </div>
              </Link>
            </div>

            <div className={styles.item}>
              <Link to={''}>
                <img src={womenItem} alt="" />

                <div className={styles.text}>
                  Phụ kiện bằng da cho nữ
                </div>
              </Link>
            </div>

            <div className={styles.item}>
              <Link to={''}>
                <img src={womenJewelry} alt="" />

                <div className={styles.text}>
                Phụ kiện thời trang cho nữ
                </div>
              </Link>
            </div>

            <div className={styles.item}>
              <Link to={''}>
                <img src={womenShoes} alt="" />

                <div className={styles.text}>
                  Giày nữ
                </div>
              </Link>
            </div>


            <div className={styles.item}>
              <Link to={''}>
                <img src={menPerfumes} alt="" />

                <div className={styles.text}>
                  Nước hoa
                </div>
              </Link>
            </div>

            <div className={styles.item}>
              <Link to={''}>
                <img src={menBag} alt="" />

                <div className={styles.text}>
                  Túi xách nam
                </div>
              </Link>
            </div>

            <div className={styles.item}>
              <Link to={''}>
                <img src={menShoes} alt="" />

                <div className={styles.text}>
                  Giày nam
                </div>
              </Link>
            </div>

            <div className={styles.item}>
              <Link to={''}>
                <img src={menItems} alt="" />

                <div className={styles.text}>
                Phụ kiện bằng da cho nam
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage