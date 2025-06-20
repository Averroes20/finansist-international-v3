import { Metadata } from "next";
import dynamic from "next/dynamic";

const PagePrice = dynamic(() => import('@/app/(private)/admin/price/Price'));

export const metadata: Metadata = {
  title: 'Price Service | Finansist International',
  description: 'Price of Finansist International',
};

const Price = () => {
  return (
    <main>
      <PagePrice />
    </main>
  )
}

export default Price