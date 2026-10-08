import Hero from '@/components/home/Hero'
import HomeProducts from '@/components/home/HomeProducts'
import PriceTicker from '@/components/home/PriceTicker'


const page = () => {
  return (
    <div>
      <PriceTicker></PriceTicker>
      <Hero></Hero>
      <HomeProducts></HomeProducts>
    </div>
  )
}

export default page