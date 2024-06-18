import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { search_cars } from "./searched_data";
import styles from "./styles.module.css";


gsap.registerPlugin(ScrollTrigger);

const SearchedCarItem = () => {
  const carItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    carItemsRef.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(el, 
          { opacity: 0, x: -100 }, 
          { opacity: 1, x: 0, duration: 1, ease: 'power2.out', 
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
              toggleActions: 'play none none none',
            }
          }
        );
      }
    });
  }, []);

  return (
    <div className={styles.cards_container}>
      {
        search_cars.map(({ img, brand, description, mileage, fuel, transmission, price }, index) => (
          <div className={styles.search_car_container} key={index} ref={el => carItemsRef.current[index] = el}>
            <div className={styles.img_container}>
              <img src={img} className={styles.car_img} alt="car_model" />
            </div>
            <div className={styles.description_container}>
              <h2 className={styles.car_name}>{brand}</h2>
              <p className={styles.car_description}>{description}</p>
            </div>
            <div className={styles.car_detail_container}>
              <div className={styles.car_detail}> 
                <img src="./car_details/mileage.svg" alt="" /><span className={styles.car_dec}>{mileage}</span>
              </div>
              <div className={styles.car_detail}> 
                <img src="./car_details/fuel.svg" alt="" /><span className={styles.car_dec}>{fuel}</span>
              </div>
              <div className={styles.car_detail}> 
                <img src="./car_details/transmission.svg" alt="" /><span className={styles.car_dec}>{transmission}</span>
              </div>
            </div>
            <div className={styles.car_item_footer}>
              <p className={styles.car_price}>{price}</p>
              <button className={styles.submit_button}>View Details <img src="./img/up.svg" alt="" /></button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default SearchedCarItem;
