import { getSession } from 'next-auth/react';

import React from 'react';
import { FULL_DESCRIPTION, TITLE } from 'src/constants/marketplace';
import Wrapper from 'src/layouts/marketplace';
import ProductCard, {
  ProductCardSkeleton,
} from 'src/layouts/marketplace/product-card';
import { Item_types } from 'src/lib/marketplace/item-types';
const cache = new Map();
const skeleton = new Array(4).fill(0);

export default function Market({ user }) {
  return (
    <>
      <Wrapper user={user}>
        {Item_types.map((item, i) => {
          return <TrendingSection key={i} item={item} />;
        })}
      </Wrapper>
    </>
  );
}

function TrendingSection({ item }) {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (cache.has(item.id)) {
      setProducts(cache.get(item.id));
    } else {
      fetch(`/api/marketplace/trending/${item.id}`)
        .then((res) => res.json())
        .then((res) => {
          cache.set(item.id, res);
          setProducts(res);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          // setLoading(false);
        });
    }
  }, [item.label]);

  return (
    <section className="w-full p-3  mt-4 ">
      <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
        Trending in
        <span className="bg-gradient-to-r from-primary to-fuchsia-600 bg-clip-text text-transparent">
          {item.label}
        </span>
      </h1>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:px-8 ">
        {loading &&
          skeleton.map((_, i) => {
            return <ProductCardSkeleton key={i} />;
          })}

        {products.map((product, i) => {
          return <ProductCard key={i} product={product} />;
        })}
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };

  return {
    props: { user: session.user },
  };
}
