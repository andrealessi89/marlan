import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputMask from 'react-input-mask';
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Cookies from 'js-cookie';

type ModalSubProps = {
    tipo: string;
};

export default function ModalSub({ tipo }: ModalSubProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [cpf, setCpf] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [isValidCpf, setIsValidCpf] = useState(true);
    const [cpfStatus, setCpfStatus] = useState<string | null>(null);
    const [newsletter, setNewsletter] = useState(false);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cidadeSuggestions, setCidadeSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [bannerUrl, setBannerUrl] = useState<string>('/images/default-banner.jpg');
    const [loadingBanner, setLoadingBanner] = useState(true);

    useEffect(() => {
        if (!Cookies.get('userInfoSubmitted')) {
            setIsOpen(true);
        }

        // Fetch banner URL based on "tipo"
        const fetchBannerUrl = async () => {
            try {
                const response = await fetch(`/api/banners_cadastro?tipo=${tipo}`);
                if (response.ok) {
                    const data = await response.json();
                    setBannerUrl(data.url || '/images/default-banner.jpg');
                }
            } catch (error) {
                console.error('Erro ao buscar o banner:', error);
            } finally {
                setLoadingBanner(false);
            }
        };
        fetchBannerUrl();
    }, [tipo]);

    {loadingBanner ? (
        <div className="spinner">Carregando banner...</div>
    ) : (
        <img src={bannerUrl} alt="Banner" />
    )}

    if (tipo === "vip") {
        return (
            <Dialog open={isOpen}>
                <DialogContent className="p-4">
                    {loadingBanner ? (
                        <div className="spinner">Carregando banner...</div>
                    ) : (
                        <a href="https://bazar.grupomarlan.com.br/" rel="noopener noreferrer">
                            <img src={bannerUrl} alt="Banner" />
                            <center>Acessar Catálogo</center>
                        </a>
                    )}
                </DialogContent>
            </Dialog>
        );
    }
    
    

    const fetchCidades = async (term: string) => {
        if (!term) return;
        setIsLoading(true);
        try {
            const response = await fetch(`https://cidades.rdstation.com.br/api/cidades/?term=${term}`);
            if (response.ok) {
                const data = await response.json();
                const cities = data.cities.map((city: { name: string; state: string }) => ({
                    name: city.name,
                    state: city.state,
                }));
                setCidadeSuggestions(cities);
            }
        } catch (error) {
            console.error("Erro ao buscar cidades:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCidadeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setCidade(query);
        if (query.length >= 3) {
            fetchCidades(query);
        } else {
            setCidadeSuggestions([]);
        }
    };

    const handleCidadeSelect = (cidadeSelecionada: { name: string; state: string }) => {
        setCidade(cidadeSelecionada.name);
        setEstado(cidadeSelecionada.state); 
        setCidadeSuggestions([]); 
    };

    const validateCpf = (cpf: string) => {
        cpf = cpf.replace(/[^\d]+/g, ''); 
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        return remainder === parseInt(cpf.substring(10, 11));
    };

    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCpf = event.target.value;
        setCpf(newCpf);
        if (newCpf.replace(/\D/g, '').length === 11) {
            const isCpfValid = validateCpf(newCpf);
            setIsValidCpf(isCpfValid);
            setCpfStatus(null); // Reset status message

            if (isCpfValid) {
                checkCpf(newCpf);
            } else {
                setCpfStatus("CPF inválido");
                setShowAdditionalFields(false); 
            }
        } else {
            setCpfStatus(null);
            setShowAdditionalFields(false); 
        }
    };

    const checkCpf = async (cpf: string) => {
        try {
            const response = await fetch(`/api/clientes?cpf=${cpf}`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setCpfStatus("CPF encontrado ✓");
                    Cookies.set('userInfoSubmitted', 'true', { expires: 365 });
                    setIsOpen(false); // Fecha o modal
                } else {
                    setCpfStatus("CPF não encontrado");
                    setShowAdditionalFields(true); 
                }
            }
        } catch (error) {
            console.error("Erro ao verificar CPF:", error);
        }
    };

    const handleCheckboxChange = (checked: boolean) => {
        setNewsletter(checked);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        formData.set('newsletter', newsletter ? '1' : '0');
        formData.set('tipo', tipo);
        formData.set('cpf', cpf);
        formData.set('estado', estado); 

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
                Cookies.set('userInfoSubmitted', 'true', { expires: 365 });
                setIsOpen(false); 
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <Dialog open={isOpen}>
            <DialogContent className="p-4 max-h-[100vh] overflow-y-auto">
                <DialogHeader>
                <img src={bannerUrl} alt="Banner" />
                    <DialogTitle>Cadastro Inicial</DialogTitle>
                    <DialogDescription>Preencha suas informações para acessar o catálogo:</DialogDescription>
                </DialogHeader>
                <form onSubmit={showAdditionalFields ? handleSubmit : (e) => { e.preventDefault(); checkCpf(cpf); }} className="space-y-4">
                    {!showAdditionalFields ? (
                        <div>
                            <Label htmlFor="cpf">CPF</Label>
                            <InputMask mask="999.999.999-99" value={cpf} onChange={handleCpfChange} maskChar=" ">
                                {(inputProps) => <Input {...inputProps} id="cpf" placeholder="Digite seu CPF" required />}
                            </InputMask>
                            {cpfStatus && (
                                <p className={`text-sm mt-1 ${isValidCpf ? 'text-green-600' : 'text-red-600'}`}>
                                    {cpfStatus}
                                </p>
                            )}
                        </div>
                    ) : (
                        <>
                            <div>
                                <Label htmlFor="nome">Nome Completo</Label>
                                <Input id="nome" name="nome" placeholder="Nome completo" required />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="Seu melhor email" required />
                            </div>
                            <div>
                                <Label htmlFor="telefone">Whatsapp</Label>
                                <InputMask mask="(99) 99999-9999" maskChar=" " placeholder="(00) 00000-0000">
                                    {(inputProps) => <Input {...inputProps} id="telefone" name="telefone" required />}
                                </InputMask>
                            </div>
                            <div>
                                <Label htmlFor="cidade">Cidade/Estado</Label>
                                <Input
                                    id="cidade"
                                    name="cidade"
                                    placeholder="Digite sua cidade"
                                    value={cidade}
                                    onChange={handleCidadeChange}
                                    required
                                />
                                {isLoading && <p>Carregando...</p>}
                                {cidadeSuggestions.length > 0 && (
                                    <ul className="border border-gray-300 rounded mt-1 bg-white max-h-40 overflow-y-auto">
                                        {cidadeSuggestions.map((suggestion, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleCidadeSelect(suggestion)}
                                                className="p-2 cursor-pointer hover:bg-gray-100"
                                            >
                                                {suggestion.name} - {suggestion.state}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="generoCrianca" className="block mb-2">Gênero da Criança</Label>
                                <select id="generoCrianca" name="generoCrianca" required className="input block w-full rounded-md border border-input bg-transparent px-3 py-1">
                                    <option value="">Selecione</option>
                                    <option value="Masculino">Menino</option>
                                    <option value="Feminino">Menina</option>
                                    <option value="Ambos">Ambos</option>
                                </select>
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
                        </>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
