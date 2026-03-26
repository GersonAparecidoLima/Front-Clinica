// src/componentes/Banner.tsx
import bannerImg from '../../assets/banner.png' // O Vite busca o arquivo físico aqui

export const Banner = () => {
    return (
        <header className="banner">
            <img 
                src={bannerImg} 
                alt="Banner principal da Clínica MedVida"
                style={{ width: '100%',  height: 'auto', display: 'block' }} 
            />
        </header>
    )
}