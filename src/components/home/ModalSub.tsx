import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputMask from 'react-input-mask';  // Importe o InputMask
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Cookies from 'js-cookie';

export default function ModalSub() {
    const [isOpen, setIsOpen] = useState(false);
    const [newsletter, setNewsletter] = useState(false);

    useEffect(() => {
        if (!Cookies.get('userInfoSubmitted')) {
            setIsOpen(true);
        }
    }, []);

    const handleCheckboxChange = (checked) => {
        setNewsletter(checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.set('newsletter', newsletter ? '1' : '0');
        const data = Object.fromEntries(formData.entries());

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/clientes`, {
                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Success:', await response.json());
                Cookies.set('userInfoSubmitted', 'true', { expires: 365 });
                setIsOpen(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="p-4">
                <DialogHeader>
                    <DialogTitle>Cadastro Inicial</DialogTitle>
                    <DialogDescription>Preencha suas informações para acessar o catálogo:</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="nome">Nome Completo</Label>
                        <Input id="nome" name="nome" placeholder="Nome completo" required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="Seu melhor email" required />
                    </div>
                    <div>
                        <Label htmlFor="telefone">Telefone</Label>
                        <InputMask mask="(99) 99999-9999" maskChar=" " placeholder="(00) 00000-0000">
                            {(inputProps) => <Input {...inputProps} id="telefone" name="telefone" required />}
                        </InputMask>
                    </div>
                    <div>
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input id="cidade" name="cidade" placeholder="Sua cidade" required />
                    </div>
                    <div>
                        <Label htmlFor="como_soube">Como soube do bazar?</Label>
                        <Select name="como_soube">
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione uma opção" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="whatsapp">Whatsapp</SelectItem>
                                <SelectItem value="instagram">Instagram</SelectItem>
                                <SelectItem value="outdoor">Outdoor</SelectItem>
                                <SelectItem value="banner">Banner</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="newsletter" checked={newsletter} onCheckedChange={handleCheckboxChange} />
                        <Label htmlFor="newsletter" className="text-sm">Aceitar receber novidades</Label>
                    </div>
                    <p className="text-xs text-gray-500">
                        Ao enviar este formulário, você concorda com nossa política de privacidade conforme a LGPD. <Link href="/privacidade" className="underline">Saiba mais.</Link>
                    </p>
                    <DialogFooter>
                        <Button type="submit" className="w-full">Enviar</Button>
                    </DialogFooter>
                </form> 
            </DialogContent>
        </Dialog>
    );
}
