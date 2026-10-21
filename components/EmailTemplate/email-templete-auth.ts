export const EMAIL_VERIFICATION = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>رمز التحقق</title>
  <style>
    /* Reset Styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc;">

  <!-- Preheader Text (مخفي داخل البريد ولكن يظهر في لوحة الإشعارات) -->
  <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    رمز التحقق الخاص بك هو: {{OTP_CODE}}. ينتهي خلال 5 دقائق. لا تشاركه مع أحد.
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Container Card -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header / Logo -->
          <tr>
            <td align="center" style="padding: 32px 32px 20px 32px; border-bottom: 1px solid #f1f5f9;">
              <span style="font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">
                <span style="color: #ff5722;">Q-Menu</span>
              </span>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td align="center" style="padding: 32px;">
              <h1 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #0f172a;">
                رمز أمان تسجيل الدخول
              </h1>
              <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 22px; color: #64748b;">
                استخدم الرمز التالي لإكمال عملية التوثيق. الرمز صالح لمدة <strong style="color: #ff5722;">5 دقائق</strong> فقط.
              </p>

              <!-- OTP Code Display Box -->
              <div style="background-color: #fff5f2; border: 1px dashed #ffe6df; border-radius: 12px; padding: 18px; margin-bottom: 28px;">
                <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; color: #ff5722; letter-spacing: 10px; display: inline-block; direction: ltr;">
                  {{OTP_CODE}}
                </span>
              </div>

              <!-- Security Notice -->
              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #94a3b8;">
                إذا لم تطلب هذا الرمز، يمكنك تجاهل هذا البريد الإلكتروني بأمان. قد يحاول شخص آخر الوصول إلى حسابك عن طريق الخطأ.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 32px; background-color: #f8fafc; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                &copy; 2026 Q-Menu. جميع الحقوق محفوظة.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

export const RESET_PASSWORD_TEMPLATE = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>إعادة تعيين كلمة المرور</title>
  <style>
    /* Reset Styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc;">

  <!-- Preheader Text (مخفي داخل البريد ويظهر في الإشعارات) -->
  <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    طلب إعادة تعيين كلمة المرور لحسابك في Q-Menu. الرابط صالح لمدة ساعة واحدة.
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Container Card -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header / Logo -->
          <tr>
            <td align="center" style="padding: 32px 32px 20px 32px; border-bottom: 1px solid #f1f5f9;">
              <span style="font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">
                <span style="color: #ff5722;">Q-Menu</span>
              </span>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td align="center" style="padding: 32px;">
              <h1 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #0f172a;">
                إعادة تعيين كلمة المرور
              </h1>
              <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 22px; color: #64748b;">
                تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك. اضغط على الزر أدناه لإنشاء كلمة مرور جديدة. الرابط صالح لمدة <strong style="color: #ff5722;">ساعة واحدة</strong>.
              </p>

              <!-- CTA Button -->
              <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                <tr>
                  <td align="center" style="border-radius: 12px; background-color: #ff5722;">
                    <a href="{{RESET_LINK}}" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 15px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 12px; background-color: #ff5722; box-shadow: 0 4px 12px rgba(255, 87, 34, 0.25);">
                      إعادة تعيين كلمة المرور
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback Direct Link -->
              <div style="background-color: #fff5f2; border: 1px solid #ffe6df; border-radius: 12px; padding: 14px; margin-bottom: 28px; text-align: right;">
                <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #ff5722;">
                  إذا لم يعمل الزر أعلاه، انسخ الرابط التالي والصقه في متصفحك:
                </p>
                <p style="margin: 0; font-size: 11px; line-height: 16px; color: #64748b; word-break: break-all; direction: ltr; text-align: left;">
                  {{RESET_LINK}}
                </p>
              </div>

              <!-- Security Notice -->
              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #94a3b8;">
                إذا لم تطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني بأمان ولن يتم تغيير كلمة المرور الخاصة بك.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 32px; background-color: #f8fafc; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                &copy; 2026 Q-Menu. جميع الحقوق محفوظة.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

export const SECURITY_ALERT_TEMPLATE = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تنبيه أمني - تغيير كلمة المرور</title>
  <style>
    /* Reset Styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc;">

  <!-- Preheader Text -->
  <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    تنبيه أمني: تم تغيير كلمة المرور الخاصة بحسابك في Q-Menu بنجاح.
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Container Card -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header / Logo -->
          <tr>
            <td align="center" style="padding: 32px 32px 20px 32px; border-bottom: 1px solid #f1f5f9;">
              <span style="font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">
                <span style="color: #ff5722;">Q-Menu</span>
              </span>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td align="center" style="padding: 32px;">
              
              <!-- Shield Icon Badge -->
              <div style="width: 48px; height: 48px; background-color: #fff5f2; border: 1px solid #ffe6df; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
                <span style="font-size: 24px; line-height: 48px; color: #ff5722;">🛡️</span>
              </div>

              <h1 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #0f172a;">
                تم تغيير كلمة المرور بنجاح
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 22px; color: #64748b;">
                نود إعلامك بأنه تم تغيير كلمة المرور الخاصة بحسابك بنجاح. تفاصيل هذه العملية موضحة أدناه:
              </p>

              <!-- Operation Details Table -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px; text-align: right;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b; font-weight: 600;" width="35%">
                    التاريخ والوقت:
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #0f172a; font-weight: 700; direction: ltr; text-align: left;">
                    {{DATE_TIME}}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b; font-weight: 600;">
                    عنوان الـ IP:
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #0f172a; font-weight: 700; direction: ltr; text-align: left;">
                    {{IP_ADDRESS}}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; font-weight: 600;">
                    الجهاز/المتصفح:
                  </td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #0f172a; font-weight: 700; direction: ltr; text-align: left;">
                    {{DEVICE_INFO}}
                  </td>
                </tr>
              </table>

              <!-- Warning Alert Box -->
              <div style="background-color: #fff5f2; border: 1px solid #ffe6df; border-radius: 12px; padding: 16px; text-align: right; margin-bottom: 8px;">
                <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #ff5722;">
                  لم تقم بهذا الإجراء؟
                </p>
                <p style="margin: 0; font-size: 12px; line-height: 18px; color: #64748b;">
                  إذا لم تقم بتغيير كلمة المرور بنفسك، فهذا يعني أن هناك شخصاً آخر وصل إلى حسابك. يرجى إعادة تعيين كلمة المرور فوراً والتواصل مع فريق الدعم الفني لحماية حسابك.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 32px; background-color: #f8fafc; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                &copy; 2026 Q-Menu. جميع الحقوق محفوظة.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

export const SUBSCRIPTION_ACTIVE_TEMPLATE = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تفعيل الاشتراك</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl; text-align: right;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 0;">
    <tr>
      <td align="center">
        
        <!-- Main Container -->
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header Logo / Brand -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; text-align: center; border-bottom: 1px solid #f1f5f9;">
              <h2 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">
                Q-<span style="color: #6366f1;">Menu</span>
              </h2>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 40px 32px;">
              
              <!-- Success Badge -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <div style="display: inline-block; background-color: #dcfce7; color: #16a34a; font-size: 13px; font-weight: 700; padding: 8px 16px; border-radius: 50px;">
                      ✨ تم تفعيل الاشتراك بنجاح
                    </div>
                  </td>
                </tr>
              </table>

              <h1 style="margin: 0 0 16px 0; color: #0f172a; font-size: 22px; font-weight: 800; text-align: center;">
                مرحباً بك في باقة النمو الاحترافية!
              </h1>
              
              <p style="margin: 0 0 24px 0; color: #475569; font-size: 15px; line-height: 1.6; text-align: center;">
                شكراً لإتمام عملية الدفع عبر <strong>شام كاش</strong>. تم تحديث حسابك بنجاح وأصبح بإمكان زابائنك تصفح منيو مطعمك بكل سهولة واحترافية.
              </p>

              <!-- Invoice / Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color: #64748b; font-size: 13px; font-weight: 600; padding-bottom: 12px;">المبلغ المدفوع:</td>
                        <td style="color: #0f172a; font-size: 15px; font-weight: 800; text-align: left; padding-bottom: 12px;"> {{requiredAmountUSD}} USD</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-size: 13px; font-weight: 600; padding-bottom: 12px; border-top: 1px solid #e2e8f0; padding-top: 12px;">طريقة الدفع:</td>
                        <td style="color: #0f172a; font-size: 14px; font-weight: 700; text-align: left; border-top: 1px solid #e2e8f0; padding-top: 12px;">شام كاش (Sham Cash)</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-size: 13px; font-weight: 600; border-top: 1px solid #e2e8f0; padding-top: 12px;">حالة الحساب:</td>
                        <td style="color: #16a34a; font-size: 14px; font-weight: 700; text-align: left; border-top: 1px solid #e2e8f0; padding-top: 12px;">مفعل وجاهز 🟢</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://yourdomain.com/dashboard" target="_blank" style="background-color: #0f172a; color: #ffffff; padding: 14px 32px; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.2);">
                      الانتقال إلى لوحة التحكم
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">
                هذه الرسالة مرسلة تلقائياً من نظام منصة Q-Menu. يرجى عدم الرد على هذه الرسالة مباشرة.
              </p>
              <p style="margin: 8px 0 0 0; color: #cbd5e1; font-size: 11px;">
                &copy; ${new Date().getFullYear()} Q-Menu. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        
      </td>
    </tr>
  </table>

</body>
</html>
`;

export const SUBSCRIPTION_ALERT_EXPIRED = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>تنبيه انتهاء الاشتراك</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl; text-align: right;">
          
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 0;">
            <tr>
              <td align="center">
                
                <!-- Main Container -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                  
                  <!-- Header Logo -->
                  <tr>
                    <td style="padding: 32px 32px 24px 32px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                      <h2 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">
                        Q-<span style="color: #6366f1;">Menu</span>
                      </h2>
                    </td>
                  </tr>

                  <!-- Content Body -->
                  <tr>
                    <td style="padding: 40px 32px;">
                      
                      <!-- Warning Badge -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding-bottom: 24px;">
                            <div style="display: inline-block; background-color: #fef3c7; color: #d97706; font-size: 13px; font-weight: 700; padding: 8px 16px; border-radius: 50px;">
                              ⏳ تنبيه هام بقرب انتهاء الاشتراك
                            </div>
                          </td>
                        </tr>
                      </table>

                      <h1 style="margin: 0 0 16px 0; color: #0f172a; font-size: 22px; font-weight: 800; text-align: center;">
                        اشتراك مطعمك على وشك الانتهاء
                      </h1>
                      
                      <p style="margin: 0 0 24px 0; color: #475569; font-size: 15px; line-height: 1.6; text-align: center;">
                        مرحباً، نود تذكيرك بأن اشتراك مطعمك على منصة Q-menu سينتهي خلال <strong style="color: #e11d48;"> {{daysBefore}} أيام</strong>. يرجى المبادرة للتجديد عبر <strong>شام كاش</strong> لاستمرار عمل المنيو الخاص بك دون أي انقطاع.
                      </p>

                      <!-- Warning Box -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff1f2; border: 1px solid #fecdd3; border-radius: 16px; margin-bottom: 32px;">
                        <tr>
                          <td style="padding: 20px; text-align: center; color: #9f1239; font-size: 13px; font-weight: 600; line-height: 1.5;">
                            ⚠️ في حال عدم التجديد قبل انتهاء المدة، سيتم إيقاف عرض المنيو مؤقتاً للزوار حتى يتم تفعيل الاشتراك الجديد.
                          </td>
                        </tr>
                      </table>

                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <a href="https://yourdomain.com/subscription" target="_blank" style="background-color: #0f172a; color: #ffffff; padding: 14px 32px; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.2);">
                              تجديد الاشتراك الآن
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #f1f5f9;">
                      <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">
                        هذه الرسالة مرسلة تلقائياً من نظام التنبيهات في منصة Q-Menu.
                      </p>
                      <p style="margin: 8px 0 0 0; color: #cbd5e1; font-size: 11px;">
                        &copy; ${new Date().getFullYear()} Q-Menu. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
                
              </td>
            </tr>
          </thead>
        </table>

        </body>
        </html>
        `;