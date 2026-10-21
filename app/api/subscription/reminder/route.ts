import { serve } from "@upstash/workflow/nextjs";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { Resend } from "resend";

interface WorkflowPayload {
  subscriptionId: string;
  email: string;
}

const reminders = [5, 2, 1];

const resend = new Resend(process.env.RESEND_API_KEY);

export const { POST } = serve<WorkflowPayload>(async (context) => {
  const { subscriptionId, email } = context.requestPayload;

  const subscription = await context.run("check-subscription", async () => {
    return await prisma.subscription.findUnique({
      where: {
        id: subscriptionId,
      },
    });
  });

  if (!subscription || subscription.status !== "ACTIVE") {
    console.log("Subscription not found or not active");
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log("Subscription already expired");
    return;
  }

  for (let daysBefore = 0; daysBefore < reminders.length; daysBefore++) {
    const reminde = renewalDate.subtract(reminders[daysBefore], "day");

    if (reminde.isAfter(dayjs())) {
      console.log(
        `Sleeping until reminder ${daysBefore} days at ${reminde.toISOString()}`,
      );
      await context.sleepUntil(`sleep-${daysBefore}-days`, reminde.toDate());
    }

    const currentSub = await context.run(
      `check-status-${daysBefore}-days`,
      async () => {
        return await prisma.subscription.findUnique({
          where: { id: subscriptionId },
          select: { status: true, renewalDate: true },
        });
      },
    );

    if (!currentSub || currentSub.status !== "ACTIVE") {
      console.log(
        `Subscription no longer active before ${daysBefore}-day reminder. Stopping workflow.`,
      );
      return;
    }

    const actualRenewalDate = dayjs(currentSub.renewalDate);
    if (actualRenewalDate.isAfter(renewalDate)) {
      console.log(
        `User has renewed the subscription! Stopping reminder workflow.`,
      );
      return;
    }

    await context.run(`send-reminder-${daysBefore}-days`, async () => {
      console.log(`Sending ${daysBefore} days reminder to ${email}`);
      try {
        await resend.emails.send({
          from: "Q-menu <onboarding@resend.dev>",
          to: email,
          subject: `تنبيه: ينتهي اشتراكك في Q-menu خلال ${daysBefore} أيام`,
          html: `
            <div dir="rtl" style="font-family: sans-serif; padding: 20px;">
              <h2>تذكير بانتهاء الاشتراك</h2>
              <p>مرحباً، نود تذكيرك بأن اشتراك مطعمك على منصة Q-menu ينتهي خلال <strong>${daysBefore} أيام</strong>.</p>
              <p>يرجى التجديد عبر شام كاش لتجنب توقف المنيو.</p>
            </div>
          `,
        });
      } catch (error) {
        console.error(`Error sending ${daysBefore} days reminder:`, error);
      }
    });
  }

  const expirationDate = dayjs(subscription.renewalDate)
    .hour(23)
    .minute(59)
    .second(59)
    .toDate();

  if (dayjs().isBefore(expirationDate)) {
    console.log(`Sleeping until expiration day at ${expirationDate}`);
    await context.sleepUntil(`sleep-expired-day`, expirationDate);
  }

  await context.run(`mark-subscription-as-expired`, async () => {
    console.log(`Marking subscription ${subscriptionId} as EXPIRED`);
    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: "EXPIRED" },
    });
  });
});
