'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7kbnbLKxjP4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useQuery } from '@tanstack/react-query';


async function fetchProdutos(id: number) {
  const response = await fetch(`http://localhost:3000/api/produtos?id=${id}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar dados');
  }
  return response.json();
}


export default function Component({ params }: { params: { id: string } }) {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['produtos', params.id],
    queryFn: () => fetchProdutos(Number(params.id)),
    retry: false,
    enabled: !!params.id,
  });


  if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (isError) {
        return <div>Erro: {error.message}</div>;
    }

    if (data?.length === 0) {
      return <div>Nenhum dado encontrado.</div>;
    }


    console.log(data);


  return (
    <section>
      <div className='container'>
        <h1 className="text-3xl font-bold mb-6">Editar Arquivo</h1>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reference">Referencia:</Label>
              <Input id="reference" placeholder="Enter product reference" value={data[0]?.referencia}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Enter product name" value={data[0]?.nome}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Tamanho</Label>
              <Input id="size" placeholder="Enter product size" value={data[0]?.tamanho}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Marca</Label>
              <Input id="brand" placeholder="Enter product brand" value={data[0]?.marca}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Genero</Label>
              <Select id="gender">
                <SelectTrigger />
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Femenino</SelectItem>
                  <SelectItem value="unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Preço</Label>
              <Input id="price" placeholder="Enter product price" type="number" value={data[0]?.preco}/>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select id="status">
                <SelectTrigger />
                <SelectContent>
                  <SelectItem value="1">Ativo</SelectItem>
                  <SelectItem value="0">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Input id="category" placeholder="Enter product category" value={data[0]?.categoria}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="colors">Cor</Label>
              <Input id="colors" placeholder="Enter product colors" value={data[0]?.cores}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Imagem</Label>
              <Input id="picture" type="file" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary">
            Save
          </Button>
        </div>
      </div>
    </section>
  )
}