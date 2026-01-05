import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import MainLayout from '@/components/layout/MainLayout';

const ContactsPage = () => {
    return (
    <MainLayout>  
      <div className="max-w-2xl mx-auto py-16">
        <h1 className="text-4xl font-extrabold text-center text-[#1e3a8a] mb-2">Свяжитесь с нами</h1>
        <p className="text-lg text-center text-gray-800 mb-8">
          Есть вопросы, предложения или хотите стать партнером?
        </p>
        {/* Оборачиваем форму в белую карточку */}
        <div className="bg-white p-8 rounded-xl shadow-md border">
            <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Ваше имя</Label>
                        <Input id="name" placeholder='Введите имя...'/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Ваш Email</Label>
                        <Input id="email" type="email" placeholder="email@example.com" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea id="message" placeholder="Ваше сообщение..." />
                </div>
                <Button type="submit" className="w-full bg-[#1e3a8a] text-white">
                    Отправить
                </Button>
            </form>
        </div>
      </div>
    </MainLayout>
    );
  };
  export default ContactsPage;