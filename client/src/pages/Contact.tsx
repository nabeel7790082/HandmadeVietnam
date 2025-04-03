import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  phone: z.string().min(10, { message: 'Số điện thoại không hợp lệ' }),
  subject: z.string().min(3, { message: 'Tiêu đề phải có ít nhất 3 ký tự' }),
  message: z.string().min(10, { message: 'Tin nhắn phải có ít nhất 10 ký tự' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });
  
  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Gửi thành công!',
        description: 'Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất có thể.',
        variant: 'default',
      });
      
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <main className="py-8">
      <Helmet>
        <title>Liên hệ | Làng Nghề Việt</title>
        <meta name="description" content="Liên hệ với Làng Nghề Việt để được tư vấn về sản phẩm thủ công mỹ nghệ Việt Nam hoặc bất kỳ thắc mắc nào khác." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-6 text-center">Liên hệ với chúng tôi</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-center mb-10">
          Bạn có câu hỏi hoặc yêu cầu đặc biệt? Đừng ngần ngại liên hệ với chúng tôi. Đội ngũ Làng Nghề Việt luôn sẵn sàng hỗ trợ bạn.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Contact Info */}
          <div className="md:w-1/3 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-display text-xl font-bold mb-4">Thông tin liên hệ</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Địa chỉ</h4>
                    <p className="text-gray-600">123 Đường Láng, Quận Đống Đa, Hà Nội</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-phone-alt text-primary"></i>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Điện thoại</h4>
                    <p className="text-gray-600">
                      <a href="tel:+84912345678" className="hover:text-primary transition">0912 345 678</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-envelope text-primary"></i>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:info@langnghe.vn" className="hover:text-primary transition">info@langnghe.vn</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="far fa-clock text-primary"></i>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Giờ làm việc</h4>
                    <p className="text-gray-600">Thứ 2 - Chủ nhật: 8:00 - 20:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-display text-xl font-bold mb-4">Kết nối với chúng tôi</h3>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center text-primary transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center text-primary transition">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center text-primary transition">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center text-primary transition">
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-display text-xl font-bold mb-6">Gửi tin nhắn cho chúng tôi</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ và tên</FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập họ và tên của bạn" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="example@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số điện thoại</FormLabel>
                          <FormControl>
                            <Input placeholder="0912 345 678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tiêu đề</FormLabel>
                          <FormControl>
                            <Input placeholder="Tiêu đề tin nhắn" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tin nhắn</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Nhập nội dung tin nhắn của bạn" 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Đang gửi...
                      </>
                    ) : (
                      'Gửi tin nhắn'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="bg-white rounded-lg shadow-sm p-4 overflow-hidden">
          <h3 className="font-display text-xl font-bold mb-4 px-2">Vị trí của chúng tôi</h3>
          <div className="h-[400px] w-full rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0964841164505!2d105.80284607589!3d21.02774198062012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab424a50fff9%3A0xbe3a7f3670c0a45f!2zVHLhuqduIEjGsG5nIMSQ4bqhbywgSG_DoG4gS2nhur9tLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1687851896662!5m2!1svi!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
