import { FeaturedProducts } from "../../components";
import { HeroCarousel } from "../../components/Home/HeroCarousel/HeroCarousel"
import HomeCards from "../../components/Home/HomeCards/HomeCards";
import TopCategories from "../../components/Home/TopCategories/TopCategories";
import './Home.scss';

const Home = () => {
  return (
    <>
      <HeroCarousel />
      <section className="home">
        <FeaturedProducts />
        <HomeCards />
        <TopCategories />
      </section>
    </>
  )
}

export default Home