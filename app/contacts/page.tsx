import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';

const ContactsPage = () => {
    return (
      <div className="max-w-2xl mx-auto py-16">
        <h1 className="text-4xl font-extrabold text-center text-[#763f97] mb-2">Свяжитесь с нами</h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Есть вопросы, предложения или хотите стать партнером?
        </p>
        {/* Оборачиваем форму в белую карточку */}
        <div className="bg-white p-8 rounded-xl shadow-md border">
            <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Ваше имя</Label>
                        <Input id="name" placeholder="Алишер" />
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
                <Button type="submit" className="w-full bg-violet-500 hover:bg-violet-600">
                    Отправить
                </Button>
            </form>
        </div>
      </div>
    );
  };
  export default ContactsPage;