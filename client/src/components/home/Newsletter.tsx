import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertSubscriberSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const subscribeSchema = insertSubscriberSchema.extend({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" })
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

const Newsletter = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      name: "",
      email: ""
    }
  });
  
  const subscribeMutation = useMutation({
    mutationFn: (data: SubscribeFormValues) => {
      return apiRequest("POST", "/api/subscribe", data)
        .then(res => res.json());
    },
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      toast({
        title: "Đăng ký thành công!",
        description: "Cảm ơn bạn đã đăng ký nhận bản tin của chúng tôi.",
        variant: "default",
      });
      reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Đăng ký thất bại!",
        description: error instanceof Error ? error.message : "Vui lòng thử lại sau.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });
  
  const onSubmit = (data: SubscribeFormValues) => {
    subscribeMutation.mutate(data);
  };
  
  return (
    <section className="py-12 md:py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6 md:p-8 lg:p-10">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                Nhận thông tin mới nhất
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Đăng ký nhận bản tin</h2>
              <p className="text-gray-600 mb-6">Cập nhật những sản phẩm thủ công mới nhất, câu chuyện từ các nghệ nhân và ưu đãi đặc biệt.</p>
              
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                  <input 
                    type="text" 
                    id="name" 
                    {...register("name")}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    {...register("email")}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-md transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang đăng ký..." : "Đăng ký ngay"}
                </button>
                <p className="text-xs text-gray-500">
                  Bằng cách đăng ký, bạn đồng ý với <a href="#" className="text-primary hover:underline">Chính sách bảo mật</a> của chúng tôi.
                </p>
              </form>
            </div>
            <div className="md:w-1/2 relative min-h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1591203146366-95e0aaec810f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Thủ công mỹ nghệ Việt Nam" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
