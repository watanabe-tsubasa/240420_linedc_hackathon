"use client"

import { CardContainer } from "@/components/organisms/cardContainer";
import { PurchaseModal } from "@/components/organisms/purchaseModal";
import { productdata } from "@/utils/productdata";
import { purchaseType, reducer, skuType } from "@/utils/reducer";
import { Liff } from "@line/liff";
import { useEffect, useReducer, useState } from "react";

export default function Home() {
  const lineId = '123456';
  const purcaseCategory = [
    '土物野菜',
    'カツ丼',
  ]
  const list = productdata.filter(elem => purcaseCategory.includes(elem.category))
  
  const [purchase, dispatch] = useReducer(reducer, list);
  const calculateTotal = (products: purchaseType[]) => {
    return products.reduce((total, product) => {
      const skusTotal = product.skus.reduce((subtotal, sku) => {
        return subtotal + (sku.price * sku.count);
      }, 0);
      return total + skusTotal;
    }, 0);
  }
  const purchaseItem = purchase.reduce<skuType[]>((acc, elem) => {
    const nonZeroSkus = elem.skus.filter(sku => sku.count !== 0);
    return acc.concat(nonZeroSkus);
  }, []);

  // liff
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID || '';
    console.log(liffId)
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        liff
          .init({ liffId: liffId })
          .then(() => {
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
            console.log(liffObject)
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
            console.log(liffError);
          });
      });
  }, []);



  const [name, setName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (liffObject && !liffObject.isLoggedIn()) {
      liffObject.login({ redirectUri: "https://linedc-front.pages.dev/" });
    }
    liffObject?.getProfile()
      .then((profile) => {
        setName(profile.displayName);
        setUserId(profile.userId);
      })
      .then(() => {
        console.log(userId);
        console.log(name);
      })
      .catch((error) => {
        console.log("error:",error)
      })
  }, [liffObject])

  const total = calculateTotal(purchase);
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between">
      <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
        お客さまのお買い物画面
      </div>
      <div className="fixed pb-4 bottom-0 left-0 flex h-20 w-full items-end justify-around bg-gradient-to-t from-white via-white via-80% dark:from-black dark:via-black">
        <p>
          購入金額
          <span className="text-3xl text-red-800 mx-1">{total}</span>
          円
        </p>
        <PurchaseModal lineId={lineId} list={purchaseItem} />
      </div>
      <div className="mt-16 mb-12 w-full">
        {purchase.map((elem, idx) => (
          <CardContainer key={idx} category={elem.category} skus={elem.skus} dispatch={dispatch} />
        ))}
      </div>
    </main>
  );
}
