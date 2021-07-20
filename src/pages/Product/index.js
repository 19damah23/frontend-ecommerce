import styles from './product.module.css'
import axios from "axios"
import { API_URL } from "../../api/index"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import star from '../../assets/images/Star.svg'
import Button from '../../components/base/Button';
import Card from '../../components/module/Card';
import Navbar from "../../components/module/Navbar/Core";
import Brand from "../../components/module/Navbar/Brand";
import Toggler from "../../components/module/Navbar/Toggler";
import Filter from "../../components/module/Navbar/Filter";
import NavRight from "../../components/module/Navbar/NavRight";
import Cart from "../../components/module/Navbar/Cart";
import Auth from "../../components/module/Navbar/Auth";


const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([])
  const [products, setProducts] = useState([])
  const [categoryId, setCategoryId] = useState()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState(28)
  const [color, setColor] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    axios
      .get(`${API_URL}products/${id}`)
      .then((response) => {
        const product = response.data.data
        const thisCategoryId = product[0].category_id
        setProduct(product)
        setCategoryId(thisCategoryId)
        axios
          .get(`${API_URL}products/category/${thisCategoryId}`)
          .then((response) => {
            const products = response.data.data
            setProducts(products)
          })
          .catch((error) => {
            console.log(error);
          })

        axios
          .get(`${API_URL}category/${thisCategoryId}`)
          .then((response) => {
            const category = response.data.data[0].title
            console.log(category)
            setCategory(category)
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        console.log(error);
      })

    window.scrollTo(0, 0)
  }, [id])

  const handleAddToCart = () => {
    const data = {
      productId: parseInt(id),
      userId: 7,
      size: size,
      color: color,
      qty: qty
    }

    axios
      .post(`${API_URL}orders`, data)
      .then((response) => {
        alert(response.data.message)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return (
    <>
      <Navbar>
        <Brand />
        <Toggler>
          <Filter />
          <NavRight>
            <Cart />
            <Auth />
          </NavRight>
        </Toggler>
      </Navbar>

      <div className={`container ${styles.marginTopBody}`}>

        {/* breadcrumb */}
        <nav class={`breadcrumb ${styles.breadcrumbs}`} aria-label="breadcrumb">
          <ol class={`breadcrumb ${styles.breadcrumb}`}>
            <li class="breadcrumb-item">
              <Link className={styles.navBreadcrumb} to={'/'}>Home</Link>
            </li>
            <li class="breadcrumb-item">
              <Link className={styles.navBreadcrumb} to={`/producs/${categoryId}`}>category</Link>
            </li>
            <li className={`breadcrumb-item active ${styles.navBreadcrumb}`} aria-current="page">{category}</li>
          </ol>
        </nav>

        <div>
          {product && product.map((item) => (
            <>
              <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-12">
                  <img className={styles.mainImage} src={item.mainImage} alt="baju" />

                  <div class={styles.allProduct}>
                    {item.image && item.image.map((img) => (
                      <img className={styles.secondaryImage} src={img.image} alt="product" />
                    ))}
                  </div>
                </div>
                <div class={`col-lg-8 col-md-8 col-sm-12 d-flex flex-column ${styles.ps}`}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <span class={styles.store}>Zalora Cloth</span>
                  <span class={styles.rating}>
                    <img className={styles.star} src={star} alt="star" />
                    <img className={styles.star} src={star} alt="star" />
                    <img className={styles.star} src={star} alt="star" />
                    <img className={styles.star} src={star} alt="star" />
                    <img className={styles.star} src={star} alt="star" />
                    (10)
                  </span>
                  <div class={styles.price}>
                    <span class={styles.priceTitle}>Price</span>
                    <span class={styles.priceValue}>$ {item.price}</span>
                  </div>
                  <div class={styles.color}>
                    <span class={styles.colorTitle}>Color</span>
                    <span>
                      {/* {JSON.parse(item.color).map((col) => ( */}
                      <input className={`form-check-input ${styles[item.color]} ${styles.formCheck}`} type="radio" name="radioNoLabel" id="radioNoLabel1" value={item.color}
                        aria-label="..." onChange={(e) => setColor(e.target.value)} />
                      {/* ))} */}
                    </span>
                  </div>
                  <div class={styles.qtyAndSize}>
                    <div class={styles.size}>
                      <span class={styles.sizeTitle}>Size</span>
                      <div class={styles.count}>
                        <span onClick={() => setSize(size > 0 ? size - 1 : size)}>
                          <svg className={styles.countMinus} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="18" r="18" fill="#D4D4D4" />
                            <rect x="11" y="17" width="14" height="2" fill="white" />
                          </svg>
                        </span>
                        <span className={`mx-3 ${styles.countsTitle}`}>{size}</span>
                        <span onClick={() => setSize(size + 1)}>
                          <svg className={styles.countPlus} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d)">
                              <circle cx="22" cy="22" r="18" fill="white" />
                            </g>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 15V21H15V23H21V29H23V23H29V21H23V15H21Z" fill="#222222" />
                            <defs>
                              <filter id="filter0_d" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="2" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.558333 0 0 0 0 0.558333 0 0 0 0 0.558333 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                              </filter>
                            </defs>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div class={styles.qty}>
                      <span class={styles.qtyTitle}>Jumlah</span>
                      <div class={styles.counts}>
                        <span onClick={() => setQty(qty > 0 ? qty - 1 : qty)}>
                          <svg className={styles.countMinus} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="18" r="18" fill="#D4D4D4" />
                            <rect x="11" y="17" width="14" height="2" fill="white" />
                          </svg>
                        </span>
                        <span className={`mx-3 ${styles.countsTitle}`}>{qty}</span>
                        <span onClick={() => setQty(qty < item.stock ? qty + 1 : qty)}>
                          <svg className={styles.countPlus} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d)">
                              <circle cx="22" cy="22" r="18" fill="white" />
                            </g>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 15V21H15V23H21V29H23V23H29V21H23V15H21Z" fill="#222222" />
                            <defs>
                              <filter id="filter0_d" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="2" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.558333 0 0 0 0 0.558333 0 0 0 0 0.558333 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                              </filter>
                            </defs>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="action-button">
                    <Button title="Chat" myClass="bigShort" />
                    <Button clickAction={handleAddToCart} title="Add Bag" myClass="bigShort" />
                    <Button title="Buy Now" myClass="bigLong" />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h3 className={`${styles.title} mb-4`}>Informasi Produk</h3>
                <div class="condition">
                  <h5 className={styles.detailTitle}>Condition</h5>
                  <span className={styles.detailDescription}>New</span>
                </div>
                <div>
                  <h5 className={`${styles.detailTitle} mt-4`}>Description</h5>
                  <p className={styles.productDescription}>{item.description}</p>
                </div>
              </div>
            </>
          ))}

          <div className="mt-4">
            <h3 className={`${styles.title} mb-4`}>Product Review</h3>
            <div class="d-flex">
              <div className={styles.rates}>
                <p className={styles.rateValue}>5.0<span>/10</span></p>
                <div class="star">
                  <img className={styles.bigStar} src={star} alt="star" />
                  <img className={styles.bigStar} src={star} alt="star" />
                  <img className={styles.bigStar} src={star} alt="star" />
                  <img className={styles.bigStar} src={star} alt="star" />
                  <img className={styles.bigStar} src={star} alt="star" />
                </div>
              </div>
              <div class="grafik">
                <div class="grafik-progres d-flex align-items-center">
                  <img className={`${styles.star} me-2`} src={star} alt="star" />
                  <span className="me-2">5</span>
                  <div className={`progress ${styles.progress}`}>
                    <div class={`progress-bar w-100 ${styles.bgDanger}`} role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                    </div>
                  </div>
                  <span class="value">4</span>
                </div>
                <div class="grafik-progres d-flex align-items-center">
                  <img className={`${styles.star} me-2`} src={star} alt="star" />
                  <span className="me-2">4</span>
                  <div className={`progress ${styles.progress}`}>
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    </div>
                  </div>
                  <span class="value">0</span>
                </div>
                <div class="grafik-progres d-flex align-items-center">
                  <img className={`${styles.star} me-2`} src={star} alt="star" />
                  <span className="me-2">3</span>
                  <div className={`progress ${styles.progress}`}>
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    </div>
                  </div>
                  <span class="value">0</span>
                </div>
                <div class="grafik-progres d-flex align-items-center">
                  <img className={`${styles.star} me-2`} src={star} alt="star" />
                  <span className="me-2">2</span>
                  <div className={`progress ${styles.progress}`}>
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    </div>
                  </div>
                  <span class="value">0</span>
                </div>
                <div class="grafik-progres d-flex align-items-center">
                  <img className={`${styles.star} me-2`} src={star} alt="star" />
                  <span className="me-2">1</span>
                  <div className={`progress ${styles.progress}`}>
                    <div class="progress-bar" role="progressbar">
                    </div>
                  </div>
                  <span class="value">0</span>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div class="item">
            <h3 className={`${styles.title} mb-4`}>You can also like this</h3>
            <span>You’ve never seen it before!</span>
            <div className="row row-cols-2">
              {products && products.map((product) => (
                <div className={`col-xs-6 col-sm-4 mt-3 ${styles.colMd}`}>
                  <Link className={styles.link} to={`${product.id}`}>
                    <Card
                      image={product.mainImage}
                      title={product.title}
                      price={'Rp ' + product.price}
                      store="Zalora Cloth"
                      myClass="text-truncate d-inline"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
