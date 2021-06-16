import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { GetStaticProps } from 'next';

import styles from './home.module.scss'
import { stripe } from '../services/stripe';

//Três formas de popular uma página:
//Client-side CSR - validar informações só quando a página for recarregada
//Server-side SSR - Informações para cada usuário e recarrega informação em tempo real.
//Static Site Generation SSG - dados iguais para todos os uruários

interface HomeProps{
  product:{
    priceId: string;
    amount: number;
  }
}

export default function Home({product}:HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ig.news</title>
      </Head>
      <h1>
        <main className={styles.contentContainer}>
          <section className={styles.hero}>
            <span> 👏 Hey, welcome </span>
            <h1>News about <br/> the <span>React</span> world.</h1>
            <p>
              Get access to all the publications<br/>
              <span> for {product.amount} month</span>
            </p>
            <SubscribeButton priceId={product.priceId}/>
          </section>
          <img src="/images/avatar.svg" alt="Girl coding"/>
        </main>
      </h1>
    </>
  );
}

export const getStaticProps: GetStaticProps = async() => {

  const price = await stripe.prices.retrieve('price_1J31QXHwWWyUw87jq5lXVDbM')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD',
    }).format((price.unit_amount / 100)),
  }

  return{
    props:{
      product
    },
    revalidate: 60 * 60 * 24, //24 hours
  }
}
