import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputMask from 'react-input-mask';
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
            const response = await fetch(`/api/clientes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Success:', await response.json());
                Cookies.set('userInfoSubmitted', 'true', { expires: 365 });
                setIsOpen(false); // Fechar o modal apenas se o POST for bem-sucedido
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Dialog open={isOpen}>
            <DialogContent className="p-4">
                <DialogHeader>
                    <DialogTitle>Cadastro Inicial</DialogTitle>
                    <DialogDescription>Preencha suas informações para acessar o catálogo:</DialogDescription>
                </DialogHeader>
                <img
                    alt="Banner"
                    className="w-full object-cover md:rounded-lg md:shadow-lg md:object-cover md:object-center"
                    height="200"
                    src="/images/BannerFinal.jpg"
                    style={{ aspectRatio: "800/200", objectFit: "cover" }}
                    width="800"
                />
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
