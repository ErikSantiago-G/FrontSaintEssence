import React from "react"
import "./HomeCards.scss"
interface HomeCardsProps{
  img: string;
  title: string;
  description: string;
}
const HomeCards: React.FC<HomeCardsProps> = ({img,title,description}) => {
  return (
    <section className="services"> 
      <img className="services__img" src={img} alt={title} />
      <h3 className="services__tittle">{title}</h3>
      <p className="services__description">{description}</p>
    </section> 
  )
}


export default HomeCards