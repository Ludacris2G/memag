import './Styles/Home.css'
import corona from './Styles/product_images/corona.jpg'
import chopsticks from './Styles/product_images/chopsticks.jpg'
import noodles from './Styles/product_images/noodles.jpg'
import coin from './Styles/product_images/coin.jpg'
import dolphin from './Styles/product_images/dolphin.jpg'
import drone from './Styles/product_images/drone.jpg'
import nuts from './Styles/product_images/nuts.jpg'
import pillow from './Styles/product_images/pillow.jpg'
import shears from './Styles/product_images/shears.jpg'
import squirrel from './Styles/product_images/squirrel.jpg'
import trump from './Styles/product_images/trump.jpg'
import puzzle from './Styles/product_images/puzzle.jpg'
import React from 'react'
import Product from './Product'
import Footer from './Footer'

function Home() {
  return (
    <div className='home'>
        <div className="home__row">
            <Product
                title='Coronavirus Ice Cube Mold Tray'
                price={19.99}
                rating={3}
                image={corona}
                id='1'
            />
            <Product
                title='16.5-inch Chopsticks'
                price={6.99}
                rating={5}
                image={chopsticks}
                id='2'
            />
            <Product
                title='Noodles Handbag'
                rating={4}
                price={29.95}
                image={noodles}
                id='3'
            />
        </div>

        <div className="home__row">
            <Product
                title='Decision Maker Coin'
                price={24.99}
                rating={3}
                image={coin}
                id='4'
            />
            <Product
                title='Punch a Dolphin in the Mouth'
                price={7.76}
                rating={5}
                image={dolphin}
                id='5'
            />
            <Product
                title='Flying Fuck RC Helicopter'
                rating={2}
                price={29.88}
                image={drone}
                id='6'
            />
        </div>

        <div className="home__row">
        <Product
                title='Bofa Deez Nutz Candle'
                price={19.99}
                rating={6}
                image={nuts}
                id='7'
            />
            <Product
                title='31.5" Bread Shape Pillow'
                price={29.00}
                rating={5}
                image={pillow}
                id='8'
            />
            <Product
                title='Pure White Hell Jigsaw Puzzle'
                rating={1}
                price={19.42}
                image={puzzle}
                id='9'
            />
        </div>

        <div className="home__row">
        <Product
                title='Right Shears'
                price={19.99}
                rating={1}
                image={shears}
                id='10'
            />
            <Product
                title='Handi Squirrel'
                price={9.99}
                rating={5}
                image={squirrel}
                id='11'
            />
            <Product
                title='Trump Scented Candle'
                rating={4}
                price={20.00}
                image={trump}
                id='12'
            />
        </div>
        <Footer/>
    </div>
  )
}

export default Home
