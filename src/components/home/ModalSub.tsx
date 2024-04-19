import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import Cookies from 'js-cookie'; // Assumindo que você esteja usando 'js-cookie' para manipular cookies

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
            const response = await fetch('http://localhost:3000/api/clientes/', {
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
            <DialogContent>
                <DialogTitle>User Information</DialogTitle>
                <DialogDescription>Para ver o catálogo do bazar preencha as informações abaixo:</DialogDescription>
                <form onSubmit={handleSubmit}>
                    <Label htmlFor="nome">Seu Nome</Label>
                    <Input id="nome" name="nome" placeholder="Nome completo" required />
                    
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="Seu melhor email" required />
                    
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" name="telefone" placeholder="Seu telefone" required />
                    
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" name="cidade" placeholder="Sua cidade" required />

                    <Label htmlFor="como_soube">Como ficou sabendo do bazar?</Label>
                    <Select id="como_soube" name="como_soube">
                        <SelectTrigger>
                            <SelectValue placeholder="Onde ouviu falar de nós" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="whatsapp">Whatsapp</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="outdoor">Outdoor</SelectItem>
                            <SelectItem value="banner">Banner</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                    </Select>

                    <Label htmlFor="newsletter">Aceito receber novidades</Label>
                    <Checkbox id="newsletter" checked={newsletter} onCheckedChange={handleCheckboxChange} />

                    <Button type="submit">Enviar</Button> 
                </form> 
            </DialogContent>
        </Dialog>
    );
}