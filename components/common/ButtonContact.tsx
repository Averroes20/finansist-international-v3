'use client';
import { Button } from '../ui/button';
import { Whatsapp } from '../icons/social-media';

type Props = {
  className?: string;
  title: string;
};

const WHATSAPP_URL = 'https://wa.me/6281211114994';
const MESSAGE = encodeURIComponent('Halo, saya ingin tahu lebih lanjut tentang layanan Anda.');

const openWhatsApp = () => {
  window.open(`${WHATSAPP_URL}?text=${MESSAGE}`, '_blank');
};

const ButtonContact: React.FC<Props> = ({ className, title }) => {
  return (
    <Button
      onClick={openWhatsApp}
      className={`px-3 py-1 items-center text-sm self-start text-white rounded-full hover:bg-[linear-gradient(135deg, #20C35A, #0F7A6A)] hover:scale-105 hover:transition ease-in-out duration-300 ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(37,211,80,1) 20%, rgba(18,140,126,1) 80%)', // Gradasi diagonal khas WhatsApp
        transition: 'background 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.background = 'linear-gradient(135deg, #20C35A, #0F7A6A)';
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
      }}
    >
      <Whatsapp />
      {title}
    </Button>
  );
};

export default ButtonContact;
