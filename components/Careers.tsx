'use client';

import { careers, Form } from '@/lib/data/careers';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Textarea } from './ui/textarea';
import { TypographyH2, TypographyH3, TypographyP } from './ui/typography';

interface CareerFormProps {
  form: Form[];
}

const CareerForm: React.FC<CareerFormProps> = ({ form }) => {
  const [date, setDate] = React.useState<Date>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log('Submitted data:', data);
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
      {form.map((formField) => (
        <div key={formField.id} className="grid grid-rows-1 gap-2">
          {formField.type === 'textarea' ? (
            <>
              <Label htmlFor={formField.id}>{formField.label}</Label>
              <Textarea id={formField.id} name={formField.id} required />
            </>
          ) : formField.type === 'date' ? (
            <>
              <Label htmlFor={formField.id}>{formField.label}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>{formField.label}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Label htmlFor={formField.id}>{formField.label}</Label>
              <Input
                id={formField.id}
                name={formField.id}
                type={formField.type}
                inputMode={formField.id === 'phone' ? 'numeric' : formField.id === 'email' ? 'email' : 'text'}
                required
              />
            </>
          )}
        </div>
      ))}
      <DialogFooter>
        <Button type="submit">Send</Button>
      </DialogFooter>
    </form>
  );
};

const Careers = () => {
  return (
    <section className="max-w-screen-lg mx-auto py-10 md:py-20">
      <TypographyH2 className="text-center font-bold mb-5 md:mb-10 uppercase">Join our program!</TypographyH2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {careers.map((item, index) => (
          <div key={index} className="p-4 border flex flex-col h-full">
            <div className="flex-grow">
              <TypographyH3 className="font-bold mb-4 uppercase text-center p-2 border-b-4 border-yellow-500 w-fit mx-auto">
                {item.title}
              </TypographyH3>
              <TypographyP className="mb-4">{item.description}</TypographyP>
              {item.facilities?.length && item.facilities.length > 0 && (
                <>
                  <TypographyP className="mb-2">What facilities will you get?</TypographyP>
                  <ul className="list-disc list-outside pl-5 mb-4">
                    {item.facilities.map((facility, idx) => (
                      <li key={idx}>{facility}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-auto self-center">{item.typeButton}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] max-h-[90%] overflow-y-auto no-scrollbar">
                <DialogHeader>
                  <DialogTitle>{item.title}</DialogTitle>
                  <DialogDescription>Complete your details below, then click submit.</DialogDescription>
                </DialogHeader>
                <CareerForm form={item.form} />
                {/* {item.title === 'Internship' ? (
                  <form className="grid gap-4 py-4">
                    {item.title === 'Internship' &&
                      item.form?.map((form, idx) => (
                        <div key={idx} className="grid grid-rows-1 gap-2">
                          {form.type === 'textarea' ? (
                            <>
                              <Label htmlFor={form.id}>{form.label}</Label>
                              <Textarea id={form.id} className="col-span-3" required />
                            </>
                          ) : (
                            <>
                              <Label htmlFor={form.id}>{form.label}</Label>
                              <Input id={form.id} type={form.type} className="col-span-3" required />
                            </>
                          )}
                        </div>
                      ))}
                    <DialogFooter>
                      <Button type="submit">Send</Button>
                    </DialogFooter>
                  </form>
                ) : item.title === 'Jobs' ? (
                  <form className="grid gap-4 py-4">
                    {item.title === 'Jobs' &&
                      item.form?.map((form, idx) => (
                        <div key={idx} className="grid grid-rows-1 gap-2">
                          {form.type === 'textarea' ? (
                            <>
                              <Label htmlFor={form.id}>{form.label}</Label>
                              <Textarea id={form.id} className="col-span-3" required />
                            </>
                          ) : (
                            <>
                              <Label htmlFor={form.id}>{form.label}</Label>
                              <Input id={form.id} type={form.type} className="col-span-3" required />
                            </>
                          )}
                        </div>
                      ))}
                    <DialogFooter>
                      <Button type="submit">Send</Button>
                    </DialogFooter>
                  </form>
                ) : (
                  <form className="grid gap-4 py-4">
                    {item.title === 'Partner' &&
                      item.form?.map((form, idx) => (
                        <div key={idx} className="grid grid-rows-1 gap-2">
                          {form.type === 'textarea' ? (
                            <>
                              <Label htmlFor={form.id}>{form.label}</Label>
                              <Textarea id={form.id} className="col-span-3" required />
                            </>
                          ) : form.type === 'date' ? (
                            <>
                              <Label htmlFor={form.id}>{form.label}</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={'outline'}
                                    className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                                  >
                                    <CalendarIcon />
                                    {date ? format(date, 'PPP') : <span>{form.label}</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus required />
                                </PopoverContent>
                              </Popover>
                            </>
                          ) : (
                            <>
                              <Label htmlFor={form.id}>{form.label}</Label>
                              <Input id={form.id} type={form.type} className="col-span-3" required />
                            </>
                          )}
                        </div>
                      ))}
                    <DialogFooter>
                      <Button type="reset">Send</Button>
                    </DialogFooter>
                  </form>
                )} */}
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Careers;
