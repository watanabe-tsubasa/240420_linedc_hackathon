import { useToast } from "@/Hooks/useToast";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { skuType } from "@/utils/reducer"
import { Toaster } from "sonner";

interface purchaseModalProps {
  lineId: string;
  list: skuType[];
}

export const PurchaseModal:React.FC<purchaseModalProps> = ({ lineId, list }) => {
  const showToast = useToast({
    status: 'info',
    title: 'info',
    duration: 5000,
  })

  const writeKV = async () => {
    console.log(lineId)
    console.log(JSON.stringify(list));
    await fetch('api/', {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(
        {
          key: lineId,
          value: JSON.stringify(list)
        }
      )
    })
    showToast({status: 'success', message: '購入を承りました', duration: 5000})
  }

  // const update = async () => {
  //   if(selectedCategory) {
  //     setIsUpdating(true);
  //     const res = await putCatData(selectedCategory, categoryData)
  //     if (res === 200) {
  //       showToast({status: 'success', message: 'データ更新に成功しました'})
  //       console.log('success')
  //       setInitialData(categoryData);
  //     } else {
  //       showToast({status: 'error', message: 'データ更新に失敗しました'})
  //       console.log('update fail')
  //     }
  //     setIsUpdating(false);
  //   }
  // }
  const isNotPurchase = list.length === 0


  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>購入する</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>お買い物かご</DialogTitle>
            <DialogDescription>
              購入を決定しますか？
            </DialogDescription>
          </DialogHeader>
          <div className="justify-center">
            <ul>
              {(isNotPurchase)? <li>お買い物カゴには何も入っていません</li> : 
              list.map(elem => <li key={elem.JAN}>{elem.name}: {elem.count}</li>)}
            </ul>
          </div>
          <DialogFooter className="flex flex-row space-x-6 justify-center">
            <Button
            type="submit"
            onClick={writeKV}
            disabled={isNotPurchase}
            >
              購入する
            </Button>
            <DialogClose asChild>
              <Button type="submit" variant="secondary">修正する</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster className="fixed inset-0 z-50" position="top-center" richColors />
    </>
  )
}
