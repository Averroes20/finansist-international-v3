import { clients } from '@/lib/data/intro';
import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
const ClientSlider = memo(() => {
  const clientList = useMemo(() => clients.concat(clients), []);

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: '-50%' }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'reverse',
      }}
      className="flex flex-row gap-6 whitespace-nowrap min-w-full"
    >
      {clientList.map((client, index) => (
        <div key={index} className="flex flex-row gap-1 items-center min-w-fit">
          <Image src={client.icon} alt={client.name} width={32} height={32} loading="lazy" className="rounded-full object-contain" />
          <p className="text-sm">{client.name}</p>
        </div>
      ))}
    </motion.div>
  );
});
ClientSlider.displayName = 'ClientSlider';
export default ClientSlider;
