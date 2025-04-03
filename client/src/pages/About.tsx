import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Artisan } from '@shared/schema';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const { data: artisans, isLoading, error } = useQuery<Artisan[]>({
    queryKey: ['/api/artisans'],
  });
  
  return (
    <main className="py-8">
      <Helmet>
        <title>Về chúng tôi | Làng Nghề Việt</title>
        <meta name="description" content="Tìm hiểu về Làng Nghề Việt - Nơi kết nối các làng nghề truyền thống Việt Nam với người yêu thích sản phẩm thủ công mỹ nghệ." />
      </Helmet>
      
      {/* Hero section */}
      <section className="relative h-[300px] md:h-[400px] mb-12">
        <div className="absolute inset-0 bg-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1550047510-49b87b546767?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Làng nghề truyền thống Việt Nam" 
            className="w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Về Làng Nghề Việt
            </h1>
            <p className="text-white/90 text-lg md:text-xl">
              Sứ mệnh của chúng tôi là giữ gìn và phát triển các giá trị văn hóa truyền thống Việt Nam thông qua việc kết nối người tiêu dùng với các làng nghề thủ công.
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4">
        {/* Story section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold mb-6 text-center">Câu chuyện của chúng tôi</h2>
            <div className="prose max-w-none">
              <p>
                Làng Nghề Việt ra đời từ niềm đam mê và sự trân trọng đối với nghề thủ công truyền thống Việt Nam. Chúng tôi nhận thấy rằng, trong thời đại công nghiệp hóa và hiện đại hóa, nhiều làng nghề truyền thống đang phải đối mặt với nguy cơ mai một. Các sản phẩm thủ công mỹ nghệ vốn mang đậm bản sắc văn hóa dân tộc đang dần bị thay thế bởi các sản phẩm công nghiệp sản xuất hàng loạt.
              </p>
              <p>
                Chính vì vậy, vào năm 2020, Làng Nghề Việt được thành lập với sứ mệnh bảo tồn và phát triển các làng nghề truyền thống, đồng thời tạo ra một cầu nối giữa các nghệ nhân tài hoa với người tiêu dùng trong và ngoài nước.
              </p>
              <p>
                Chúng tôi tin rằng mỗi sản phẩm thủ công đều là một tác phẩm nghệ thuật, mang trong mình câu chuyện về văn hóa, lịch sử và con người Việt Nam. Qua từng đường nét chạm khắc trên gỗ, từng đường kim mũi chỉ trên tấm lụa, hay từng nét vẽ tinh tế trên gốm sứ, chúng ta có thể cảm nhận được tâm hồn, kỹ năng và sự tận tâm của người nghệ nhân.
              </p>
              <p>
                Hiện nay, Làng Nghề Việt đã và đang hợp tác với hơn 20 làng nghề truyền thống trên khắp Việt Nam, từ làng gốm Bát Tràng nổi tiếng ở miền Bắc đến làng dệt chiếu Định Yên ở đồng bằng sông Cửu Long. Chúng tôi không chỉ mang đến cho khách hàng những sản phẩm chất lượng cao mà còn chia sẻ câu chuyện đằng sau mỗi sản phẩm, giúp mọi người hiểu hơn về giá trị văn hóa mà sản phẩm đó đại diện.
              </p>
            </div>
          </div>
        </section>
        
        <Separator className="my-16" />
        
        {/* Values section */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold mb-10 text-center">Giá trị cốt lõi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <i className="fas fa-hands text-2xl text-primary"></i>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Tính chân thực</h3>
              <p className="text-gray-600">
                Chúng tôi cam kết cung cấp các sản phẩm thủ công chính hiệu từ các làng nghề truyền thống Việt Nam, được làm hoàn toàn bằng tay bởi các nghệ nhân có tay nghề cao.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <i className="fas fa-seedling text-2xl text-primary"></i>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Phát triển bền vững</h3>
              <p className="text-gray-600">
                Chúng tôi đề cao việc sử dụng nguyên liệu thân thiện với môi trường và hỗ trợ các làng nghề phát triển bền vững, bảo tồn nguồn tài nguyên thiên nhiên cho các thế hệ tương lai.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <i className="fas fa-handshake text-2xl text-primary"></i>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Thương mại công bằng</h3>
              <p className="text-gray-600">
                Chúng tôi cam kết trả giá hợp lý cho các nghệ nhân, đảm bảo họ nhận được phần thưởng xứng đáng cho công sức và tài năng của mình, góp phần cải thiện đời sống và giữ gìn nghề truyền thống.
              </p>
            </div>
          </div>
        </section>
        
        {/* Artisans section */}
        <section className="mb-16" id="artisans">
          <h2 className="font-display text-3xl font-bold mb-10 text-center">Nghệ nhân tiêu biểu</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-sm p-6">
                  <div className="w-full md:w-1/3">
                    <div className="aspect-square bg-gray-200 animate-pulse rounded-md"></div>
                  </div>
                  <div className="w-full md:w-2/3 space-y-3">
                    <div className="h-6 bg-gray-200 animate-pulse rounded w-48"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-32"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-500">Không thể tải thông tin nghệ nhân. Vui lòng thử lại sau.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {artisans?.map((artisan) => (
                <div 
                  key={artisan.id} 
                  id={`artisan-${artisan.id}`}
                  className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="w-full md:w-1/3">
                    <img 
                      src={artisan.image} 
                      alt={artisan.name} 
                      className="w-full aspect-square object-cover rounded-md"
                    />
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="font-display text-xl font-bold mb-1">{artisan.name}</h3>
                    <p className="text-primary font-medium mb-3">{artisan.village}</p>
                    <p className="text-gray-600 leading-relaxed">
                      {artisan.description}
                    </p>
                    <p className="mt-4 text-gray-600">
                      Với hơn 30 năm kinh nghiệm, nghệ nhân {artisan.name} đã tạo ra những tác phẩm tinh xảo được nhiều khách hàng trong và ngoài nước yêu thích. Mỗi sản phẩm đều là kết quả của sự tỉ mỉ, kiên nhẫn và đam mê với nghề truyền thống.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        
        <Separator className="my-16" />
        
        {/* Other sections */}
        <section className="mb-16" id="purchase-guide">
          <h2 className="font-display text-3xl font-bold mb-6 text-center">Hướng dẫn mua hàng</h2>
          <div className="max-w-3xl mx-auto">
            <div className="prose max-w-none">
              <h3>Các bước đặt hàng</h3>
              <ol>
                <li>
                  <strong>Duyệt sản phẩm</strong> - Khám phá các sản phẩm thủ công đa dạng của chúng tôi theo danh mục hoặc làng nghề.
                </li>
                <li>
                  <strong>Thêm vào giỏ hàng</strong> - Khi tìm thấy sản phẩm bạn yêu thích, hãy thêm vào giỏ hàng và điều chỉnh số lượng nếu cần.
                </li>
                <li>
                  <strong>Thanh toán</strong> - Tiến hành thanh toán, điền thông tin giao hàng và chọn phương thức thanh toán.
                </li>
                <li>
                  <strong>Xác nhận đơn hàng</strong> - Kiểm tra email xác nhận đơn hàng của bạn. Chúng tôi sẽ bắt đầu chuẩn bị đơn hàng ngay lập tức.
                </li>
                <li>
                  <strong>Nhận hàng</strong> - Đơn hàng của bạn sẽ được giao đến địa chỉ đã đăng ký trong vòng 2-5 ngày làm việc (tùy khu vực).
                </li>
              </ol>
              
              <h3>Phương thức thanh toán</h3>
              <p>Chúng tôi chấp nhận các phương thức thanh toán sau:</p>
              <ul>
                <li>Thanh toán khi nhận hàng (COD)</li>
                <li>Chuyển khoản ngân hàng</li>
                <li>Thẻ tín dụng/ghi nợ (Visa, Mastercard)</li>
                <li>Ví điện tử (Momo, ZaloPay, VNPay)</li>
              </ul>
              
              <h3>Chính sách giao hàng</h3>
              <p>
                Chúng tôi giao hàng trên toàn quốc với phí vận chuyển tiêu chuẩn là 30.000₫. Miễn phí giao hàng cho đơn hàng từ 500.000₫.
              </p>
              <p>
                Thời gian giao hàng thông thường là 2-5 ngày làm việc kể từ khi đơn hàng được xác nhận. Đối với các khu vực vùng sâu vùng xa, thời gian giao hàng có thể kéo dài hơn.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16" id="returns">
          <h2 className="font-display text-3xl font-bold mb-6 text-center">Chính sách đổi trả</h2>
          <div className="max-w-3xl mx-auto">
            <div className="prose max-w-none">
              <p>
                Chúng tôi muốn bạn hoàn toàn hài lòng với mua sắm của mình tại Làng Nghề Việt. Nếu vì bất kỳ lý do gì bạn không hài lòng với sản phẩm, chúng tôi chấp nhận đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.
              </p>
              
              <h3>Điều kiện đổi trả</h3>
              <ul>
                <li>Sản phẩm còn nguyên trạng, không có dấu hiệu đã qua sử dụng</li>
                <li>Còn đầy đủ tem, nhãn, bao bì gốc</li>
                <li>Có hóa đơn mua hàng hoặc email xác nhận đơn hàng</li>
              </ul>
              
              <h3>Trường hợp áp dụng đổi trả</h3>
              <ul>
                <li>Sản phẩm bị lỗi sản xuất</li>
                <li>Sản phẩm bị hư hại trong quá trình vận chuyển</li>
                <li>Sản phẩm không đúng với mô tả trên website</li>
                <li>Giao nhầm sản phẩm</li>
              </ul>
              
              <h3>Quy trình đổi trả</h3>
              <ol>
                <li>Liên hệ với chúng tôi qua email (info@langnghe.vn) hoặc số điện thoại (0912 345 678) trong vòng 7 ngày kể từ khi nhận hàng</li>
                <li>Cung cấp thông tin đơn hàng và lý do đổi trả</li>
                <li>Chúng tôi sẽ hướng dẫn cách đóng gói và gửi trả sản phẩm</li>
                <li>Sau khi nhận được sản phẩm trả lại và kiểm tra, chúng tôi sẽ tiến hành hoàn tiền hoặc gửi sản phẩm thay thế</li>
              </ol>
              
              <p>
                <strong>Lưu ý:</strong> Chi phí vận chuyển đổi trả sẽ được chúng tôi thanh toán nếu lỗi thuộc về chúng tôi. Trong trường hợp khách hàng đổi trả vì lý do cá nhân, khách hàng sẽ chịu chi phí vận chuyển.
              </p>
            </div>
          </div>
        </section>
        
        <section id="terms">
          <h2 className="font-display text-3xl font-bold mb-6 text-center">Điều khoản dịch vụ</h2>
          <div className="max-w-3xl mx-auto">
            <div className="prose max-w-none">
              <p>
                Khi sử dụng website và dịch vụ của Làng Nghề Việt, bạn đồng ý tuân thủ các điều khoản và điều kiện sau đây. Vui lòng đọc kỹ trước khi sử dụng dịch vụ của chúng tôi.
              </p>
              
              <h3>1. Đăng ký tài khoản</h3>
              <p>
                Để sử dụng một số tính năng của website, bạn có thể cần đăng ký tài khoản. Bạn đồng ý cung cấp thông tin chính xác, đầy đủ và cập nhật khi được yêu cầu trong quá trình đăng ký.
              </p>
              
              <h3>2. Bảo mật tài khoản</h3>
              <p>
                Bạn chịu trách nhiệm duy trì tính bảo mật của tài khoản và mật khẩu của mình. Bạn đồng ý thông báo ngay cho chúng tôi về bất kỳ hành vi sử dụng trái phép tài khoản của bạn.
              </p>
              
              <h3>3. Quyền sở hữu trí tuệ</h3>
              <p>
                Tất cả nội dung trên website của chúng tôi, bao gồm văn bản, hình ảnh, logo, biểu tượng, âm thanh, phần mềm và thiết kế, đều thuộc quyền sở hữu của Làng Nghề Việt hoặc các đối tác cung cấp nội dung. Bạn không được sao chép, sửa đổi, phân phối hoặc sử dụng các nội dung này mà không có sự cho phép trước bằng văn bản từ chúng tôi.
              </p>
              
              <h3>4. Sử dụng website</h3>
              <p>
                Bạn đồng ý sử dụng website của chúng tôi chỉ cho các mục đích hợp pháp và theo cách không vi phạm quyền của bất kỳ bên thứ ba nào, không hạn chế hoặc cản trở việc sử dụng website của bất kỳ ai, và không vi phạm các luật hiện hành.
              </p>
              
              <h3>5. Giới hạn trách nhiệm</h3>
              <p>
                Chúng tôi cố gắng đảm bảo thông tin trên website chính xác và cập nhật, nhưng không đảm bảo rằng nội dung không có lỗi hoặc thiếu sót. Website và tất cả nội dung, sản phẩm và dịch vụ được cung cấp "nguyên trạng" mà không có bất kỳ đảm bảo nào.
              </p>
              
              <h3>6. Chính sách bảo mật</h3>
              <p>
                Việc sử dụng website của bạn cũng tuân theo Chính sách bảo mật của chúng tôi, trong đó mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.
              </p>
              
              <h3>7. Thay đổi điều khoản</h3>
              <p>
                Chúng tôi có quyền thay đổi các điều khoản này bất cứ lúc nào. Việc bạn tiếp tục sử dụng website sau khi những thay đổi được đăng tải đồng nghĩa với việc bạn chấp nhận những thay đổi đó.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
