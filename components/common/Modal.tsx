import React from 'react';
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

const Modal: React.FC<Props> = React.memo(({ title, description, trigger, children, contentStyle, open, onOpenChange }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent className={contentStyle}>
      {(title || description) && (
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
      )}
      {children}
    </DialogContent>
  </Dialog>
));

Modal.displayName = 'Modal';
export default Modal;
