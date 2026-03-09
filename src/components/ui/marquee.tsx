import { cn } from '@/lib/utils/cn';

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
   children: React.ReactNode;
   fast?: boolean;
}

export function Marquee({ children, className, fast = false, ...props }: MarqueeProps) {
   return (
      <div
         className={cn(
            'flex w-full overflow-hidden bg-primary-500 text-white py-2.5 border-b-2 border-foreground',
            className
         )}
         {...props}
      >
         <div className={cn('flex whitespace-nowrap', fast ? 'animate-marquee-fast' : 'animate-marquee')}>
            {Array.from({ length: 12 }).map((_, i) => (
               <span key={i} className="mx-4 text-xs md:text-sm font-bold tracking-[0.15em] uppercase">
                  {children}
               </span>
            ))}
         </div>
      </div>
   );
}
