import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Vô đề",
    description: "Không có mô tả được cung cấp",
  },
  components: {
    callout: {
      note: "Ghi chú",
      abstract: "Tóm tắt",
      info: "Thông tin",
      todo: "Cần làm",
      tip: "Gợi ý",
      success: "Thành công",
      question: "Nghi vấn",
      warning: "Cảnh báo",
      failure: "Thất bại",
      danger: "Nguy hiểm",
      bug: "Lỗi",
      example: "Ví dụ",
      quote: "Trích dẫn",
    },
    backlinks: {
      title: "Liên kết ngược",
      noBacklinksFound: "Không có liên kết ngược nào",
    },
    themeToggle: {
      lightMode: "Sáng",
      darkMode: "Tối",
    },
    explorer: {
      title: "Cùng trên trang này",
    },
    footer: {
      createdWith: "Được xuất bản bởi Dynamo bằng",
    },
    graph: {
      title: "Biểu đồ",
    },
    recentNotes: {
      title: "Bài viết gần đây",
      seeRemainingMore: ({ remaining }) => `Xem ${remaining} thêm →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Bao gồm ${targetSlug}`,
      linkToOriginal: "Liên kết gốc",
    },
    search: {
      title: "Tìm kiếm",
      searchBarPlaceholder: "Nhập thông tin tìm kiếm",
    },
    tableOfContents: {
      title: "Mục lục",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `thời gian đọc khoảng ${minutes} phút`,
      created: "tạo lúc",
      modified: "sửa lúc",
      published: "xuất bản lúc",
    },
  },
  pages: {
    rss: {
      recentNotes: "Bài viết gần đây",
      lastFewNotes: ({ count }) => `${count} Bài gần đây`,
    },
    error: {
      title: "Không tìm thấy",
      notFound: "Trang này ở chế độ riêng tư hoặc không tồn tại.",
      home: "Trở về trang chủ",
    },
    folderContent: {
      folder: "Thư mục",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 ghi chú trong thư mục này." : `${count} ghi chú trong thư mục này.`,
    },
    tagContent: {
      tag: "Thẻ",
      tagIndex: "Mục lục thẻ",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 ghi chú gắn thẻ này." : `${count} ghi chú gắn thẻ này.`,
      showingFirst: ({ count }) => `Hiển thị trước ${count} thẻ.`,
      totalTags: ({ count }) => `Tìm thấy ${count} thẻ tổng cộng.`,
    },
    encryptedContent: {
      loading: "Đang tải...",
      password: "Mật khẩu",
      submit: "Mở khóa",
      enterPassword: "Trang này bị khóa theo mặc định. Vui lòng điền mật khẩu để mở khóa:",
      modernBrowser: "Vui lòng sử dụng trình duyệt mới nhất.",
      wrongPassword: "Sai mật khẩu. Vui lòng điền lại mật khẩu để mở khóa:",
      noPayload: "Không có nội dung được mã hóa.",
      decrypting: "Đang giải mã...",
    },
  },
} as const satisfies Translation
