"use client";

import { useState } from "react";
import { Check, Zap, Crown, ShieldCheck, Sparkles } from "lucide-react";

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>("pro");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("sham_cash");

  const plans = [
    {
      id: "starter",
      name: "الباقة الأساسية",
      price: "$6",
      period: "شهرياً",
      description: "مثالية للمطاعم الصغيرة والكافيهات الناشئة لبدء حضورهم الرقمي.",
      features: [
        "إضافة حتى 40 وجبة في المنيو",
        "رمز QR Code خاص ودائم للمطعم",
        "تحديث الأسعار والأطباق فوراً",
        "دعم فني عبر البريد الإلكتروني",
      ],
      popular: false,
      icon: <Zap className="w-6 h-6 text-[#ff5722]" />,
    },
    {
      id: "pro",
      name: "الباقة الاحترافية",
      price: "$12",
      period: "شهرياً",
      description: "الأكثر طلباً! تمنحك إمكانيات كاملة وتضمن وصولك للميزات المتقدمة فور صدورها.",
      features: [
        "عدد غير محدود من الوجبات (Unlimited)",
        "رمز QR Code خاص ودائم للمطعم",
        "وصول مجاني لميزة الثيمات والألوان فور إطلاقها",
        "وصول مجاني لنظام استقبال الطلبات فور إطلاقه",
        "أولوية الدعم الفني المباشر",
      ],
      popular: true,
      icon: <Sparkles className="w-6 h-6 text-[#ff7043]" />,
    },
{
      id: "enterprise",
      name: "باقة الشركات والفروع",
      price: "$20",
      period: "شهرياً",
      description: "مخصصة للمطاعم الكبرى التي تخطط لإدارة عدة فروع من مكان واحد.",
      features: [
        "كل ميزات الباقة الاحترافية",
        "إدارة عدة فروع من لوحة تحكم واحدة",
        "لوحة تحكم خاصة لكل مدير فرع",
        "دعم فني مخصص على مدار الساعة",
        "إمكانية طلب تخصيص برمجي حصري",
      ],
      popular: false,
      comingSoon: true,
      icon: <Crown className="w-6 h-6 text-slate-400" />,
    },
  ];

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-[family-name:var(--font-cairo)]">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-xs font-semibold bg-[#ff5722]/10 text-[#ff7043] border border-[#ff5722]/20 mb-4">
          <ShieldCheck className="w-4 h-4" /> 14 يوم تجربة مجانية (حتى 15 وجبة)
        </span>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl mb-4">
          اختر الباقة المناسبة لنمو مطعمك
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          جميع الباقات تتضمن فترة تجريبية مجانية. ابدأ اليوم واجعل منيو مطعمك متاحاً لكل زبون بأسلوب عالي الاحترافية.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl bg-slate-900/90 border flex flex-col justify-between p-8 transition-all duration-300 ${
              plan.comingSoon
                ? "border-slate-800/80 opacity-75"
                : plan.popular
                ? "border-[#ff5722] shadow-2xl shadow-[#ff5722]/15 ring-1 ring-[#ff5722]/40 hover:scale-[1.02]"
                : "border-slate-800 hover:border-slate-700 hover:scale-[1.02]"
            }`}
          >
            {/* وسم الباقة الأكثر طلباً */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff5722] text-white font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider shadow-md">
                الأكثر اختياراً 🔥
              </div>
            )}

            {/* وسم قريباً لباقة الشركات */}
            {plan.comingSoon && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-300 border border-slate-700 font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider shadow-md">
                قريباً 🚀
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="p-2.5 rounded-xl bg-slate-800/80">{plan.icon}</div>
              </div>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">{plan.description}</p>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-sm text-slate-400">/ {plan.period}</span>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="mt-1 p-0.5 rounded-full bg-[#ff5722]/20 text-[#ff7043] shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={plan.comingSoon}
              onClick={() => handleSubscribe(plan.id)}
              className={`w-full py-3.5 px-4 rounded-xl font-bold transition-all duration-200 text-center ${
                plan.comingSoon
                  ? "bg-slate-800/60 text-slate-500 cursor-not-allowed border border-slate-700/50"
                  : plan.popular
                  ? "bg-[#ff5722] hover:bg-[#e63920] text-white shadow-lg shadow-[#ff5722]/25"
                  : "bg-slate-800 hover:bg-slate-700 text-white"
              }`}
            >
              {plan.comingSoon ? "يتوفر قريباً" : "اختر هذه الباقة"}
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h2 className="text-xl font-bold mb-2">تأكيد الاشتراك والدفع</h2>
            <p className="text-sm text-slate-400 mb-6">
              يرجى تحويل المبلغ عبر إحدى وسائل الدفع المحلية أدناه ثم إدخال رقم العملية.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">اختر طريقة الدفع</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("sham_cash")}
                    className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                      paymentMethod === "sham_cash"
                        ? "border-[#ff5722] bg-[#ff5722]/10 text-[#ff7043]"
                        : "border-slate-800 bg-slate-800/50 text-slate-400"
                    }`}
                  >
                    شام كاش (Sham Cash)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("syriatel_cash")}
                    className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                      paymentMethod === "syriatel_cash"
                        ? "border-[#ff5722] bg-[#ff5722]/10 text-[#ff7043]"
                        : "border-slate-800 bg-slate-800/50 text-slate-400"
                    }`}
                  >
                    سيريتل كاش
                  </button>
                </div>
              </div>

              {/* تفاصيل التحويل */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 text-slate-300">
                <p className="font-bold text-[#ff7043]">تعليمات التحويل:</p>
                <p>قم بتحويل القيمة إلى الحساب التالي: <span className="font-mono text-white text-sm">0930000000</span></p>
                <p>صاحب الحساب: <span className="text-white font-medium">منصة QMenu</span></p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">رقم عملية التحويل (Transaction ID)</label>
                <input
                  type="text"
                  placeholder="مثال: 98452136"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff5722]"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  alert("تم إرسال طلب التحويل بنجاح، سيتم تفعيل حسابك فور مراجعة العملية.");
                  setIsModalOpen(false);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#ff5722] hover:bg-[#e63920] text-white text-sm font-bold transition-colors shadow-lg shadow-[#ff5722]/20"
              >
                تأكيد الدفع
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}