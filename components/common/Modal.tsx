import { memo } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

type Props = {
  title?: string;
  description?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  contentStyle?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const Modal: React.FC<Props> = ({ title, description, trigger, children, contentStyle, open, onOpenChange }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild className="text-sm md:text-base">
      {trigger}
    </DialogTrigger>
    <DialogContent className={contentStyle}>
      {(title || description) && (
        <DialogHeader>
          {title && <DialogTitle className="text-sm md:text-base">{title}</DialogTitle>}
          {description && <DialogDescription className="text-sm md:text-base">{description}</DialogDescription>}
        </DialogHeader>
      )}
      {children}
    </DialogContent>
  </Dialog>
);

export default memo(Modal);
