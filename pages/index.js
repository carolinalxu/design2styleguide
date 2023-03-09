import { useState, useEffect } from "react";
import { inventory } from "/data/inventory";
import Head from "next/head";
import Logo from "@/components/logo";
import styles from '@/styles/Home.module.css'
import Image from 'next/image';




export default function Home() {
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showHoodieImage, setShowHoodieImage] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let filteredItems = inventory.clothing;

    if (selectedSex && selectedSex !== 'All') {
      filteredItems = filteredItems.filter((item) => item.sex === selectedSex);
    }

    if (selectedCategory !== 'All') {
      filteredItems = filteredItems.filter(
        (item) => item.category === selectedCategory
      );
    }

    setItems(filteredItems);
  }, [selectedSex, selectedCategory]);

  const handleHoodieButtonClick = () => {
    setSelectedCategory('Hoodies');
    setShowHoodieImage(true);
  };

  const handleHoodieClick = (image) => {
    setShowHoodieImage(true);
    setItems([{ ...items[0], image }]);
  };

  const categories = selectedSex === 'Unisex'
    ? ['All', 'Hoodies', 'Jackets', 'HeadGear']
    : ['All', 'Hoodies', 'Jackets', 'HeadGear'];
    
  const filteredItems = items.filter(item => {
    if (selectedSex === 'Male') {
      if (selectedCategory === 'All' || item.category === selectedCategory) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  });

  return (
    <>
      <Head>
        <title>Geared Up Online Store | BCITSA</title>
        <meta name="description" content="Assignment02" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Logo/>
        <div>
          <button className={styles.male__button} onClick={() => setSelectedSex("Male")}>Male</button>
          <button className={styles.female__button} onClick={() => setSelectedSex("Female")}>Female</button>
          <button className={styles.unisex__button} onClick={() => setSelectedSex("Unisex")}>Unisex</button>
        </div>
        {selectedSex && (
          <div>
            {categories.map((category) => (
              <button key={category} onClick={() => setSelectedCategory(category)}>{category}</button>
            ))}
          </div>
        )}
        <div>
     {filteredItems.map(item => (
      <div key={item.title}>
        <h2>{item.title}</h2>
        <img src={item.image} alt={item.title} />
        <p>Category: {item.category}</p>
        <p>Sex: {item.sex}</p>
        <p>Colours: {item.colours.join(", ")}</p>
        <p>Cost: ${item.cost.toFixed(2)}</p>
      </div>
    ))}
        </div>
      </div>
    </>

  );
}