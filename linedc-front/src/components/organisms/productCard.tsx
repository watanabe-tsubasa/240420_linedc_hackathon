"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Input } from "../ui/input";
import { MinusIcon, PlusIcon, UploadIcon } from "@radix-ui/react-icons";
import { Action, skuType } from "@/utils/reducer";

interface ProductCardProps extends skuType {
  dispatch: React.Dispatch<Action>;
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, JAN, price, count, dispatch}) => {

  const inc = () => {
    dispatch({type: 'increase', JAN: JAN})
  }
  const dec = () => {
    if(count > 0) dispatch({type: 'decrease', JAN: JAN})
  }
  const imgPath = `https://www.aeonnetshop.com/img/goods/0105/01050000032100/PC/L/${JAN}.jpg`

  return (
    <Card className="w-[200px] min-w-[200px]">
      <CardHeader className="p-4 h-16 pb-0">
        <CardTitle className="text-sm text-left">{name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <Image
         src={imgPath}
         alt="product"
         width={250}
         height={250}
        />
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="mb-2">
          <p className="text-sm text-gray-800">
            税抜
            <span className="text-2xl text-red-800 mx-1">{price}</span>
            円
          </p>
        </div>
        <div className="flex w-full">
          {(count === 0) ?
            <Button
             className="h-8 grow"
             onClick={inc}>
              <UploadIcon className="mr-2" />
              カゴに入れる
            </Button>:
            <div className="flex justify-between">
              <Button
                className='h-8 rounded-r-none basis-1/5'
                onClick={dec}
                disabled={count <= 0}
              >
                <MinusIcon />
              </Button>
              <Input
                className="h-8 text-2xl text-center rounded-none basis-3/5"
                value={count}
                readOnly
              />
              <Button
                className='h-8 text-xl rounded-l-none basis-1/5'
                onClick={inc}
              >
                <PlusIcon />
              </Button>
            </div>}
        </div>
      </CardFooter>
    </Card>
  )
}
