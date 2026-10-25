import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import GridItems from "@/components/menu/GridItems"; // استبدل المسار بما يناسب هيكل مشروعك

// عمل Mock لمكون تفاصيل الوجبة (CardItemDes) لعزل اختبار الـ GridItems
jest.mock("@/components/menu/CardItemDes", () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) =>
    open ? <div data-testid="item-modal">Modal is Open</div> : null,
}));

describe("GridItems Component", () => {
  // بيانات وهمية للاختبار
  const mockItems = [
    {
      id: "1",
      categoryId: "1",
      nameAr: "تشيز برجر",
      nameEn: "Cheeseburger",
      description: "لحم بقري مع جبنة شيدر",
      priceSyp: 35000,
      priceUsd: 3.5,
      imageUrl: "",
      prepTime: "10 دقيقة",
      isAvailable: true,
    },
  ];

  const mockAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("يجب أن يعرض رسالة الفراغ عندما تكون القائمة فارغة", () => {
    render(
      <GridItems
        currentItems={[]}
        lang="ar"
        ShowUsd={true}
        addToCart={mockAddToCart}
      />,
    );

    expect(
      screen.getByText("لا توجد وجبات متاحة في هذا القسم حالياً."),
    ).toBeInTheDocument();
  });

  it("يجب أن يعرض تفاصيل الوجبة والأسعار والعملات بشكل صحيح", () => {
    render(
      <GridItems
        currentItems={mockItems}
        lang="ar"
        ShowUsd={true}
        addToCart={mockAddToCart}
      />,
    );

    // التحقق من اسم الوجبة والوصف
    expect(screen.getByText("تشيز برجر")).toBeInTheDocument();
    expect(screen.getByText("لحم بقري مع جبنة شيدر")).toBeInTheDocument();

    // التحقق من السعر بالليرة والدولار
    expect(screen.getByText(/35,000/)).toBeInTheDocument();
    expect(screen.getByText("$3.50")).toBeInTheDocument();
  });

  it("يجب أن يتم استدعاء دالة addToCart عند النقر على زر الإضافة", () => {
    render(
      <GridItems
        currentItems={mockItems}
        lang="ar"
        ShowUsd={false}
        addToCart={mockAddToCart}
      />,
    );

    // البحث عن زر الإضافة (Plus button) والنقر عليه
    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);

    // التأكد من استدعاء الدالة بالمعاملات الصحيحة
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockItems[0], 1);
  });
});
