import { FeaturedProducts } from "../../components";
import { HeroCarousel } from "../../components/Home/HeroCarousel/HeroCarousel"
import HomeCards from "../../components/Home/HomeCards/HomeCards";
import TopCategories from "../../components/Home/TopCategories/TopCategories";
import { dataHomeCards } from "./datahomecards";
import './Home.scss';

const Home = () => {
  return (
    <>
      <HeroCarousel />
      <section className="home">
        <FeaturedProducts />
        <section className="home-cards" >
          <h2>Lo que saint ofrece</h2>
          <div>
             {dataHomeCards.map((cards,index )  =>(
               <HomeCards
               key={index}
               img={cards.img}
               title={cards.title}
               description={cards.description}
               />
             ))}
          </div>
        </section>
        <TopCategories />
      </section>
    </>
  )
}

export default Home