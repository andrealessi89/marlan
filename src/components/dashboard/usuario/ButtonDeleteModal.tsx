/**
 * v0 by Vercel.
 * @see https://v0.dev/t/g4HSvbjtPxT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Component() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Deletar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar Cadastro?</DialogTitle>
          <DialogDescription>Após deletar não poderá retornar</DialogDescription>
        </DialogHeader>
       
        <DialogFooter>
          <Button type="submit">Deletar</Button>
          <Button type="submit">Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

