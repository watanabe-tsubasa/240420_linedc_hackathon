import { Action, purchaseType } from "@/utils/reducer"
import { ProductCard } from "./productCard"

interface CardContainerProps extends purchaseType {
  dispatch: React.Dispatch<Action>;
}

export const CardContainer: React.FC<CardContainerProps> = ({category, skus, dispatch}) => {
  return (
    <div className="w-full max-w-full px-4 mb-4">
      <div className="text-2xl border-b-2 border-gray-200 mb-2">
        {category}
      </div>
      <div className="flex space-x-2 overflow-x-scroll">
        {skus.map((elem) => (
          <ProductCard
           key={elem.JAN}
           name={elem.name}
           JAN={elem.JAN}
           price={elem.price}
           count={elem.count}
           dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  )
}
