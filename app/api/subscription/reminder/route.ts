import { serve } from "@upstash/workflow/nextjs";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { Resend } from "resend";
import { SUBSCRIPTION_ALERT_EXPIRED } from "@/components/EmailTemplate/email-templete-auth";
import { sendEmail } from "@/lib/nodemailer/email-service";

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

  if (
    !subscription ||
    (subscription.status !== "ACTIVE" && subscription.status !== "TRIAL")
  ) {
    console.log("Subscription not found or not active/trial");
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

    if (
      !currentSub ||
      (currentSub.status !== "ACTIVE" && currentSub.status !== "TRIAL")
    ) {
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
        const template = SUBSCRIPTION_ALERT_EXPIRED.replace(
          " {{daysBefore}}",
          daysBefore.toString(),
        );
        const subject = `⚠️ تنبيه: ينتهي اشتراكك في Q-menu خلال ${daysBefore} أيام`;
        await sendEmail(email, subject, template);
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
