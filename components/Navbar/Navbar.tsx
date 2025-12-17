"use client";
export default function Navbar() {
return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
            <p className="text-lg font-semibold">Sistema</p>
            <ul className="flex gap-10">
                <li className="cursor-pointer hover:text-primary text-gray-600">Inicio</li>
                <li className="cursor-pointer hover:text-primary text-gray-600">Sobre</li>
                <li className="cursor-pointer hover:text-primary text-gray-600">Resultados</li>
                <li className="cursor-pointer hover:text-primary text-gray-600">Pacotes</li>
            </ul>
            <button className="cursor-pointer hover:text-primary text-gray-600" onClick={() => window.location.href = '/auth'}>Cadastrar</button>
        </div>
    </nav>
);
}
