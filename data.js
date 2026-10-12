/**
 * Smart Click - Dữ liệu Mock Data & Câu hỏi tương tác
 * Chiến dịch: "Click khôn ngoan – Mua an toàn"
 * UTT & Cộng đồng Sinh viên Toàn quốc
 */

const SMARTCLICK_DATA = {
  // Thống kê khảo sát ban đầu
  initialSurvey: {
    totalVotes: 3842,
    q1: {
      question: "Bạn mua hàng online mấy lần trong một tháng?",
      options: [
        { id: "opt1_1", text: "Dưới 2 lần (Chỉ khi cần kíp)", votes: 614, pct: 16 },
        { id: "opt1_2", text: "2 - 5 lần (Thường xuyên săn sale)", votes: 2075, pct: 54 },
        { id: "opt1_3", text: "Trên 5 lần (Nghiện lướt sàn)", votes: 1153, pct: 30 }
      ]
    },
    q2: {
      question: "Bạn từng bị dính bẫy nhận hàng khác xa ảnh quảng cáo chưa?",
      options: [
        { id: "opt2_1", text: "Đã từng đau đớn (Ảnh thiên thần, hàng ác mộng)", votes: 3266, pct: 85 },
        { id: "opt2_2", text: "Suýt dính (May mắn check kỹ nên hủy kịp)", votes: 461, pct: 12 },
        { id: "opt2_3", text: "Chưa bao giờ (Check uy tín 100%)", votes: 115, pct: 3 }
      ]
    },
    q3: {
      question: "Bạn có thói quen đọc kỹ review có ảnh/video thật trước khi chốt đơn?",
      options: [
        { id: "opt3_1", text: "Luôn luôn soi review 1 sao & video thật", votes: 1460, pct: 38 },
        { id: "opt3_2", text: "Thỉnh thoảng, thấy nhiều 5 sao là an tâm", votes: 1729, pct: 45 },
        { id: "opt3_3", text: "Cứ thấy rẻ & lượt mua khủng là chốt ngay", votes: 653, pct: 17 }
      ]
    }
  },

  // Danh sách Shop do sinh viên bình chọn
  shops: [
    {
      id: "shop-01",
      name: "TechUni - Phụ Kiện Cáp Sạc Sinh Viên",
      platform: "Shopee Mall",
      category: "tech",
      categoryName: "Đồ công nghệ",
      tag: "safe", // safe, warning, blacklist
      tagLabel: "Shop Sinh Viên Tin Dùng",
      avatar: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=150&auto=format&fit=crop&q=80",
      description: "Chuyên củ sạc GaN, dây cáp dù bền bỉ, tai nghe học ngoại ngữ giá học sinh - sinh viên có bảo hành 1 đổi 1 trong 12 tháng.",
      ratingDesc: 98, // % đúng mô tả
      ratingReturn: 9.6, // Điểm đổi trả / 10
      ratingPrice: 5, // 5 sao giá SV
      deliverySpeed: "1-2 ngày (Hà Nội & TP.HCM)",
      verifiedCount: 1420,
      warningCount: 12,
      summary30s: {
        pros: [
          "Bảo hành điện tử bằng QR code, gửi đổi cái mới tận phòng trọ trong 48h.",
          "Cáp sạc chuẩn PD/PPS sạc laptop và điện thoại mát máy, không báo ảo.",
          "Tặng kèm dây cuốn chống gãy và túi zip chống ẩm cho sinh viên."
        ],
        cons: [
          "Các đợt sale lớn (11/11, 12/12) dễ bị hết màu trắng/đen hot.",
          "Hộp giấy carton đóng gói hơi đơn giản để tiết kiệm chi phí."
        ],
        smartTip: "Nên mua vào khung giờ 0h-9h ngày thứ Tư hàng tuần để áp thêm mã giảm 15% độc quyền của shop cho tài khoản sinh viên.",
        topReview: "“Dùng củ 65W hơn 8 tháng nay sạc cả ThinkPad lẫn iPhone mượt mà, đợt cắm nhầm nguồn bị nổ shop đổi mới luôn không hạch sách một câu!” - Hoàng Nam (K64 UTT)"
      }
    },
    {
      id: "shop-02",
      name: "GenZ Closet Official - Đồ Basic Unisex",
      platform: "TikTok Shop",
      category: "fashion",
      categoryName: "Thời trang & Quần áo",
      tag: "safe",
      tagLabel: "Shop Sinh Viên Tin Dùng",
      avatar: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=150&auto=format&fit=crop&q=80",
      description: "Áo thun cotton 250gsm, quần ống rộng hack dáng form chuẩn sinh viên. Có livestream quay cận cảnh đường may và đo size trực tiếp.",
      ratingDesc: 95,
      ratingReturn: 9.2,
      ratingPrice: 4.8,
      deliverySpeed: "2-3 ngày",
      verifiedCount: 2180,
      warningCount: 45,
      summary30s: {
        pros: [
          "Chất vải cotton dày dặn, không bai nhão sau khi giặt máy giặt KTX.",
          "Hỗ trợ đổi size miễn phí nếu mặc không vừa trong vòng 7 ngày.",
          "Mỗi áo đều có tem mác hướng dẫn giặt sấy chi tiết."
        ],
        cons: [
          "Form áo hơi rộng so với bảng size nếu bạn nào dưới 45kg cần lùi 1 size.",
          "Hàng hot như áo hoodie nỉ thường xuyên hết size L."
        ],
        smartTip: "Nên xem livestream buổi tối 20h để lấy voucher trợ giá 30k và nhìn trực tiếp mẫu cao mét bao nhiêu mặc size nào.",
        topReview: "“Mua 3 cái áo phông mặc đi học cả kỳ không xù lông tí nào. Đúng chuẩn tiền nào của nấy mà giá chỉ 129k!” - Thu Trang (NEU)"
      }
    },
    {
      id: "shop-03",
      name: "FlashStore - Loa & Tai Nghe Siêu Rẻ 79k",
      platform: "Shopee",
      category: "tech",
      categoryName: "Đồ công nghệ",
      tag: "warning",
      tagLabel: "Cần Cân Nhắc",
      avatar: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80",
      description: "Quảng cáo tai nghe bluetooth chống ồn chủ động ANC chuẩn studio, âm bass cực mạnh chỉ 79.000đ tặng kèm ốp tai.",
      ratingDesc: 62,
      ratingReturn: 4.5,
      ratingPrice: 4.9,
      deliverySpeed: "3-5 ngày",
      verifiedCount: 310,
      warningCount: 890,
      summary30s: {
        pros: [
          "Giá cực rẻ, ngoại hình nhìn từ xa khá giống hàng chính hãng.",
          "Có kèm dây sạc ngắn và hộp in bắt mắt."
        ],
        cons: [
          "Không hề có chống ồn ANC như quảng cáo (chỉ là nút nhét tai cao su thông thường).",
          "Pin dùng thực tế chỉ được 1.5 - 2 tiếng là sập nguồn, micro đàm thoại nghẹt tiếng.",
          "Chính sách đổi trả khó khăn: bắt khách tự chịu 100% phí gửi hàng hoàn."
        ],
        smartTip: "Nếu chỉ cần nghe chống cháy lúc chạy bộ thì tạm được. Muốn học online, đàm thoại hay nghe nhạc chất lượng thì tuyệt đối KHÔNG NÊN mua.",
        topReview: "“Quảng cáo pin 10 tiếng, về nghe được 45 phút hết pin. Nhắn tin đòi bảo hành thì shop hẹn lần lữa rồi seen không trả lời!” - Đức Minh (ĐH Bách Khoa)"
      }
    },
    {
      id: "shop-04",
      name: "Gia Dụng KTX Tiện Lợi Giá Gốc",
      platform: "Lazada",
      category: "home",
      categoryName: "Gia dụng & Decor KTX",
      tag: "safe",
      tagLabel: "Shop Sinh Viên Tin Dùng",
      avatar: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=150&auto=format&fit=crop&q=80",
      description: "Nồi lẩu mini chống dính, kệ sách lắp ghép, móc dán tường siêu dính chịu lực 10kg cho phòng trọ sinh viên.",
      ratingDesc: 93,
      ratingReturn: 8.9,
      ratingPrice: 5,
      deliverySpeed: "2 ngày",
      verifiedCount: 1650,
      warningCount: 38,
      summary30s: {
        pros: [
          "Nồi lẩu mini có rơ-le tự ngắt khi cạn nước, an toàn chống chập điện phòng trọ.",
          "Kệ giày và giá treo đồ có khớp nối kim loại chắc chắn hơn loại nhựa rẻ tiền.",
          "Shop có tặng kèm hướng dẫn mẹo vệ sinh chống bong tróc lớp chống dính."
        ],
        cons: [
          "Màu sắc thực tế của kệ vải hơi nhạt hơn trên ảnh render 3D một chút.",
          "Nồi mini dây cắm hơi ngắn (khoảng 80cm) cần dùng thêm ổ cắm nối."
        ],
        smartTip: "Mua combo nồi + khay hấp cùng lúc sẽ rẻ hơn mua lẻ 40k và được miễn phí vận chuyển.",
        topReview: "“Cái nồi lẩu mini cứu đói cả phòng mùa ôn thi. Nấu mì, luộc trứng, xào rau ok hết, rửa cực dễ!” - Lê Thảo (UTT)"
      }
    },
    {
      id: "shop-05",
      name: "Xưởng Kho Sỉ Quần Áo Quảng Châu 19k",
      platform: "Facebook / Web Lạ",
      category: "fashion",
      categoryName: "Thời trang & Quần áo",
      tag: "blacklist",
      tagLabel: "Góc Cảnh Báo/Blacklist",
      avatar: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=150&auto=format&fit=crop&q=80",
      description: "Chạy quảng cáo xả kho quần áo thời trang, áo khoác dạ Hàn Quốc đồng giá 19k-39k. Yêu cầu chuyển khoản trước tiền cọc vận chuyển 50k.",
      ratingDesc: 12,
      ratingReturn: 0.5,
      ratingPrice: 1,
      deliverySpeed: "Bặt vô âm tín",
      verifiedCount: 4,
      warningCount: 2450,
      summary30s: {
        pros: [
          "Không có bất kỳ điểm cộng nào - Hoàn toàn là thủ đoạn lừa đảo tinh vi!"
        ],
        cons: [
          "Lấy hình ảnh của các shop thời trang cao cấp khác gắn logo xả kho rẻ mạt.",
          "Ép khách cọc 50k - 100k thẻ cào hoặc chuyển khoản rồi lập tức chặn tin nhắn (block).",
          "Nếu có giao hàng COD thì bên trong chỉ là giẻ lau rách hoặc giấy vụn."
        ],
        smartTip: "TUYỆT ĐỐI KHÔNG CHUYỂN CỌC NGOÀI SÀN. Giá một chiếc áo dạ nhập không bao giờ dưới 200k, giá 19k là 100% lừa đảo!",
        topReview: "“Mình bị lừa mất 100k tiền cọc hồi năm nhất. Fanpage sau khi lừa xong đổi tên thành shop khác rồi tiếp tục chạy ads!” - Mai Phương (Học viện Tài Chính)"
      }
    },
    {
      id: "shop-06",
      name: "Sách Cũ Sinh Viên - UTT & Hà Nội Hub",
      platform: "Website Sinh Viên",
      category: "books",
      categoryName: "Sách & Giáo trình",
      tag: "safe",
      tagLabel: "Shop Sinh Viên Tin Dùng",
      avatar: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=150&auto=format&fit=crop&q=80",
      description: "Cộng đồng trao đổi và nhượng lại giáo trình đại cương, sách chuyên ngành kỹ thuật, kinh tế, tiếng Anh TOEIC giá chỉ từ 15k-30k.",
      ratingDesc: 97,
      ratingReturn: 9.8,
      ratingPrice: 5,
      deliverySpeed: "Giao tận tay tại cổng trường / Ship 1 ngày",
      verifiedCount: 1890,
      warningCount: 8,
      summary30s: {
        pros: [
          "Sách có ghi chú sẵn đề thi và mẹo qua môn của các khóa anh chị đi trước.",
          "Cho phép kiểm tra sách trực tiếp trước khi nhận tiền, không vừa ý hoàn tiền.",
          "Có nhóm Zalo hỗ trợ giải bài tập và chia sẻ slide bài giảng miễn phí."
        ],
        cons: [
          "Một số cuốn sách toán cao cấp giấy hơi ố vàng vì đã qua 2-3 đời sinh viên.",
          "Số lượng có hạn, thường hết nhanh vào đầu mỗi học kỳ."
        ],
        smartTip: "Nên đặt sách trước ngày nhập học 1 tuần để chọn được sách còn mới và có kèm trọn bộ đề cương ôn tập.",
        topReview: "“Tiết kiệm được gần cả triệu tiền giáo trình kỳ vừa rồi, lại còn được xin vía qua môn từ tiền bối K62!” - Tuấn Anh (UTT)"
      }
    },
    {
      id: "shop-07",
      name: "Mỹ Phẩm Xách Tay Auth Săn Sale 99k",
      platform: "TikTok / Shopee",
      category: "cosmetics",
      categoryName: "Mỹ phẩm & Skincare",
      tag: "blacklist",
      tagLabel: "Góc Cảnh Báo/Blacklist",
      avatar: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=150&auto=format&fit=crop&q=80",
      description: "Rao bán serum phục hồi B5, kem chống nắng La Roche-Posay dung tích 50ml chỉ 99k (Giá hãng hơn 450k) với lý do 'hàng tuồn hải quan'.",
      ratingDesc: 18,
      ratingReturn: 1.0,
      ratingPrice: 1.5,
      deliverySpeed: "Giao nhanh nhưng hàng giả",
      verifiedCount: 15,
      warningCount: 1890,
      summary30s: {
        pros: [
          "Vỏ hộp in laser khá tinh xảo nếu nhìn thoáng qua."
        ],
        cons: [
          "Mùi cồn nồng nặc, kem lỏng và bết dính gây kích ứng, nổi mụn bọc nặng nề.",
          "Mã vạch và QR code quét ra link web giả mạo do shop tự tạo.",
          "Khái niệm 'hàng tuồn xả kho rẻ 80%' trong mỹ phẩm chính hãng là hoàn toàn bịa đặt."
        ],
        smartTip: "Mỹ phẩm bôi lên mặt tuyệt đối chỉ mua tại Mall chính hãng hoặc đại lý ủy quyền có hóa đơn VAT đỏ. Rẻ 99k nhưng tiền chữa da liễu mất 3 triệu!",
        topReview: "“Dùng thử 2 hôm mặt đỏ rát nổi mụn nước phải đi viện Da Liễu khám. Mọi người đừng bao giờ ham rẻ mua mấy lọ serum này!” - Ngọc Hà (ĐH Thương Mại)"
      }
    },
    {
      id: "shop-08",
      name: "Decor KTX - Đèn Học & Bàn Gấp Thông Minh",
      platform: "Shopee",
      category: "home",
      categoryName: "Gia dụng & Decor KTX",
      tag: "safe",
      tagLabel: "Shop Sinh Viên Tin Dùng",
      avatar: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=150&auto=format&fit=crop&q=80",
      description: "Bàn học gấp gọn có khe cắm iPad, đèn LED chống cận 3 chế độ sáng cắm sạc dự phòng, gương dán toàn thân không vỡ.",
      ratingDesc: 94,
      ratingReturn: 9.1,
      ratingPrice: 4.9,
      deliverySpeed: "2-3 ngày",
      verifiedCount: 1320,
      warningCount: 29,
      summary30s: {
        pros: [
          "Bàn học chân kim loại bọc cao su chống trượt trên giường tầng KTX rất chắc.",
          "Đèn học có pin tích điện dùng được 4 tiếng khi phòng bị cúp điện lúc ôn thi.",
          "Đóng gói 3 lớp xốp khí chống va đập vỡ góc bàn."
        ],
        cons: [
          "Khe cắm iPad hơi khít với những máy có ốp lưng quá dày.",
          "Màu gỗ sáng dễ bám mực bút bi nếu không lau ngay."
        ],
        smartTip: "Áp mã Freeship Xtra vào các ngày giữa tháng (15 hàng tháng) để giảm 30k phí ship vì kiện hàng hơi cồng kềnh.",
        topReview: "“Đèn học xịn sò, bật mức ánh sáng vàng học đêm không bị mỏi mắt mà không làm phiền bạn cùng phòng!” - Khánh Huyền (ĐH Giao Thông Vận Tải)"
      }
    }
  ],

  // Góc bóc phốt & Cảnh báo lừa đảo (Drama Zone)
  dramaPosts: [
    {
      id: "post-101",
      author: "Sinh viên giấu tên (Khoa CNTT - UTT)",
      isAnonymous: true,
      timeAgo: "2 giờ trước",
      shopName: "AppleStore_GiaRe_Online (TikTok Shop)",
      categoryBadge: "Bẫy lừa cọc & Mạo danh",
      damageAmount: "350.000 VNĐ",
      title: "Cảnh báo thủ đoạn 'Tặng tai nghe AirPods Pro chỉ chịu phí ship 350k'",
      content: "Hôm qua mình lướt TikTok thấy video clip livestream nói rằng shop kỷ niệm 5 năm thành lập, tặng 50 suất tai nghe AirPods Pro chính hãng cho sinh viên, chỉ cần thanh toán phí kiểm định & bảo hiểm 350k khi nhận hàng. Lúc shipper giao tới, vì tò mò và tưởng trúng món hời nên mình vội vàng đưa tiền. Mở hộp ra bên trong là một chiếc tai nghe đồ chơi bằng nhựa rỗng không thể kết nối, vỏ hộp móp méo in chữ tiếng Trung sai chính tả. Mình gọi lại số trên bưu phẩm thì bị thuê bao, nhắn tin cho trang TikTok thì đã bị chặn nick hoàn toàn!",
      smartAdvice: {
        badge: "Cảnh báo từ Smart Click:",
        analysis: "Đây là chiêu trò 'Lừa đảo phí ship/phí bảo hiểm quà tặng' kinh điển. Chiếc tai nghe rác chỉ có giá vốn 15.000đ nhưng chúng thu COD 350.000đ. Không có bất kỳ công ty nào tặng đồ xịn tiền triệu mà lại bắt đóng phí vài trăm ngàn qua shipper!",
        action: "Quy tắc nằm lòng: KHÔNG BAO GIỜ nhận quà tặng có thu phí COD nếu bản thân không chủ động tham gia chương trình chính thống. Nếu lỡ dính, lập tức chụp mã vận đơn và liên hệ bưu cục giao hàng yêu cầu giữ tiền chuyển hoàn trong 24h!"
      },
      reactions: {
        sympathy: 142, // Đồng cảnh ngộ
        helpful: 285,  // Hữu ích
        avoided: 189   // Đã né
      },
      commentsCount: 38,
      comments: [
        { user: "Trần Tuấn (K63)", text: "Tuần trước phòng mình có đứa cũng dính y hệt, mất 290k tiền ăn cả tuần!", time: "1 giờ trước" },
        { user: "Lan Anh", text: "Cảm ơn bài viết cảnh báo, vừa thấy video đó trên For You Page xong may mà không để lại địa chỉ.", time: "45 phút trước" }
      ]
    },
    {
      id: "post-102",
      author: "Hoàng Yến (Viện Kinh tế & Vận tải)",
      isAnonymous: false,
      timeAgo: "5 giờ trước",
      shopName: "Xưởng Giày Sneaker 1:1 Siêu Cấp",
      categoryBadge: "Treo đầu dê bán thịt chó",
      damageAmount: "450.000 VNĐ",
      title: "Mua giày 'Real Like New' nhận về đôi giày bốc mùi keo dán",
      content: "Thấy shop cam kết giày chính hãng thanh lý của sinh viên ra trường, hình chụp trên kệ lung linh như showroom. Mình nhắn tin hỏi kỹ có được đồng kiểm không thì shop bảo: 'Quy định sàn không cho bóc ra đi thử nhưng shop bảo hành 7 ngày'. Vừa nhận hàng xong mở ra thì ôi thôi: đế giày cong vênh, logo in lệch cả centimet, keo dán lem nhem bốc mùi hôi nồng nặc. Mình bấm Yêu cầu Trả hàng/Hoàn tiền trên ứng dụng thì shop lập tức gọi điện thoại đe dọa không cho hủy, dọa đăng thông tin cá nhân lên mạng. Mọi người chú ý shop này nhé!",
      smartAdvice: {
        badge: "Lời khuyên từ Smart Click:",
        analysis: "Gian thương lợi dụng tâm lý sợ hãi của sinh viên khi bị đe dọa. Trên các sàn TMĐT uy tín (Shopee/TikTok Shop), quyền Trả hàng/Hoàn tiền là QUYỀN LỢI TỐI THƯỢNG của người mua trong thời gian sàn quy định (3 - 15 ngày).",
        action: "Cứ bấm 'Yêu cầu Trả hàng / Hoàn tiền' với lý do 'Hàng giả/nhái hoặc khác mô tả', đính kèm ảnh cận cảnh lỗi keo/đế. Tuyệt đối không nghe lời shop hủy yêu cầu trả hàng, chặn số điện thoại đe dọa và gửi bằng chứng cho tổng đài sàn xử lý phạt shop!"
      },
      reactions: {
        sympathy: 96,
        helpful: 412,
        avoided: 230
      },
      commentsCount: 52,
      comments: [
        { user: "Admin Smart Click", text: "Bạn đừng lo nhé, sàn sẽ bảo vệ người mua. Hãy bấm Trả hàng ngay và giữ nguyên video unbox hàng!", time: "4 giờ trước" }
      ]
    },
    {
      id: "post-103",
      author: "Sinh viên giấu tên (ĐH Xây Dựng)",
      isAnonymous: true,
      timeAgo: "1 ngày trước",
      shopName: "Hội Săn Deal Flash Sale 1k - Nhóm Telegram",
      categoryBadge: "Bẫy lừa đảo nạp tiền nhiệm vụ",
      damageAmount: "1.200.000 VNĐ",
      title: "Mất đứt 1 tháng tiền sinh hoạt vì bẫy 'Làm nhiệm vụ săn voucher 500k'",
      content: "Ban đầu được mời vào nhóm Zalo/Telegram săn sale mã giảm giá 1k cho sinh viên. Admin bảo tải app và làm nhiệm vụ bấm 'Thích' sản phẩm trên Shopee để nhận hoa hồng 20k-50k. Mình làm thử 3 lần đầu nhận được 80k thật vào tài khoản ngân hàng nên tin sái cổ. Đến lần thứ 4, admin yêu cầu 'tạm ứng đơn hàng' 1.2 triệu để chốt đơn voucher Shopee giá trị cao, cam kết hoàn lại cả gốc lẫn 20% lãi sau 5 phút. Sau khi mình chuyển khoản xong, nó báo lỗi 'sai cú pháp' và bắt chuyển thêm 3 triệu để kích hoạt lại. Lúc này mình mới bàng hoàng nhận ra đã bị lừa sạch tiền ăn của tháng!",
      smartAdvice: {
        badge: "Báo động đỏ từ Smart Click:",
        analysis: "Đây là đường dây lừa đảo 'Nhiệm vụ đơn hàng TMĐT' có tổ chức. Chiêu bài thả mồi vài chục ngàn đồng để tạo lòng tin, sau đó giăng lưới với số tiền tiền triệu. Shopee, Lazada hay TikTok Shop KHÔNG BAO GIỜ tuyển cộng tác viên chuyển khoản tạm ứng làm nhiệm vụ như vậy!",
        action: "Dừng ngay lập tức, không chuyển thêm bất kỳ đồng nào! Lưu lại biên lai chuyển khoản, số tài khoản nhận tiền và làm đơn tố giác ra cơ quan Công an phường/quận gần nhất để phong tỏa tài khoản lừa đảo."
      },
      reactions: {
        sympathy: 320,
        helpful: 654,
        avoided: 512
      },
      commentsCount: 89,
      comments: [
        { user: "Minh Quân", text: "Trời ơi bài học xương máu luôn, sinh viên nghèo mà chúng nó cũng không tha!", time: "18 giờ trước" }
      ]
    }
  ],

  // Minigame: Battle Soi Review Thật vs Review Ảo
  battles: [
    {
      id: "battle-1",
      productName: "Tai nghe True Wireless ANC Chống Ồn 149k",
      category: "Công nghệ",
      reviewA: {
        type: "fake",
        author: "nguyenth***92 (Tài khoản không avatar)",
        stars: 5,
        time: "Đăng cách đây 12 phút",
        images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=80"],
        text: "Sản phẩm tuyệt vời đóng gói cẩn thận giao hàng cực nhanh shop nhiệt tình 5 sao nha mọi người nên mua ủng hộ shop nè mãi yêu shop chất lượng âm thanh đỉnh chóp không có điểm gì để chê luôn á!",
        clues: [
          "Dùng từ ngữ ca ngợi sáo rỗng, chuẩn mẫu copy-paste không đề cập tính năng cụ thể.",
          "Tên nick là chuỗi chữ số tự động sinh ra (nguyenth***92), không có ảnh đại diện thật.",
          "Ảnh sản phẩm là ảnh chụp studio có sẵn trên mạng của hãng khác, không có bối cảnh thực tế.",
          "Hàng 149k mà khen 'âm thanh đỉnh chóp không có điểm chê' là dấu hiệu phi thực tế."
        ]
      },
      reviewB: {
        type: "real",
        author: "Bảo Trâm (Sinh viên K64 UTT - Có badge Đã Mua Hàng)",
        stars: 4,
        time: "Đã dùng 3 tuần mới đánh giá",
        images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&auto=format&fit=crop&q=80"],
        text: "Tai nghe vỏ nhựa hơi mỏng, cảm ứng chạm thỉnh thoảng bị delay 1 nhịp. Chống ồn ở mức giảm tiếng ồn xe cộ ngoài đường tầm 50% chứ không cách âm hoàn toàn được như hàng tiền triệu. Nhưng với giá 149k thì pin trâu (nghe liên tục được gần 4h) và micro gọi Zalo rõ ràng là quá ổn áp cho sinh viên học online rồi.",
        clues: [
          "Nêu rõ cả điểm cộng lẫn điểm trừ khách quan sau 3 tuần trải nghiệm thực tế.",
          "Ảnh chụp góc bàn học cá nhân có vết xước nhẹ chân thực.",
          "Đánh giá 4 sao có căn cứ, không tâng bốc mù quáng."
        ]
      },
      correctOption: "B",
      explanation: "Review B là ĐÁNH GIÁ THẬT! Người mua thật luôn chỉ ra được chi tiết thực tế (chất liệu vỏ, độ delay, khả năng chống ồn thực tế, thời lượng pin). Còn Review A là mẫu SEEDING ĐIỂN HÌNH dùng văn mẫu tâng bốc vô thưởng vô phạt!"
    },
    {
      id: "battle-2",
      productName: "Serum Trị Mụn Thâm B5 Tốc Hành 79k",
      category: "Mỹ phẩm",
      reviewA: {
        type: "real",
        author: "Hà My (Đã mua hàng - Đánh giá 3 sao)",
        stars: 3,
        time: "Đánh giá sau 14 ngày sử dụng",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&auto=format&fit=crop&q=80"],
        text: "Chất serum hơi dính nhớt, bôi lên da cảm giác thẩm thấu khá chậm, phải vỗ tầm 5 phút mới ráo. Tác dụng cấp ẩm bình thường, mụn thâm cũ thì không thấy mờ rõ rệt nhưng may là da mình nhạy cảm không bị nổi thêm mụn mới. Ai da dầu nên cân nhắc vì có thể hơi bí tắc lỗ chân lông nhé.",
        clues: [
          "Mô tả chính xác kết cấu (texture) dung dịch, cảm giác khi thoa lên da và thời gian thấm.",
          "Đưa ra lời khuyên phân loại cho loại da cụ thể (da dầu / da nhạy cảm).",
          "Số sao trung thực (3 sao)."
        ]
      },
      reviewB: {
        type: "fake",
        author: "user_81729381 (0 lượt theo dõi)",
        stars: 5,
        time: "Vừa nhận hàng 10 phút trước",
        images: ["https://images.unsplash.com/photo-1608248597359-009772594a97?w=300&auto=format&fit=crop&q=80"],
        text: "Mới dùng 1 đêm mà sáng dậy mụn xẹp lép luôn thần thánh quá mọi người ơi da căng bóng như gái Hàn Quốc luôn ạ ship nhanh đóng hàng đẹp sẽ ủng hộ shop dài dài mãi đỉnh!",
        clues: [
          "Tuyên bố 'mới dùng 1 đêm mụn xẹp da căng bóng' là phi khoa học da liễu hoàn toàn.",
          "Vừa nhận hàng 10 phút mà đã viết như thể đã dùng qua đêm.",
          "Cụm từ seeding quen thuộc: 'thần thánh quá', 'mãi đỉnh', 'ship nhanh'."
        ]
      },
      correctOption: "A",
      explanation: "Review A là REVIEW THẬT! Trong y khoa và mỹ phẩm, không có serum nào làm 'xẹp mụn chỉ sau 1 đêm'. Review B là chiêu trò seeding ảo phóng đại công dụng nguy hiểm của các loại kem trộn / serum trôi nổi!"
    },
    {
      id: "battle-3",
      productName: "Củ Sạc Nhanh 65W 3 Cổng GaN Giá 189k",
      category: "Công nghệ",
      reviewA: {
        type: "fake",
        author: "tranvanh*** (Hàng loạt review giống hệt nhau)",
        stars: 5,
        time: "Cùng ngày với 20 review 5 sao khác",
        images: ["https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&auto=format&fit=crop&q=80"],
        text: "Củ sạc rất tốt sạc siêu nhanh cắm không nóng máy xíu nào hàng chính hãng 100% giá rẻ bất ngờ mọi người nên mua nhé!",
        clues: [
          "Văn mẫu sao chép hàng loạt, xuất hiện cùng một thời điểm với hàng chục nick clone khác.",
          "Tuyên bố sạc 65W 'không nóng máy xíu nào' là sai quy luật vật lý (công suất cao luôn ấm lên ở mức an toàn).",
          "Không hề đo đạc hay nói cắm vào máy gì, cáp gì."
        ]
      },
      reviewB: {
        type: "real",
        author: "Vũ Long (Khoa Cơ Khí - Đã mua 2 tháng)",
        stars: 5,
        time: "Đánh giá có video test thiết bị đo công suất",
        images: ["https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=300&auto=format&fit=crop&q=80"],
        text: "Mình có cắm qua đồng hồ đo USB Tester: Cổng Type-C1 kích hoạt được chuẩn PD 65W cho laptop Dell Inspiron sạc ổn định ở 58W-62W. Khi cắm thêm điện thoại vào cổng C2 thì củ sạc tự ngắt 1 giây để phân chia lại dòng thành 45W + 18W đúng như thông số ghi trên thân. Củ sạc dùng GaN nên nhỏ gọn, cắm lâu có ấm lên tầm 48 độ C nhưng hoàn toàn trong ngưỡng an toàn.",
        clues: [
          "Dẫn chứng số liệu đo đạc cụ thể (Watt, vôn, phân chia dòng khi cắm nhiều cổng).",
          "Hiểu rõ cơ chế tự ngắt reset dòng sạc của chuẩn GaN hiện đại.",
          "Thừa nhận nhiệt độ thực tế khi vận hành."
        ]
      },
      correctOption: "B",
      explanation: "Review B là ĐÁNH GIÁ CỰC KỲ ĐÁNG TIN CẬY! Người review có kiến thức kỹ thuật, có thiết bị đo thực tế và mô tả đúng quy chuẩn kỹ thuật của củ sạc GaN. Review A chỉ là nick bot seeding!"
    }
  ],

  // Quiz 10 câu hỏi "Người Mua Hàng Tỉnh Táo"
  quiz: [
    {
      id: 1,
      question: "Bạn thấy bài đăng trên mạng: 'Xả kho iPhone 15 Pro Max chỉ cần thanh toán cước vận chuyển 180k'. Hành động chuẩn nhất là gì?",
      options: [
        "Nhanh tay đặt ngay 2 chiếc kẻo người khác nhận hết phần hời.",
        "Nhắn tin xin shop giảm cước xuống 100k cho sinh viên.",
        "Bỏ qua ngay lập tức và báo cáo bài viết lừa đảo thu COD.",
        "Rủ cả phòng trọ cùng đăng ký để chia nhau tiền cước."
      ],
      correct: 2,
      explanation: "Không có bữa trưa nào miễn phí! Đây là chiêu trò lừa đảo thu cước COD cho một món đồ nhựa phế thải. Tuyệt đối không để lòng tham dẫn dụ."
    },
    {
      id: 2,
      question: "Shop trên sàn TMĐT nhắn tin riêng cho bạn: 'Bạn hủy đơn trên sàn rồi chuyển khoản trực tiếp qua Zalo cho mình để được giảm thêm 50k nhé'. Bạn xử lý thế nào?",
      options: [
        "Đồng ý ngay vì tiết kiệm thêm được 50k tiền ăn sáng.",
        "Từ chối thẳng thừng và chỉ giao dịch thanh toán qua hệ sinh thái của sàn.",
        "Chuyển cọc trước một nửa 25k cho yên tâm rồi nhận hàng trả nốt.",
        "Gửi số thẻ ngân hàng và mã OTP cho shop để shop làm thủ tục trừ tiền."
      ],
      correct: 1,
      explanation: "Khi rời khỏi sàn giao dịch, bạn mất 100% sự bảo vệ của chính sách sàn (Không thể bấm Trả hàng/Hoàn tiền, không có bằng chứng khiếu nại). 99% các trường hợp này là lừa tiền rồi block!"
    },
    {
      id: 3,
      question: "Khi vào xem một sản phẩm, cách lọc review khôn ngoan nhất để thấy sự thật là gì?",
      options: [
        "Chỉ đọc các đánh giá 5 sao có nhiều icon trái tim nhất.",
        "Ưu tiên lọc vào mục Đánh giá 1 sao - 2 sao và mục có kèm Ảnh/Video thực tế.",
        "Xem tổng số sao trung bình trên 4.9 là an tâm đặt luôn.",
        "Đọc review của các nick mới tạo trong ngày."
      ],
      correct: 1,
      explanation: "Review 1-2 sao chính là nơi khách hàng thật nói về lỗi sản phẩm, thái độ dịch vụ và những điều shop cố tình giấu. Review có video/ảnh thật giúp đối chiếu với ảnh quảng cáo."
    },
    {
      id: 4,
      question: "Thủ đoạn 'Treo đầu dê bán thịt chó' qua phân loại sản phẩm trên sàn TMĐT thường diễn ra như thế nào?",
      options: [
        "Hình ảnh quảng cáo là máy tính xách tay giá 29k, nhưng khi bấm vào chọn thì 29k chỉ là miếng lót chuột.",
        "Shop giao đúng hàng nhưng tặng thêm quà bí mật.",
        "Shop bán hàng chất lượng cao hơn cả hình chụp.",
        "Shop gửi hàng nhanh hơn thời gian cam kết 3 ngày."
      ],
      correct: 0,
      explanation: "Gian thương cố tình đưa 1 phụ kiện giá rẻ bèo vào cùng phân loại của sản phẩm đắt tiền để hệ thống hiển thị mức giá thấp giật gân, đánh lừa thuật toán tìm kiếm."
    },
    {
      id: 5,
      question: "Quy tắc vàng khi nhận kiện hàng từ shipper giao đến phòng trọ là gì?",
      options: [
        "Xé toang gói hàng vứt hộp đi luôn cho gọn phòng.",
        "Nhận hàng xong để đó 1 tuần sau mới mở khi có thời gian rảnh.",
        "Kiểm tra kỹ mã vận đơn, quay video rõ nét 6 mặt kiện hàng liền mạch từ lúc khui hộp.",
        "Ký nhận ngay mà không cần nhìn tên người gửi và số tiền thu hộ."
      ],
      correct: 2,
      explanation: "Video unbox quay liền mạch, không cắt ghép là BẰNG CHỨNG THÉP duy nhất được sàn TMĐT chấp nhận 100% khi bạn khiếu nại hàng bể vỡ, thiếu phụ kiện hoặc giao sai mẫu."
    },
    {
      id: 6,
      question: "Shop nhắn tin nài nỉ: 'Bạn bấm Đã nhận hàng giúp mình trước nhé, mình đang bị kẹt tiền, tí mình gửi quà tặng bù'. Bạn nên làm gì?",
      options: [
        "Thương shop nên bấm ngay lập tức dù chưa kiểm tra hàng.",
        "Bấm xác nhận rồi nhắc shop chuyển khoản quà tặng ngay.",
        "Tuyệt đối KHÔNG bấm 'Đã nhận được hàng' khi chưa kiểm tra kỹ sản phẩm hoạt động tốt.",
        "Đưa tài khoản cho shipper bấm hộ."
      ],
      correct: 2,
      explanation: "Một khi đã bấm 'Đã nhận được hàng', đơn hàng hoàn tất và tiền sẽ chuyển thẳng cho người bán. Lúc đó bạn mất quyền yêu cầu trả hàng tự động của sàn!"
    },
    {
      id: 7,
      question: "Làm thế nào để biết một deal giảm giá '80% Flash Sale ngày 11/11' có phải là giảm giá thật hay không?",
      options: [
        "Tin vào dòng chữ gạch ngang đỏ ghi giá cũ 1.000.000đ sale còn 200.000đ.",
        "Dùng công cụ soi lịch sử giá hoặc theo dõi giá niêm yết của mặt hàng trong 30 ngày trước đó.",
        "Càng nhiều người mua thì chắc chắn giá đó là giá hời nhất lịch sử.",
        "Cứ canh đúng 0h đêm là tự động được giảm thật 100%."
      ],
      correct: 1,
      explanation: "Nhiều shop dùng chiêu trò nâng giá gốc lên gấp 3 lần trước ngày sale rồi gắn mác 'Giảm 70%'. Soi biểu đồ lịch sử biến động giá sẽ giúp bạn phát hiện bẫy giá ảo này ngay."
    },
    {
      id: 8,
      question: "Trong kiện hàng bạn nhận được có một tấm thiệp 'Cào trúng thưởng 50 triệu - Quét mã QR Zalo để nhận tiền'. Bạn làm gì?",
      options: [
        "Vội vàng quét mã QR và điền số thẻ ngân hàng để nhận 50 triệu ăn mừng.",
        "Chia sẻ mã QR cho cả lớp cùng cào trúng thưởng.",
        "Vứt ngay vào thùng rác, tuyệt đối không quét mã QR lạ chứa mã độc hoặc bẫy lừa cọc.",
        "Chụp ảnh gửi cho người thân nhờ quét hộ."
      ],
      correct: 2,
      explanation: "Mã QR trong kiện hàng là cổng dẫn dụ vào các nhóm lừa đảo đóng phí nhận thưởng hoặc tải file APK độc hại chiếm quyền điều khiển điện thoại và tài khoản ngân hàng!"
    },
    {
      id: 9,
      question: "Dấu hiệu nào sau đây cho thấy một shop mỹ phẩm/skincare có nguy cơ cao bán hàng giả?",
      options: [
        "Có gian hàng chính hãng LazMall/Shopee Mall có dấu tích cam kết chính hãng 100%.",
        "Có đầy đủ hóa đơn chứng từ VAT và tem phụ tiếng Việt của công ty nhập khẩu.",
        "Giá bán rẻ bằng 1/4 giá niêm yết toàn cầu, kèm lý do 'hàng tuồn hải quan/xả kho mất hộp'.",
        "Chính sách đổi trả minh bạch trong 15 ngày."
      ],
      correct: 2,
      explanation: "Hãng mỹ phẩm chính ngạch quản lý chuỗi cung ứng cực kỳ nghiêm ngặt, không bao giờ có 'hàng tuồn giá 1/4' tràn lan. Đó 100% là kem trộn hoặc hàng gia công nhái xuất xứ trôi nổi!"
    },
    {
      id: 10,
      question: "Khi mua hàng trên mạng, phương thức thanh toán nào an toàn nhất để bảo vệ tiền của bạn?",
      options: [
        "Chuyển khoản toàn bộ tiền trước vào số tài khoản cá nhân của chủ shop.",
        "Nạp tiền qua thẻ cào điện thoại gửi mã số cho người bán.",
        "Thanh toán qua ví điện tử/thẻ liên kết trực tiếp trên sàn TMĐT được giữ tiền trung gian.",
        "Đưa tiền mặt cho bất kỳ ai xưng là người quen của chủ shop."
      ],
      correct: 2,
      explanation: "Cơ chế Escrow (giữ tiền trung gian) của sàn TMĐT đảm bảo người bán chỉ nhận được tiền khi bạn đã nhận hàng đúng mô tả và hết thời gian khiếu nại."
    }
  ],

  // 6 Chiêu trò lừa đảo (Flashcards Lật Thẻ)
  tricks: [
    {
      id: "trick-1",
      icon: "fa-tags",
      title: "Nâng giá khống rồi gán mác Sale 80%",
      short: "Chiêu trò tạo ảo giác món hời",
      backContent: "Gian thương tăng giá gốc sản phẩm từ 150k lên 600k trước ngày hội sale 1 tuần, sau đó gắn mác 'Giảm sốc 75% còn 150k'. Sinh viên tưởng vớ được deal hời nhưng thực chất giá không hề giảm một xu!",
      counterMeasure: "Dùng tiện ích so sánh lịch sử giá hoặc theo dõi giá ở ít nhất 3 shop khác nhau trước khi chốt đơn."
    },
    {
      id: "trick-2",
      icon: "fa-robot",
      title: "Seeding Review Ảo Bằng Tool",
      short: "Hàng ngàn đánh giá 5 sao rởm",
      backContent: "Shop thuê dịch vụ đặt đơn ảo và dùng tool tự động spam hàng ngàn đánh giá 5 sao kèm hình ảnh chụp sẵn từ các trang web Trung Quốc. Các review này thường có văn phong vô nghĩa và nick không avatar.",
      counterMeasure: "Lọc ngay vào xem review 1 sao - 2 sao và các đánh giá có ảnh chụp góc bàn/video thực tế của người dùng Việt."
    },
    {
      id: "trick-3",
      icon: "fa-comment-dollar",
      title: "Dụ Giao Dịch Zalo / Facebook",
      short: "Né sàn để phủi bỏ trách nhiệm",
      backContent: "Shop chủ động nhắn tin dụ khách: 'Giao dịch qua Zalo shop bớt thêm 30k tiền hoa hồng sàn'. Khi khách chuyển khoản xong, shop gửi hàng lỗi hoặc block luôn liên lạc.",
      counterMeasure: "Tuyệt đối không bao giờ rời khỏi sàn. 30k tiền bớt không đáng để đánh đổi bằng rủi ro mất trắng 100% tiền hàng!"
    },
    {
      id: "trick-4",
      icon: "fa-gift",
      title: "Bẫy Quà Tặng Miễn Phí Thu COD",
      short: "Quà tặng 0đ nhưng cước 290k",
      backContent: "Gọi điện hoặc nhắn tin báo bạn trúng thưởng đồng hồ, nước hoa xịn 0đ, chỉ cần hỗ trợ 'tiền cước vận chuyển và bảo hiểm' từ 150k-350k. Hàng nhận được chỉ là phế liệu đồ chơi.",
      counterMeasure: "Từ chối nhận mọi bưu phẩm 'quà tặng' mà người gửi yêu cầu thu tiền COD bất thường!"
    },
    {
      id: "trick-5",
      icon: "fa-qrcode",
      title: "Mã QR Độc Hại Trong Kiện Hàng",
      short: "Thẻ cào trúng thưởng ảo",
      backContent: "Bên trong gói hàng có thẻ cào may mắn 'Chúc mừng bạn trúng 20 triệu, quét mã QR để vào nhóm nhận thưởng'. Mã QR này sẽ dẫn vào bẫy lừa đảo nạp tiền nhiệm vụ hoặc cài app gián điệp.",
      counterMeasure: "Vứt ngay thẻ cào vào thùng rác. Không bao giờ quét mã QR lạ từ các kiện hàng không rõ nguồn gốc."
    },
    {
      id: "trick-6",
      icon: "fa-cube",
      title: "Phân Loại Hàng Đánh Lận Con Đen",
      short: "Giá hiển thị một đằng, bán một nẻo",
      backContent: "Hình đại diện là máy hút bụi cầm tay giá 19k. Nhưng khi bấm vào chọn phân loại thì 19k là 'đầu chổi sơ cua', còn chiếc máy thật có giá 350k. Người mua không để ý sẽ chốt nhầm phụ kiện.",
      counterMeasure: "Luôn kiểm tra kỹ tên phân loại được chọn trong giỏ hàng trước khi bấm nút Thanh toán cuối cùng."
    }
  ],

  // 5 Bước Checklist Mua Sắm Bỏ Túi
  checklist: [
    {
      step: 1,
      title: "Soi Lý Lịch Người Bán (Shop Background)",
      desc: "Kiểm tra tuổi đời shop (> 6 tháng), tỷ lệ phản hồi chat (> 90%), đánh giá trung bình (> 4.7 sao) và ưu tiên shop Mall hoặc Shop Yêu Thích có bảo chứng."
    },
    {
      step: 2,
      title: "Đọc Review 1 Sao & Soi Ảnh Thật",
      desc: "Lọc thẳng vào mục đánh giá 1-2 sao để xem khách hàng phàn nàn điều gì nhiều nhất (chất vải, pin, mùi, thái độ phục vụ) và đối chiếu ảnh người mua chụp với ảnh shop đăng."
    },
    {
      step: 3,
      title: "So Sánh Giá & Check Lịch Sử Giảm",
      desc: "So sánh giá của sản phẩm với ít nhất 2 shop uy tín khác. Cảnh giác cao độ nếu mức giá rẻ bất thường dưới 50% so với mặt bằng chung."
    },
    {
      step: 4,
      title: "Đọc Kỹ Mô Tả & Tên Phân Loại Hàng",
      desc: "Kiểm tra kỹ thông số kích thước, chất liệu, phụ kiện đi kèm và tên phân loại đang chọn trong giỏ hàng để tránh mua nhầm linh kiện thay thế."
    },
    {
      step: 5,
      title: "Quay Video Unbox Liền Mạch Khi Nhận Hàng",
      desc: "Quay rõ mã vận đơn và 6 mặt kiện hàng trước khi rạch mở. Đây là bằng chứng thép bảo vệ 100% tiền của bạn khi cần bấm Yêu cầu Trả hàng/Hoàn tiền."
    }
  ]
};

// Xuất ra window để app.js truy cập mượt mà
window.SMARTCLICK_DATA = SMARTCLICK_DATA;
